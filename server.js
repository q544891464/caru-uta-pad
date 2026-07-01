const fs = require("node:fs");
const crypto = require("node:crypto");
const https = require("node:https");
const http = require("node:http");
const path = require("node:path");

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 8090);
const NCM_API_ORIGIN = process.env.NCM_API_ORIGIN || "http://127.0.0.1:3000";
const ROOT = __dirname;
const AIHUBMIX_CONFIG_PATH = path.join(ROOT, "aihubmix.config.json");
const AI_WORD_CACHE_PATH = path.join(ROOT, ".ai-word-cache.json");
const AI_WORD_CACHE_LIMIT = 120;
const AI_LYRIC_MAX_LINES = 36;
const aiWordCache = loadAiWordCache();
const pendingAiWordRequests = new Map();

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);
  if (requestUrl.pathname === "/api/extract-words") {
    handleExtractWordsRequest(request, response);
    return;
  }
  if (requestUrl.pathname.startsWith("/ncm/")) {
    proxyNcmRequest(request, response, requestUrl);
    return;
  }
  serveStaticFile(response, requestUrl.pathname);
});

server.listen(PORT, HOST, () => {
  console.log(`caru-uta-pad running at http://${HOST}:${PORT}`);
});

function proxyNcmRequest(clientRequest, clientResponse, requestUrl) {
  const target = new URL(NCM_API_ORIGIN);
  target.pathname = requestUrl.pathname.replace(/^\/ncm/, "") || "/";
  target.search = requestUrl.search;

  const proxyRequest = http.request(
    target,
    {
      method: clientRequest.method,
      headers: {
        ...clientRequest.headers,
        host: target.host,
      },
    },
    (proxyResponse) => {
      const headers = { ...proxyResponse.headers };
      if (headers["set-cookie"]) {
        headers["set-cookie"] = normalizeSetCookie(headers["set-cookie"]);
      }
      clientResponse.writeHead(proxyResponse.statusCode || 502, {
        ...headers,
        "access-control-allow-origin": "*",
      });
      proxyResponse.pipe(clientResponse);
    },
  );

  proxyRequest.on("error", (error) => {
    clientResponse.writeHead(502, { "content-type": "application/json; charset=utf-8" });
    clientResponse.end(JSON.stringify({ code: 502, message: error.message }));
  });

  clientRequest.pipe(proxyRequest);
}

function normalizeSetCookie(cookies) {
  const cookieList = Array.isArray(cookies) ? cookies : [cookies];
  return cookieList.map((cookie) =>
    cookie
      .replace(/;\s*Domain=[^;]*/gi, "")
      .replace(/;\s*SameSite=None/gi, "")
      .replace(/;\s*Secure/gi, ""),
  );
}

async function handleExtractWordsRequest(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }
  try {
    const config = readAihubmixConfig();
    if (!config.enabled || !config.apiKey) {
      sendJson(response, 200, { enabled: false, words: [] });
      return;
    }
    const body = await readJsonBody(request);
    const lyrics = Array.isArray(body.lyrics) ? body.lyrics : [];
    const result = await extractWordsWithAi(lyrics, config);
    sendJson(response, 200, { enabled: true, ...result });
  } catch (error) {
    console.error(`[aihubmix] ${error.message}`);
    sendJson(response, 200, { enabled: true, error: error.message, words: [] });
  }
}

function readAihubmixConfig() {
  try {
    const config = JSON.parse(fs.readFileSync(AIHUBMIX_CONFIG_PATH, "utf8"));
    return {
      enabled: Boolean(config.enabled),
      apiKey: String(config.apiKey || "").trim(),
      baseUrl: String(config.baseUrl || "https://aihubmix.com/v1").replace(/\/$/, ""),
      model: String(config.model || "deepseek-v4-flash"),
      maxWords: Math.max(12, Math.min(120, Number(config.maxWords) || 80)),
      timeoutMs: Math.max(5000, Math.min(120000, Number(config.timeoutMs) || 60000)),
    };
  } catch {
    return {
      enabled: false,
      apiKey: "",
      baseUrl: "https://aihubmix.com/v1",
      model: "deepseek-v4-flash",
      maxWords: 80,
      timeoutMs: 60000,
    };
  }
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let raw = "";
    request.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 256000) {
        reject(new Error("Request body too large"));
        request.destroy();
      }
    });
    request.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    request.on("error", reject);
  });
}

async function extractWordsWithAi(lyrics, config) {
  const lines = compactLyricsLines(lyrics);
  if (!lines.length) return { cached: false, words: [] };

  const text = lines.join("\n");
  const cacheKey = createAiWordCacheKey(text, config);
  const cachedWords = aiWordCache.get(cacheKey);
  if (cachedWords) {
    if (hasAiGeneratedWords(cachedWords)) return { cached: true, source: "cache", words: cachedWords };
    aiWordCache.delete(cacheKey);
  }
  if (pendingAiWordRequests.has(cacheKey)) {
    const result = await pendingAiWordRequests.get(cacheKey);
    return { ...result, cached: true };
  }

  const requestPromise = extractWordsFromAi(lines, config)
    .then((result) => {
      if (result.source === "ai" && hasAiGeneratedWords(result.words)) {
        setAiWordCache(cacheKey, result.words);
      }
      return result;
    })
    .finally(() => {
      pendingAiWordRequests.delete(cacheKey);
    });
  pendingAiWordRequests.set(cacheKey, requestPromise);
  const result = await requestPromise;
  return { cached: false, ...result };
}

async function extractWordsFromAi(lines, config) {
  try {
    const words = normalizeAiWords(await extractWordsFromText(lines.join("\n"), config, config.maxWords), config.maxWords);
    if (words.length) return { source: "ai", words };
    console.error("[aihubmix] returned no usable words");
    return { source: "fallback", words: extractFallbackWords(lines, config.maxWords), error: "AI 未生成可用词卡" };
  } catch (error) {
    console.error(`[aihubmix] failed: ${error.message}`);
    return { source: "fallback", words: extractFallbackWords(lines, config.maxWords), error: error.message };
  }
}

async function extractWordsFromText(text, config, maxWords) {
  const payload = {
    model: config.model,
    temperature: 0.2,
    enable_thinking: false,
    max_completion_tokens: Math.min(2400, Math.max(900, maxWords * 80)),
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "只输出合法 JSON，不要解释。提取歌词中真实连续出现的日语词/短语，避免助词、语气词和英文。",
      },
      {
        role: "user",
        content: `最多 ${maxWords} 个词卡。格式 {"words":[{"word":"...","kana":"歌词","value":1}]}。word 2-8 个日文字符，value 1-3。\n${text}`,
      },
    ],
  };
  const result = await postJson(`${config.baseUrl}/chat/completions`, payload, {
    authorization: `Bearer ${config.apiKey}`,
    timeoutMs: config.timeoutMs,
  });
  const content = result.choices?.[0]?.message?.content || "";
  const parsed = parseAiJson(content);
  return parsed.words || [];
}

function parseAiJson(content) {
  const stripped = stripJsonFence(content);
  try {
    return JSON.parse(stripped);
  } catch {
    const start = stripped.indexOf("{");
    const end = stripped.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return JSON.parse(stripped.slice(start, end + 1));
    }
    throw new Error("AIHubMix returned invalid word JSON");
  }
}

function compactLyricsLines(lyrics) {
  const seen = new Set();
  const lines = [];
  for (const line of lyrics) {
    const text = String(line.text || "")
      .replace(/\s+/g, " ")
      .trim();
    if (!text || !/[\u3040-\u30ff\u3400-\u9fff]/.test(text) || seen.has(text)) continue;
    seen.add(text);
    lines.push(text);
    if (lines.length >= 90) break;
  }
  return sampleLines(lines.join("\n").slice(0, 6000).split("\n").filter(Boolean), AI_LYRIC_MAX_LINES);
}

function sampleLines(lines, maxLines) {
  if (lines.length <= maxLines) return lines;
  const sampled = [];
  for (let index = 0; index < maxLines; index += 1) {
    const sourceIndex = Math.floor((index * lines.length) / maxLines);
    sampled.push(lines[sourceIndex]);
  }
  return sampled;
}

function extractFallbackWords(lines, maxWords) {
  const scores = new Map();
  const text = lines.join("\n");
  const matches = text.match(/[\u3040-\u30ff\u3400-\u9fff]{2,8}/g) || [];
  for (const match of matches) {
    const candidates = splitFallbackCandidate(match);
    for (const candidate of candidates) {
      if (!isUsefulFallbackWord(candidate)) continue;
      scores.set(candidate, (scores.get(candidate) || 0) + candidate.length);
    }
  }
  return Array.from(scores.entries())
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
    .slice(0, maxWords)
    .map(([word]) => ({
      word,
      kana: "歌词",
      value: word.length >= 5 ? 3 : word.length >= 3 ? 2 : 1,
      dynamic: true,
      ai: false,
    }));
}

function splitFallbackCandidate(value) {
  if (value.length <= 5) return [value];
  const candidates = [];
  for (let size = 5; size >= 2; size -= 1) {
    for (let index = 0; index + size <= value.length; index += size) {
      candidates.push(value.slice(index, index + size));
    }
  }
  return candidates;
}

function isUsefulFallbackWord(word) {
  if (word.length < 2 || word.length > 8) return false;
  if (!/[\u3400-\u9fff\u30a0-\u30ff]/.test(word)) return false;
  return !/^(から|まで|だけ|なら|でも|より|そして|それでも|この|その|あの|いる|ある|こと|よう|ため)$/.test(word);
}

function createAiWordCacheKey(text, config) {
  return crypto
    .createHash("sha256")
    .update([config.model, config.maxWords, text].join("\0"))
    .digest("hex");
}

function loadAiWordCache() {
  try {
    const raw = JSON.parse(fs.readFileSync(AI_WORD_CACHE_PATH, "utf8"));
    if (!Array.isArray(raw.entries)) return new Map();
    return new Map(raw.entries.filter((entry) => Array.isArray(entry) && entry.length === 2).slice(-AI_WORD_CACHE_LIMIT));
  } catch {
    return new Map();
  }
}

function setAiWordCache(key, words) {
  if (!hasAiGeneratedWords(words)) return;
  aiWordCache.delete(key);
  aiWordCache.set(key, words);
  while (aiWordCache.size > AI_WORD_CACHE_LIMIT) {
    aiWordCache.delete(aiWordCache.keys().next().value);
  }
  fs.writeFile(AI_WORD_CACHE_PATH, JSON.stringify({ entries: Array.from(aiWordCache.entries()) }), () => {});
}

function hasAiGeneratedWords(words) {
  return Array.isArray(words) && words.some((word) => word?.ai === true);
}

function postJson(url, payload, { authorization, timeoutMs }) {
  return new Promise((resolve, reject) => {
    const target = new URL(url);
    const body = JSON.stringify(payload);
    const transport = target.protocol === "https:" ? https : http;
    const request = transport.request(
      target,
      {
        method: "POST",
        headers: {
          authorization,
          "content-type": "application/json",
          "content-length": Buffer.byteLength(body),
        },
        timeout: timeoutMs,
      },
      (apiResponse) => {
        let raw = "";
        apiResponse.on("data", (chunk) => {
          raw += chunk;
        });
        apiResponse.on("end", () => {
          if ((apiResponse.statusCode || 500) >= 400) {
            reject(new Error(`AIHubMix HTTP ${apiResponse.statusCode}: ${raw.slice(0, 200)}`));
            return;
          }
          try {
            resolve(JSON.parse(raw));
          } catch {
            reject(new Error("AIHubMix returned invalid JSON"));
          }
        });
      },
    );
    request.on("timeout", () => {
      request.destroy(new Error("AIHubMix request timed out"));
    });
    request.on("error", reject);
    request.end(body);
  });
}

function stripJsonFence(value) {
  return String(value)
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "");
}

function normalizeAiWords(words, maxWords) {
  if (!Array.isArray(words)) return [];
  const seen = new Set();
  return words
    .map((word) => ({
      word: String(word.word || "").trim(),
      kana: String(word.kana || "歌词").trim() || "歌词",
      value: Math.min(3, Math.max(1, Number(word.value) || 1)),
      dynamic: true,
      ai: true,
    }))
    .filter((word) => word.word && /[\u3040-\u30ff\u3400-\u9fff]/.test(word.word))
    .filter((word) => {
      if (seen.has(word.word)) return false;
      seen.add(word.word);
      return true;
    })
    .slice(0, maxWords);
}

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-cache",
  });
  response.end(JSON.stringify(body));
}

function serveStaticFile(response, pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const safePath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const resolvedPath = path.join(ROOT, safePath === "/" ? "index.html" : safePath);

  if (!resolvedPath.startsWith(ROOT)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.stat(resolvedPath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      response.writeHead(404);
      response.end("Not Found");
      return;
    }
    response.writeHead(200, {
      "content-type": MIME_TYPES[path.extname(resolvedPath)] || "application/octet-stream",
      "cache-control": "no-cache",
    });
    fs.createReadStream(resolvedPath).pipe(response);
  });
}
