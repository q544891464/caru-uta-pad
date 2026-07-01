const WORD_BANK_STORAGE_KEY = "caru-uta-pad-word-bank";
const NCM_API_BASE_STORAGE_KEY = "caru-uta-pad-ncm-api-base";
const AI_WORD_CACHE_STORAGE_KEY = "caru-uta-pad-ai-word-cache";
const DEFAULT_NCM_API_PORT = "3000";
const MAX_DYNAMIC_WORDS = 80;
const AI_WORD_CACHE_LIMIT = 60;
const BOARD_REFRESH_INTERVAL_MS = 15000;
const BOARD_REFRESH_TICK_MS = 250;
const SOUND_ENABLED = true;

const DEFAULT_WORD_BANK = [
  { word: "君", kana: "きみ", value: 1 },
  { word: "僕", kana: "ぼく", value: 1 },
  { word: "私", kana: "わたし", value: 1 },
  { word: "好き", kana: "すき", value: 1 },
  { word: "夜", kana: "よる", value: 1 },
  { word: "今", kana: "いま", value: 1 },
  { word: "夢", kana: "ゆめ", value: 1 },
  { word: "愛", kana: "あい", value: 1 },
  { word: "空", kana: "そら", value: 1 },
  { word: "心", kana: "こころ", value: 1 },
  { word: "明日", kana: "あした", value: 1 },
  { word: "手", kana: "て", value: 1 },
  { word: "今日", kana: "きょう", value: 1 },
  { word: "声", kana: "こえ", value: 1 },
  { word: "道", kana: "みち", value: 1 },
  { word: "胸", kana: "むね", value: 1 },
  { word: "涙", kana: "なみだ", value: 1 },
  { word: "歌", kana: "うた", value: 1 },
  { word: "春", kana: "はる", value: 1 },
  { word: "夏", kana: "なつ", value: 1 },
  { word: "月", kana: "つき", value: 1 },
  { word: "海", kana: "うみ", value: 1 },
  { word: "朝", kana: "あさ", value: 1 },
  { word: "冬", kana: "ふゆ", value: 1 },
  { word: "名前", kana: "なまえ", value: 1 },
  { word: "嘘", kana: "うそ", value: 1 },
  { word: "時", kana: "とき", value: 1 },
  { word: "街", kana: "まち", value: 1 },
  { word: "影", kana: "かげ", value: 1 },
  { word: "笑う", kana: "わらう", value: 1 },
  { word: "泣く", kana: "なく", value: 1 },
  { word: "生きる", kana: "いきる", value: 1 },
  { word: "約束", kana: "やくそく", value: 2 },
  { word: "未来", kana: "みらい", value: 2 },
  { word: "世界", kana: "せかい", value: 2 },
  { word: "光", kana: "ひかり", value: 2 },
  { word: "笑顔", kana: "えがお", value: 2 },
  { word: "季節", kana: "きせつ", value: 2 },
  { word: "時間", kana: "じかん", value: 2 },
  { word: "風", kana: "かぜ", value: 2 },
  { word: "花", kana: "はな", value: 2 },
  { word: "雨", kana: "あめ", value: 2 },
  { word: "希望", kana: "きぼう", value: 2 },
  { word: "勇気", kana: "ゆうき", value: 2 },
  { word: "自由", kana: "じゆう", value: 2 },
  { word: "言葉", kana: "ことば", value: 2 },
  { word: "夜明け", kana: "よあけ", value: 2 },
  { word: "星空", kana: "ほしぞら", value: 2 },
  { word: "青春", kana: "せいしゅん", value: 2 },
  { word: "さよなら", kana: "さよなら", value: 2 },
  { word: "ありがとう", kana: "ありがとう", value: 2 },
  { word: "ひとり", kana: "ひとり", value: 2 },
  { word: "想い", kana: "おもい", value: 2 },
  { word: "痛み", kana: "いたみ", value: 2 },
  { word: "強さ", kana: "つよさ", value: 2 },
  { word: "弱さ", kana: "よわさ", value: 2 },
  { word: "答え", kana: "こたえ", value: 2 },
  { word: "秘密", kana: "ひみつ", value: 2 },
  { word: "夢中", kana: "むちゅう", value: 2 },
  { word: "大切", kana: "たいせつ", value: 2 },
  { word: "最後", kana: "さいご", value: 2 },
  { word: "始まり", kana: "はじまり", value: 2 },
  { word: "終わり", kana: "おわり", value: 2 },
  { word: "二人", kana: "ふたり", value: 2 },
  { word: "奇跡", kana: "きせき", value: 3 },
  { word: "孤独", kana: "こどく", value: 3 },
  { word: "景色", kana: "けしき", value: 3 },
  { word: "永遠", kana: "えいえん", value: 3 },
  { word: "運命", kana: "うんめい", value: 3 },
  { word: "記憶", kana: "きおく", value: 3 },
  { word: "軌跡", kana: "きせき", value: 3 },
  { word: "鼓動", kana: "こどう", value: 3 },
  { word: "願い", kana: "ねがい", value: 3 },
  { word: "幻", kana: "まぼろし", value: 3 },
  { word: "宝物", kana: "たからもの", value: 3 },
  { word: "面影", kana: "おもかげ", value: 3 },
  { word: "温もり", kana: "ぬくもり", value: 3 },
  { word: "憧れ", kana: "あこがれ", value: 3 },
  { word: "約束の場所", kana: "やくそくのばしょ", value: 3 },
  { word: "永遠に", kana: "えいえんに", value: 3 },
  { word: "巡り会う", kana: "めぐりあう", value: 3 },
  { word: "旅立ち", kana: "たびだち", value: 3 },
  { word: "黄昏", kana: "たそがれ", value: 3 },
  { word: "流れ星", kana: "ながれぼし", value: 3 },
  { word: "透明", kana: "とうめい", value: 3 },
  { word: "約束した", kana: "やくそくした", value: 3 },
  { word: "忘れない", kana: "わすれない", value: 3 },
  { word: "抱きしめる", kana: "だきしめる", value: 3 },
  { word: "消えない", kana: "きえない", value: 3 },
  { word: "振り返る", kana: "ふりかえる", value: 3 },
  { word: "真夜中", kana: "まよなか", value: 3 },
  { word: "雨上がり", kana: "あめあがり", value: 3 },
  { word: "境界線", kana: "きょうかいせん", value: 3 },
  { word: "残響", kana: "ざんきょう", value: 3 },
  { word: "ため息", kana: "ためいき", value: 3 },
  { word: "片思い", kana: "かたおもい", value: 3 },
  { word: "桜", kana: "さくら", value: 1 },
  { word: "雪", kana: "ゆき", value: 1 },
  { word: "雲", kana: "くも", value: 1 },
  { word: "虹", kana: "にじ", value: 1 },
  { word: "扉", kana: "とびら", value: 1 },
  { word: "翼", kana: "つばさ", value: 1 },
  { word: "涙声", kana: "なみだごえ", value: 2 },
  { word: "微笑み", kana: "ほほえみ", value: 2 },
  { word: "旋律", kana: "せんりつ", value: 2 },
  { word: "メロディ", kana: "めろでぃ", value: 2 },
  { word: "リズム", kana: "りずむ", value: 2 },
  { word: "鼓膜", kana: "こまく", value: 2 },
  { word: "叫ぶ", kana: "さけぶ", value: 2 },
  { word: "走る", kana: "はしる", value: 2 },
  { word: "飛ぶ", kana: "とぶ", value: 2 },
  { word: "守る", kana: "まもる", value: 2 },
  { word: "信じる", kana: "しんじる", value: 2 },
  { word: "傷跡", kana: "きずあと", value: 2 },
  { word: "祈り", kana: "いのり", value: 2 },
  { word: "指先", kana: "ゆびさき", value: 2 },
  { word: "足音", kana: "あしおと", value: 2 },
  { word: "夕焼け", kana: "ゆうやけ", value: 2 },
  { word: "青空", kana: "あおぞら", value: 2 },
  { word: "帰り道", kana: "かえりみち", value: 2 },
  { word: "放課後", kana: "ほうかご", value: 2 },
  { word: "初恋", kana: "はつこい", value: 2 },
  { word: "恋心", kana: "こいごころ", value: 2 },
  { word: "告白", kana: "こくはく", value: 2 },
  { word: "笑い声", kana: "わらいごえ", value: 2 },
  { word: "温度", kana: "おんど", value: 2 },
  { word: "まっすぐ", kana: "まっすぐ", value: 2 },
  { word: "キラキラ", kana: "きらきら", value: 2 },
  { word: "ドキドキ", kana: "どきどき", value: 2 },
  { word: "バイバイ", kana: "ばいばい", value: 2 },
  { word: "夜風", kana: "よかぜ", value: 2 },
  { word: "月明かり", kana: "つきあかり", value: 3 },
  { word: "流星", kana: "りゅうせい", value: 3 },
  { word: "銀河", kana: "ぎんが", value: 3 },
  { word: "革命", kana: "かくめい", value: 3 },
  { word: "衝動", kana: "しょうどう", value: 3 },
  { word: "限界", kana: "げんかい", value: 3 },
  { word: "絶望", kana: "ぜつぼう", value: 3 },
  { word: "幻想", kana: "げんそう", value: 3 },
  { word: "残酷", kana: "ざんこく", value: 3 },
  { word: "覚醒", kana: "かくせい", value: 3 },
  { word: "運命線", kana: "うんめいせん", value: 3 },
  { word: "透明な心", kana: "とうめいなこころ", value: 3 },
  { word: "消えた約束", kana: "きえたやくそく", value: 3 },
  { word: "雨音", kana: "あまおと", value: 2 },
  { word: "傘", kana: "かさ", value: 1 },
  { word: "濡れる", kana: "ぬれる", value: 2 },
  { word: "水たまり", kana: "みずたまり", value: 3 },
  { word: "木漏れ日", kana: "こもれび", value: 3 },
  { word: "ぬくもり", kana: "ぬくもり", value: 2 },
  { word: "眠る", kana: "ねむる", value: 2 },
  { word: "揺れる", kana: "ゆれる", value: 2 },
  { word: "記念日", kana: "きねんび", value: 3 },
  { word: "アルバム", kana: "あるばむ", value: 3 },
  { word: "写真", kana: "しゃしん", value: 2 },
  { word: "手紙", kana: "てがみ", value: 2 },
  { word: "思い出", kana: "おもいで", value: 2 },
  { word: "窓", kana: "まど", value: 1 },
  { word: "夕暮れ", kana: "ゆうぐれ", value: 2 },
  { word: "遠回り", kana: "とおまわり", value: 3 },
];

const WORD_THEMES = [
  { id: "all", name: "不分组：全词库" },
  {
    id: "love",
    name: "恋爱歌",
    words: [
      "君", "僕", "私", "好き", "愛", "心", "声", "胸", "涙", "名前", "嘘", "笑う", "泣く", "約束", "未来", "笑顔",
      "言葉", "さよなら", "ありがとう", "ひとり", "想い", "痛み", "秘密", "大切", "二人", "奇跡", "運命", "記憶",
      "願い", "宝物", "温もり", "憧れ", "永遠に", "巡り会う", "忘れない", "抱きしめる", "消えない", "片思い",
    ],
  },
  {
    id: "youth",
    name: "青春歌",
    words: [
      "明日", "手", "今日", "道", "歌", "春", "夏", "朝", "時", "街", "生きる", "未来", "世界", "光", "笑顔", "季節",
      "希望", "勇気", "自由", "青春", "夢中", "大切", "始まり", "二人", "奇跡", "景色", "鼓動", "旅立ち",
      "流れ星", "透明", "振り返る", "雨上がり",
    ],
  },
  {
    id: "night",
    name: "夜空歌",
    words: [
      "夜", "夢", "空", "月", "海", "影", "風", "花", "雨", "夜明け", "星空", "ひとり", "孤独", "景色", "永遠",
      "記憶", "幻", "面影", "黄昏", "流れ星", "透明", "消えない", "真夜中", "雨上がり", "境界線", "残響",
      "ため息", "片思い", "願い", "光", "心", "声",
    ],
  },
  {
    id: "farewell",
    name: "离别歌",
    words: [
      "涙", "明日", "手", "名前", "嘘", "影", "泣く", "約束", "時間", "雨", "言葉", "さよなら", "最後", "終わり",
      "ひとり", "想い", "痛み", "弱さ", "答え", "孤独", "記憶", "願い", "面影", "温もり", "旅立ち", "黄昏",
      "忘れない", "振り返る", "雨上がり", "残響", "ため息", "片思い",
    ],
  },
  {
    id: "energy",
    name: "热血歌",
    words: [
      "今", "夢", "心", "明日", "手", "今日", "道", "歌", "笑う", "生きる", "未来", "世界", "光", "笑顔", "希望",
      "勇気", "自由", "青春", "夢中", "大切", "始まり", "奇跡", "運命", "軌跡", "鼓動", "願い", "憧れ", "旅立ち",
      "流れ星", "透明", "消えない", "境界線",
    ],
  },
  {
    id: "anime",
    name: "动漫歌",
    words: [
      "君", "僕", "夢", "心", "明日", "手", "声", "道", "歌", "翼", "扉", "光", "希望", "勇気", "自由", "未来",
      "世界", "奇跡", "運命", "軌跡", "鼓動", "願い", "守る", "信じる", "走る", "飛ぶ", "革命", "衝動", "限界",
      "覚醒", "運命線", "残酷", "幻想", "星空", "流星", "銀河",
    ],
  },
  {
    id: "rock",
    name: "摇滚歌",
    words: [
      "今", "夢", "叫ぶ", "走る", "鼓動", "衝動", "限界", "革命", "自由", "強さ", "弱さ", "傷跡", "絶望", "希望",
      "リズム", "メロディ", "旋律", "鼓膜", "世界", "光", "影", "夜", "街", "声", "生きる", "境界線", "残響",
      "まっすぐ", "消えない", "透明",
    ],
  },
  {
    id: "healing",
    name: "治愈歌",
    words: [
      "空", "心", "朝", "春", "花", "風", "雨", "虹", "雲", "青空", "木漏れ日", "ぬくもり", "温もり", "微笑み",
      "眠る", "揺れる", "祈り", "ありがとう", "大切", "笑顔", "希望", "季節", "時間", "言葉", "声", "手",
      "宝物", "透明な心",
    ],
  },
  {
    id: "memory",
    name: "回忆歌",
    words: [
      "記憶", "思い出", "時", "季節", "時間", "写真", "手紙", "アルバム", "記念日", "名前", "約束", "最後",
      "始まり", "終わり", "帰り道", "放課後", "夕焼け", "夕暮れ", "遠回り", "面影", "宝物", "忘れない",
      "振り返る", "消えた約束", "さよなら", "ありがとう",
    ],
  },
  {
    id: "rain",
    name: "雨天歌",
    words: [
      "雨", "雨音", "雨上がり", "傘", "濡れる", "水たまり", "涙", "涙声", "夜", "夜風", "街", "影", "窓",
      "ため息", "片思い", "孤独", "痛み", "弱さ", "嘘", "記憶", "面影", "黄昏", "夕暮れ", "透明", "残響",
      "月明かり",
    ],
  },
];

let wordBank = loadStoredWordBank() ?? cloneData(DEFAULT_WORD_BANK);

const PLAYER_PRESETS = [
  { name: "红", color: "#e4564f" },
  { name: "蓝", color: "#367bd6" },
  { name: "黄", color: "#e2ad32" },
  { name: "绿", color: "#36a066" },
];

const state = {
  players: [],
  cards: [],
  round: 1,
  timeLeft: null,
  timerId: null,
  boardRefreshTimerId: null,
  boardRefreshDeadline: 0,
  claimNoticeUntil: 0,
  playerCount: 4,
  cardCount: 16,
  wordTheme: "all",
  penaltyMode: "light",
  activePlayer: null,
  selectedCardId: null,
  answerDeadlineId: null,
  answerStartedAt: 0,
  answerDuration: 2000,
  answerTimerId: null,
  history: [],
  boardAnimation: "deal",
  boardAnimationTimer: null,
  boardAnimationClearFor: null,
  drawnCardId: null,
  pendingConfirm: null,
  claimLyricIndex: -1,
  ncmSearchResults: [],
  ncmSearchLoading: false,
  ncmStatus: "可搜索网易云歌曲，也可继续上传本地音频。",
  ncmStatusType: "",
  ncmCurrentSong: null,
  ncmLyrics: [],
  ncmActiveLyricIndex: -1,
  songWordBank: [],
  ncmLoginStatus: "unknown",
  ncmLoginMessage: "登录后可尝试播放账号有权限的完整歌曲。",
  ncmQrKey: "",
  ncmQrImage: "",
  ncmQrPollingId: null,
  audioContext: null,
  dragCardId: null,
  dragPointerId: null,
  dragSource: null,
  dragGhost: null,
  dragDropPlayer: null,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const setupPanel = $("#setupPanel");
const gamePanel = $("#gamePanel");
const setupForm = $("#setupForm");
const wordThemeSelect = $("#wordTheme");
const board = $("#board");
const boardRefreshCountdown = $("#boardRefreshCountdown");
const scorebar = $("#scorebar");
const captures = $("#captures");
const claimPanel = $("#claimPanel");
const claimText = $("#claimText");
const claimActions = $("#claimActions");
const timer = $("#timer");
const roundNumber = $("#roundNumber");
const audioInput = $("#audioInput");
const audioPlayer = $("#audioPlayer");
const audioBox = $("#audioBox");
const ncmSearchForm = $("#ncmSearchForm");
const ncmSearchInput = $("#ncmSearchInput");
const ncmSearchButton = $("#ncmSearchButton");
const ncmStatus = $("#ncmStatus");
const ncmResults = $("#ncmResults");
const ncmCurrent = $("#ncmCurrent");
const ncmLyrics = $("#ncmLyrics");
const ncmLoginTitle = $("#ncmLoginTitle");
const ncmLoginText = $("#ncmLoginText");
const ncmLoginButton = $("#ncmLoginButton");
const ncmLoginQr = $("#ncmLoginQr");
const ncmLoginQrImage = $("#ncmLoginQrImage");
const ncmLoginQrText = $("#ncmLoginQrText");
const answerTimer = $("#answerTimer");
const answerTimerBar = $("#answerTimerBar");
const undoAction = $("#undoAction");
const resultModal = $("#resultModal");
const winnerTitle = $("#winnerTitle");
const resultList = $("#resultList");
const confirmModal = $("#confirmModal");
const confirmTitle = $("#confirmTitle");
const confirmText = $("#confirmText");
const confirmOk = $("#confirmOk");
const confirmCancel = $("#confirmCancel");
const captureModal = $("#captureModal");
const captureTitle = $("#captureTitle");
const captureSummary = $("#captureSummary");
const captureDetailList = $("#captureDetailList");
const closeCaptureDetail = $("#closeCaptureDetail");
const wordBankInput = $("#wordBankInput");
const wordBankCount = $("#wordBankCount");
const wordBankMessage = $("#wordBankMessage");
const effectLayer = $("#effectLayer");

renderWordBankStatus();
renderWordThemeOptions();
registerServiceWorker();
checkNcmLoginStatus();

gamePanel.addEventListener(
  "touchmove",
  (event) => {
    event.preventDefault();
  },
  { passive: false },
);

document.addEventListener("pointerdown", unlockSound, { once: true });
document.addEventListener("keydown", unlockSound, { once: true });

setupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  unlockSound();
  state.playerCount = Number($("#playerCount").value);
  state.cardCount = Number($("#cardCount").value);
  state.wordTheme = wordThemeSelect.value;
  state.penaltyMode = $("#penaltyMode").value;
  state.players = PLAYER_PRESETS.map((player, index) => ({
    ...player,
    name: state.playerCount === 1 && index === 0 ? "单人" : player.name,
    active: index < state.playerCount,
    score: 0,
    roundScore: 0,
    combo: 0,
    frozenUntil: 0,
    frozenUntilCardTouch: false,
    comboBurst: false,
    captures: [],
  }));
  state.round = 1;
  updateSongTimeLeft();
  state.history = [];
  state.boardAnimation = "deal";
  state.drawnCardId = null;
  gamePanel.dataset.playerCount = String(state.playerCount);
  setupPanel.classList.add("hidden");
  gamePanel.classList.remove("hidden");
  buildBoard();
  render();
  startBoardRefreshTimer();
});

audioInput.addEventListener("change", () => {
  const [file] = audioInput.files;
  if (!file) return;
  resetNcmPlaybackState("已切换到本地音频");
  audioPlayer.src = URL.createObjectURL(file);
  state.timeLeft = null;
  renderTimer();
  audioBox.open = false;
});

ncmSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchNcmSongs();
});

ncmLoginButton.addEventListener("click", startNcmQrLogin);
audioPlayer.addEventListener("loadedmetadata", () => {
  updateSongTimeLeft();
  renderTimer();
});
audioPlayer.addEventListener("durationchange", () => {
  updateSongTimeLeft();
  renderTimer();
});
audioPlayer.addEventListener("timeupdate", () => {
  renderActiveLyricLine();
  updateSongTimeLeft();
  renderTimer();
});
audioPlayer.addEventListener("play", () => {
  startTimer();
  renderNcmPanel();
});
audioPlayer.addEventListener("pause", () => {
  stopTimer();
  renderNcmPanel();
});
audioPlayer.addEventListener("ended", () => {
  stopTimer();
  updateSongTimeLeft();
  clearClaim("本首结束，点结算进入下一首");
  renderNcmPanel();
  renderTimer();
});

$("#startRound").addEventListener("click", () => {
  audioPlayer.play().catch(() => {});
  startTimer();
});

$("#pauseRound").addEventListener("click", () => {
  audioPlayer.pause();
  stopTimer();
});

$("#newBoard").addEventListener("click", () => {
  clearClaim();
  shuffleBoard();
});

$("#finishRound").addEventListener("click", () => {
  requestConfirm({
    title: "结算本首？",
    text: "会清空本首拿到的词和连击，进入下一首歌。",
    onConfirm: finishRound,
  });
});
$("#undoAction").addEventListener("click", undoLastAction);
$("#endGame").addEventListener("click", () => {
  requestConfirm({
    title: "结束本局？",
    text: "会暂停音乐并打开最终排名，当前分数会保留。",
    onConfirm: showResults,
  });
});
$("#continueGame").addEventListener("click", () => resultModal.classList.add("hidden"));
$("#resetGame").addEventListener("click", resetGame);
confirmCancel.addEventListener("click", closeConfirm);
confirmOk.addEventListener("click", runConfirm);
closeCaptureDetail.addEventListener("click", closeCaptureModal);
$("#loadWordBank").addEventListener("click", importWordBank);
$("#exportWordBank").addEventListener("click", fillWordBankEditor);
$("#resetWordBank").addEventListener("click", resetWordBank);
$("#markCorrect").addEventListener("click", markCorrect);
$("#markWrong").addEventListener("click", markWrong);
$("#cancelClaim").addEventListener("click", () => clearClaim());

$$(".corner-player").forEach((button) => {
  button.addEventListener("pointerdown", (event) => event.preventDefault());
});

function buildBoard() {
  const playableBank = getPlayableWordBank();
  const targetCounts = {
    1: Math.ceil(state.cardCount * 0.45),
    2: Math.ceil(state.cardCount * 0.35),
    3: state.cardCount,
  };
  targetCounts[3] = state.cardCount - targetCounts[1] - targetCounts[2];

  const selected = [1, 2, 3].flatMap((value) =>
    shuffle(playableBank.filter((card) => card.value === value)).slice(0, targetCounts[value]),
  );
  const selectedWords = new Set(selected.map((card) => card.word));
  const fillers = shuffle(playableBank.filter((card) => !selectedWords.has(card.word))).slice(0, state.cardCount - selected.length);
  const boardCards = [...selected, ...fillers];

  while (boardCards.length < state.cardCount) {
    boardCards.push(shuffle(playableBank)[0]);
  }

  state.cards = shuffle(boardCards)
    .slice(0, state.cardCount)
    .map((card, index) => ({
      ...makeCard(card, index),
    }));
}

function grabPlayer(index) {
  const player = state.players[index];
  if (!player?.active || state.activePlayer !== null) return;
  if (player.frozenUntilCardTouch || Date.now() < player.frozenUntil) return;

  state.activePlayer = index;
  state.selectedCardId = null;
  state.claimLyricIndex = getCurrentLyricIndex();
  showGrabWave(index);
  startAnswerTimer();
  window.clearTimeout(state.answerDeadlineId);
  state.answerDeadlineId = window.setTimeout(() => {
    applyWrong(index, "超时");
  }, 2000);
  render();
}

function handleWordCardPointerDown(event, cardId) {
  if (isSinglePlayerMode()) {
    selectCard(cardId);
    return;
  }
  startCardDrag(event, cardId);
}

function selectCard(cardId) {
  if (state.activePlayer === null && isSinglePlayerMode()) {
    selectSinglePlayerCard(cardId);
    return;
  }
  if (state.activePlayer === null) return;
  const card = state.cards.find((item) => item.id === cardId);
  if (!card || card.claimed) return;
  releaseCardTouchFreezes(state.activePlayer);
  window.clearTimeout(state.answerDeadlineId);
  stopAnswerTimer();
  state.selectedCardId = cardId;
  if (isCardInClaimLyricWindow(card)) {
    markCorrect();
  } else {
    const reason = state.claimLyricIndex < 0 ? "无歌词" : "未命中当前歌词";
    applyWrong(state.activePlayer, reason);
  }
}

function selectSinglePlayerCard(cardId) {
  const player = state.players[0];
  if (!player?.active || player.frozenUntilCardTouch || Date.now() < player.frozenUntil) return;
  const card = state.cards.find((item) => item.id === cardId);
  if (!card || card.claimed) return;
  state.activePlayer = 0;
  state.selectedCardId = cardId;
  state.claimLyricIndex = getCurrentLyricIndex();
  releaseCardTouchFreezes(0);
  if (!state.ncmLyrics.length || isCardInClaimLyricWindow(card)) {
    markCorrect();
  } else {
    applyWrong(0, state.claimLyricIndex < 0 ? "无歌词" : "未命中当前歌词");
  }
}

function startCardDrag(event, cardId) {
  const sourceButton = event.currentTarget;
  const card = state.cards.find((item) => item.id === cardId);
  if (!card || card.claimed || state.boardAnimation === "shuffle" || state.activePlayer !== null) return;
  event.preventDefault();
  unlockSound();
  state.dragCardId = cardId;
  state.dragPointerId = event.pointerId;
  state.dragSource = sourceButton;
  state.dragDropPlayer = null;
  sourceButton.classList.add("dragging");
  sourceButton.setPointerCapture?.(event.pointerId);
  state.dragGhost = createDragGhost(sourceButton);
  document.body.classList.add("is-card-dragging");
  updateDragPosition(event.clientX, event.clientY);
  setDropZonesReady(true);
  sourceButton.addEventListener("lostpointercapture", handleLostPointerCapture);
  window.addEventListener("pointermove", handleCardDragMove, { capture: true });
  window.addEventListener("pointerup", finishCardDrag, { capture: true });
  window.addEventListener("pointercancel", cancelCardDrag, { capture: true });
  window.addEventListener("blur", cancelCardDragFromSystem);
  document.addEventListener("visibilitychange", handleDragVisibilityChange);
  document.addEventListener("pointerdown", blockExtraPointerDuringDrag, { capture: true });
  document.addEventListener("touchstart", blockExtraTouchDuringDrag, { capture: true, passive: false });
}

function createDragGhost(sourceButton) {
  const rect = sourceButton.getBoundingClientRect();
  const ghost = sourceButton.cloneNode(true);
  ghost.className = `${sourceButton.className} drag-ghost`;
  ghost.style.width = `${rect.width}px`;
  ghost.style.height = `${rect.height}px`;
  document.body.append(ghost);
  return ghost;
}

function handleCardDragMove(event) {
  if (event.pointerId !== state.dragPointerId) return;
  event.preventDefault();
  event.stopPropagation();
  updateDragPosition(event.clientX, event.clientY);
}

function updateDragPosition(clientX, clientY) {
  if (state.dragGhost) {
    state.dragGhost.style.left = `${clientX}px`;
    state.dragGhost.style.top = `${clientY}px`;
  }
  const dropPlayer = getDropPlayerAt(clientX, clientY);
  state.dragDropPlayer = dropPlayer;
  updateDropZoneHighlights(dropPlayer);
}

function finishCardDrag(event) {
  if (event.pointerId !== state.dragPointerId) return;
  event.preventDefault();
  event.stopPropagation();
  const cardId = state.dragCardId;
  const playerIndex = state.dragDropPlayer;
  cleanupCardDrag();
  if (cardId && playerIndex !== null) {
    dropCardOnPlayer(cardId, playerIndex);
  } else {
    showTemporaryClaimNotice("把词卡拖到自己的区域", 1800);
  }
}

function cancelCardDrag(event) {
  if (event?.pointerId !== undefined && event.pointerId !== state.dragPointerId) return;
  cleanupCardDrag();
}

function cleanupCardDrag() {
  const source = state.dragSource;
  if (source && state.dragPointerId !== null) {
    try {
      source.releasePointerCapture?.(state.dragPointerId);
    } catch {}
    source.removeEventListener("lostpointercapture", handleLostPointerCapture);
  }
  window.removeEventListener("pointermove", handleCardDragMove, { capture: true });
  window.removeEventListener("pointerup", finishCardDrag, { capture: true });
  window.removeEventListener("pointercancel", cancelCardDrag, { capture: true });
  window.removeEventListener("blur", cancelCardDragFromSystem);
  document.removeEventListener("visibilitychange", handleDragVisibilityChange);
  document.removeEventListener("pointerdown", blockExtraPointerDuringDrag, { capture: true });
  document.removeEventListener("touchstart", blockExtraTouchDuringDrag, { capture: true });
  $$(".word-card.dragging").forEach((card) => card.classList.remove("dragging"));
  state.dragGhost?.remove();
  state.dragCardId = null;
  state.dragPointerId = null;
  state.dragSource = null;
  state.dragGhost = null;
  state.dragDropPlayer = null;
  document.body.classList.remove("is-card-dragging");
  setDropZonesReady(false);
  updateDropZoneHighlights(null);
}

function handleLostPointerCapture(event) {
  if (event.pointerId !== state.dragPointerId) return;
  window.setTimeout(() => {
    if (state.dragPointerId === event.pointerId) cancelCardDrag(event);
  }, 80);
}

function cancelCardDragFromSystem() {
  if (state.dragPointerId !== null) cleanupCardDrag();
}

function handleDragVisibilityChange() {
  if (document.hidden) cancelCardDragFromSystem();
}

function blockExtraTouchDuringDrag(event) {
  if (state.dragPointerId === null) return;
  event.preventDefault();
  event.stopPropagation();
}

function blockExtraPointerDuringDrag(event) {
  if (state.dragPointerId === null || event.pointerId === state.dragPointerId) return;
  event.preventDefault();
  event.stopPropagation();
}

function getDropPlayerAt(clientX, clientY) {
  const zone = document
    .elementsFromPoint(clientX, clientY)
    .find((element) => element.classList?.contains("corner-player") && !element.classList.contains("hidden"));
  if (!zone) return null;
  const playerIndex = Number(zone.dataset.player);
  const player = state.players[playerIndex];
  if (!player?.active || player.frozenUntilCardTouch || Date.now() < player.frozenUntil) return null;
  return playerIndex;
}

function updateDropZoneHighlights(playerIndex) {
  $$(".corner-player").forEach((zone) => {
    zone.classList.toggle("drop-hover", Number(zone.dataset.player) === playerIndex);
  });
}

function setDropZonesReady(isReady) {
  $$(".corner-player").forEach((zone) => {
    const playerIndex = Number(zone.dataset.player);
    const player = state.players[playerIndex];
    const enabled = Boolean(player?.active && !player.frozenUntilCardTouch && Date.now() >= player.frozenUntil);
    zone.classList.toggle("drop-ready", isReady && enabled);
  });
}

function dropCardOnPlayer(cardId, playerIndex) {
  const player = state.players[playerIndex];
  const card = state.cards.find((item) => item.id === cardId);
  if (!player?.active || !card || card.claimed) return;
  if (player.frozenUntilCardTouch || Date.now() < player.frozenUntil) return;
  state.activePlayer = playerIndex;
  state.selectedCardId = cardId;
  state.claimLyricIndex = getCurrentLyricIndex();
  releaseCardTouchFreezes(playerIndex);
  showGrabWave(playerIndex);
  if (isCardInClaimLyricWindow(card)) {
    markCorrect();
  } else {
    const reason = state.claimLyricIndex < 0 ? "无歌词" : "未命中当前歌词";
    applyWrong(playerIndex, reason);
  }
}

function markCorrect() {
  if (state.activePlayer === null || !state.selectedCardId) return;
  const player = state.players[state.activePlayer];
  const cardIndex = state.cards.findIndex((item) => item.id === state.selectedCardId);
  const card = state.cards[cardIndex];
  if (!player || !card) return;

  rememberState();
  const base = card.value;
  player.combo += 1;
  const comboBonus = player.combo > 0 && player.combo % 3 === 0 ? 2 : 0;
  const gained = base + comboBonus;
  player.score += base + comboBonus;
  player.roundScore += base + comboBonus;
  player.captures.unshift({
    ...card,
    repeated: false,
    gained,
    bonusText: comboBonus ? ` +${comboBonus}连击` : "",
  });
  showScoreFloat(cardIndex, gained, comboBonus);
  playSound(comboBonus ? "combo" : "correct");
  if (comboBonus) {
    triggerComboBurst(state.activePlayer);
  }
  const replacementCard = drawReplacementCard(cardIndex, card.word);
  state.cards[cardIndex] = replacementCard;
  state.drawnCardId = replacementCard.id;
  state.boardAnimation = "draw";
  clearClaim();
  render();
}

function markWrong() {
  if (state.activePlayer === null) return;
  applyWrong(state.activePlayer, "错误");
}

function applyWrong(playerIndex, reason) {
  const player = state.players[playerIndex];
  if (!player) return;
  rememberState();
  player.score -= 1;
  player.roundScore -= 1;
  player.combo = 0;
  if (state.penaltyMode === "standard" && !isSinglePlayerMode()) {
    player.frozenUntilCardTouch = true;
  } else {
    player.frozenUntil = Date.now() + 2000;
    window.setTimeout(render, 2050);
  }
  playSound("wrong");
  clearClaim(`${player.name} ${reason}，-1`);
  render();
}

function clearClaim(message = null) {
  window.clearTimeout(state.answerDeadlineId);
  stopAnswerTimer();
  state.activePlayer = null;
  state.selectedCardId = null;
  state.claimLyricIndex = -1;
  state.claimNoticeUntil = 0;
  claimText.textContent = message ?? getIdleClaimText();
  claimPanel.className = "claim-panel idle";
  claimActions.classList.add("hidden");
  $$(".corner-player").forEach((button) => button.classList.remove("active"));
}

function finishRound() {
  stopTimer();
  audioPlayer.pause();
  state.history = [];
  state.round += 1;
  state.timeLeft = null;
  state.players.forEach((player) => {
    player.roundScore = 0;
    player.combo = 0;
    player.frozenUntilCardTouch = false;
    player.frozenUntil = 0;
    player.captures = [];
  });
  clearClaim("已进入下一首，换歌后开始");
  shuffleBoard("已进入下一首，换歌后开始");
}

function startTimer() {
  if (state.timerId) return;
  updateSongTimeLeft();
  renderTimer();
  startBoardRefreshTimer();
  state.timerId = window.setInterval(() => {
    updateSongTimeLeft();
    renderTimer();
    if (state.timeLeft === 0 && hasKnownAudioDuration()) {
      stopTimer();
      clearClaim("本首结束，点结算进入下一首");
    }
  }, 250);
}

function stopTimer() {
  window.clearInterval(state.timerId);
  state.timerId = null;
  stopBoardRefreshTimer();
}

function startBoardRefreshTimer() {
  stopBoardRefreshTimer();
  resetBoardRefreshDeadline(true);
  updateBoardRefreshCountdown();
  state.boardRefreshTimerId = window.setInterval(refreshBoardFromTimer, BOARD_REFRESH_TICK_MS);
}

function stopBoardRefreshTimer() {
  window.clearInterval(state.boardRefreshTimerId);
  state.boardRefreshTimerId = null;
  state.boardRefreshDeadline = 0;
  updateBoardRefreshCountdown();
}

function refreshBoardFromTimer() {
  if (gamePanel.classList.contains("hidden")) return;
  if (!state.boardRefreshDeadline) return;
  const remainingMs = state.boardRefreshDeadline - Date.now();
  if (remainingMs > 0) {
    updateBoardRefreshCountdown(Math.ceil(remainingMs / 1000));
    return;
  }
  if (state.activePlayer !== null || state.boardAnimation === "shuffle") {
    state.boardRefreshDeadline = Date.now() + 1000;
    updateBoardRefreshCountdown(1);
    return;
  }
  resetBoardRefreshDeadline();
  shuffleBoard("15 秒换牌");
}

function resetBoardRefreshDeadline(force = false) {
  if (!force && !state.boardRefreshTimerId && !state.timerId) return;
  state.boardRefreshDeadline = Date.now() + BOARD_REFRESH_INTERVAL_MS;
}

function updateBoardRefreshCountdown(secondsLeft = null) {
  const seconds = secondsLeft ?? Math.max(0, Math.ceil((state.boardRefreshDeadline - Date.now()) / 1000));
  boardRefreshCountdown.textContent = state.boardRefreshTimerId && state.boardRefreshDeadline ? `换牌 ${seconds}s` : "换牌 --";
  if (state.activePlayer !== null || Date.now() < state.claimNoticeUntil) return;
  if (!state.boardRefreshTimerId || !state.boardRefreshDeadline) {
    if (claimText.textContent.startsWith("下次换牌")) {
      claimText.textContent = getIdleClaimText();
    }
    return;
  }
  claimText.textContent = `下次换牌 ${seconds} 秒`;
}

function showTemporaryClaimNotice(message, durationMs = 3500) {
  if (state.activePlayer !== null) return;
  state.claimNoticeUntil = Date.now() + durationMs;
  claimText.textContent = message;
  window.setTimeout(updateBoardRefreshCountdown, durationMs + 50);
}

function render() {
  renderScorebar();
  renderCorners();
  renderBoard();
  renderCaptures();
  renderClaim();
  renderNcmPanel();
  renderTimer();
  roundNumber.textContent = state.round;
  undoAction.disabled = state.history.length === 0;
  board.style.setProperty("--board-columns", getBoardColumns());
  board.style.setProperty("--board-rows", getBoardRows());
  board.style.setProperty("--card-font-size", getCardFontSize());
  board.style.setProperty("--kana-font-size", getKanaFontSize());
  board.style.setProperty("--card-padding", getCardPadding());
  board.style.setProperty("--card-badge-size", getCardBadgeSize());
  board.style.setProperty("--card-badge-offset", getCardBadgeOffset());
  board.style.setProperty("--board-gap", getBoardGap());
}

function renderScorebar() {
  scorebar.innerHTML = state.players
    .filter((player) => player.active)
    .map(
      (player) => `
        <article class="score-card" style="--player-color:${player.color}">
          <span class="score-dot"></span>
          <div>
            <div class="score-name">${player.name}队</div>
            <div class="score-meta">本首 ${formatSigned(player.roundScore)} / 连击 ${player.combo}</div>
          </div>
          <strong class="score-value ${player.comboBurst ? "combo-burst" : ""}">${player.score}</strong>
        </article>
      `,
    )
    .join("");
}

function renderCorners() {
  $$(".corner-player").forEach((button) => {
    const index = Number(button.dataset.player);
    const player = state.players[index];
    const frozen = player?.frozenUntilCardTouch || Date.now() < player?.frozenUntil;
    button.style.setProperty("--player-color", player?.color ?? "#999");
    button.classList.toggle("hidden", isSinglePlayerMode() || !player?.active);
    button.classList.toggle("frozen", Boolean(frozen));
    button.classList.toggle("active", state.activePlayer === index);
    button.textContent = frozen ? `${player.name} 冻结` : `${player.name}区`;
  });
}

function renderBoard() {
  board.classList.toggle("is-shuffling", state.boardAnimation === "shuffle");
  board.innerHTML = state.cards
    .map((card, index) => {
      const selected = state.selectedCardId === card.id;
      const animationClass = getCardAnimationClass(card);
      return `
        <button
          class="word-card ${card.claimed ? "claimed" : ""} ${selected ? "selected" : ""} ${animationClass}"
          style="--card-bg:${cardColor(card.value)}; --active-color:${activeColor()}; --deal-delay:${index * 24}ms"
          data-card="${card.id}"
          type="button"
        >
          <span class="points">${card.value}</span>
          <span>
            <span class="word">${card.word}</span>
            <span class="kana">${card.kana}</span>
          </span>
        </button>
      `;
    })
    .join("");
  $$(".word-card").forEach((button) => {
    button.addEventListener("pointerdown", (event) => handleWordCardPointerDown(event, button.dataset.card));
  });
  if (state.boardAnimation === "deal" || state.boardAnimation === "draw") {
    scheduleBoardAnimationClear(state.boardAnimation);
  }
}

function renderCaptures() {
  captures.innerHTML = state.players
    .map((player, playerIndex) => ({ player, playerIndex }))
    .filter(({ player }) => player.active)
    .map(
      ({ player, playerIndex }) => `
        <button class="capture-row" style="--player-color:${player.color}" data-player="${playerIndex}" type="button">
          <div class="capture-title">
            <span><span class="capture-dot"></span>${player.name} 已拿词</span>
            <strong>${player.captures.length}张 / ${formatSigned(player.roundScore)}</strong>
          </div>
          <div class="chips">
            ${player.captures
              .slice(0, 8)
              .map(
                (capture) => `
                  <span class="chip">
                    ${capture.word} +${capture.gained}${capture.bonusText}
                  </span>
                `,
              )
              .join("")}
            ${player.captures.length > 8 ? `<span class="chip more">+${player.captures.length - 8}</span>` : ""}
          </div>
        </button>
      `,
    )
    .join("");
  $$(".capture-row").forEach((button) => {
    button.addEventListener("click", () => showCaptureDetail(Number(button.dataset.player)));
  });
}

function renderClaim() {
  if (state.activePlayer === null) {
    claimActions.classList.add("hidden");
    answerTimer.classList.add("hidden");
    claimPanel.classList.remove("active");
    claimPanel.classList.remove("judging");
    claimPanel.style.removeProperty("--active-color");
    updateBoardRefreshCountdown();
    if (!state.boardRefreshTimerId) {
      claimText.textContent = getIdleClaimText();
    }
    return;
  }
  const player = state.players[state.activePlayer];
  const card = state.cards.find((item) => item.id === state.selectedCardId);
  claimPanel.classList.add("active");
  claimPanel.classList.toggle("judging", Boolean(card));
  claimPanel.style.setProperty("--active-color", player.color);
  claimText.textContent = card ? `${player.name}队选择了「${card.word}」` : `${player.name}队抢到，2 秒内点词卡，系统自动判定`;
  claimActions.classList.add("hidden");
  answerTimer.classList.toggle("hidden", Boolean(card));
}

function getIdleClaimText() {
  return isSinglePlayerMode() ? "听到词后，直接点词卡" : "把词卡拖到自己的颜色区域";
}

function isSinglePlayerMode() {
  return state.playerCount === 1;
}

function renderTimer() {
  if (!Number.isFinite(state.timeLeft)) {
    timer.textContent = "--:--";
    return;
  }
  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft % 60;
  timer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateSongTimeLeft() {
  if (!hasKnownAudioDuration()) {
    state.timeLeft = null;
    return;
  }
  state.timeLeft = Math.max(0, Math.ceil(audioPlayer.duration - audioPlayer.currentTime));
}

function hasKnownAudioDuration() {
  return Number.isFinite(audioPlayer.duration) && audioPlayer.duration > 0;
}

async function searchNcmSongs() {
  const keywords = ncmSearchInput.value.trim();
  if (!keywords) {
    setNcmStatus("先输入歌曲名、歌手或动画名", "error");
    return;
  }
  state.ncmSearchLoading = true;
  state.ncmSearchResults = [];
  setNcmStatus("正在搜索网易云...", "");
  renderNcmPanel();
  try {
    const data = await fetchNcmJson("/search", { keywords, limit: 12 });
    const songs = data.result?.songs ?? [];
    state.ncmSearchResults = songs.map(normalizeNcmSong);
    setNcmStatus(songs.length ? `找到 ${songs.length} 首，点歌名即可加载播放和歌词` : "没有搜到结果", songs.length ? "ok" : "error");
  } catch (error) {
    setNcmStatus(`搜索失败：${error.message}`, "error");
  } finally {
    state.ncmSearchLoading = false;
    renderNcmPanel();
  }
}

async function loadNcmSong(songId) {
  const song = state.ncmSearchResults.find((item) => item.id === songId);
  if (!song) return;
  setNcmStatus(`正在加载「${song.name}」...`, "");
  state.ncmCurrentSong = song;
  state.ncmLyrics = [];
  state.ncmActiveLyricIndex = -1;
  state.songWordBank = [];
  renderNcmPanel();
  try {
    const [urlData, lyricData] = await Promise.all([
      fetchNcmJson("/song/url/v1", { id: song.id, level: "standard" }),
      fetchNcmJson("/lyric", { id: song.id }),
    ]);
    const playable = urlData.data?.find((item) => item.url);
    if (!playable?.url) {
      throw new Error(urlData.data?.[0]?.message || "没有可播放地址，可能需要登录 Cookie 或版权受限");
    }
    audioPlayer.src = playable.url;
    state.ncmLyrics = mergeNcmLyrics(lyricData);
    setNcmStatus(
      state.ncmLyrics.length
        ? "歌曲和歌词已加载，AI 分词后台处理中"
        : "歌曲已加载，但没有歌词",
      "ok",
    );
    audioBox.open = true;
    audioPlayer.play().catch(() => {
      setNcmStatus("歌曲已加载，点播放器开始播放", "ok");
      renderNcmPanel();
    });
    if (state.ncmLyrics.length) {
      updateSongWordBankInBackground(song.id, state.ncmLyrics);
    }
  } catch (error) {
    setNcmStatus(`加载失败：${error.message}`, "error");
  } finally {
    renderNcmPanel();
  }
}

function renderNcmPanel() {
  const isCompact = Boolean(state.ncmCurrentSong && !audioPlayer.paused && state.ncmLyrics.length);
  audioBox.classList.toggle("is-compact", isCompact);
  if (isCompact) audioBox.open = true;
  ncmSearchButton.disabled = state.ncmSearchLoading;
  ncmLoginTitle.textContent = getNcmLoginTitle();
  ncmLoginText.textContent = state.ncmLoginMessage;
  ncmLoginButton.disabled = state.ncmLoginStatus === "checking" || state.ncmLoginStatus === "waiting" || state.ncmLoginStatus === "scanned";
  ncmLoginButton.textContent = state.ncmLoginStatus === "logged-in" ? "重新登录" : "扫码登录";
  ncmLoginQr.classList.toggle("hidden", !state.ncmQrImage);
  ncmLoginQrImage.src = state.ncmQrImage || "";
  ncmLoginQrText.textContent = getNcmQrText();
  ncmStatus.textContent = state.ncmStatus;
  ncmStatus.className = `ncm-status ${state.ncmStatusType}`.trim();
  ncmResults.innerHTML = state.ncmSearchResults
    .map(
      (song) => `
        <button class="ncm-result" type="button" data-song-id="${song.id}">
          <span>
            <strong>${escapeHtml(song.name)}</strong>
            <small>${escapeHtml(song.artists)} · ${escapeHtml(song.album)}</small>
          </span>
          <b>${formatDuration(song.duration)}</b>
        </button>
      `,
    )
    .join("");
  $$(".ncm-result").forEach((button) => {
    button.addEventListener("click", () => loadNcmSong(Number(button.dataset.songId)));
  });
  ncmCurrent.classList.toggle("hidden", !state.ncmCurrentSong);
  ncmCurrent.innerHTML = state.ncmCurrentSong
    ? `<strong>${escapeHtml(state.ncmCurrentSong.name)}</strong><span>${escapeHtml(state.ncmCurrentSong.artists)}</span>`
    : "";
  ncmLyrics.classList.toggle("hidden", state.ncmLyrics.length === 0);
  ncmLyrics.classList.toggle("is-playing", !audioPlayer.paused && state.ncmLyrics.length > 0);
  ncmLyrics.innerHTML = state.ncmLyrics
    .map(
      (line, index) => `
        <p class="${getLyricLineClass(index)}" data-lyric-index="${index}">
          <span>${escapeHtml(line.text)}</span>
          ${line.translation ? `<small>${escapeHtml(line.translation)}</small>` : ""}
        </p>
      `,
    )
    .join("");
}

async function checkNcmLoginStatus() {
  state.ncmLoginStatus = "checking";
  renderNcmPanel();
  try {
    const data = await fetchNcmJson("/login/status", { timestamp: Date.now() });
    const profile = data.data?.profile || data.data?.account || null;
    if (profile) {
      state.ncmLoginStatus = "logged-in";
      state.ncmLoginMessage = profile.nickname ? `已登录：${profile.nickname}` : "已登录网易云账号";
    } else {
      state.ncmLoginStatus = "logged-out";
      state.ncmLoginMessage = "登录后可尝试播放账号有权限的完整歌曲。";
    }
  } catch {
    state.ncmLoginStatus = "logged-out";
    state.ncmLoginMessage = "无法确认登录状态，可重新扫码。";
  } finally {
    renderNcmPanel();
  }
}

async function startNcmQrLogin() {
  stopNcmQrPolling();
  state.ncmLoginStatus = "checking";
  state.ncmLoginMessage = "正在生成二维码...";
  state.ncmQrImage = "";
  renderNcmPanel();
  try {
    const keyData = await fetchNcmJson("/login/qr/key", { timestamp: Date.now() });
    state.ncmQrKey = keyData.data?.unikey || "";
    if (!state.ncmQrKey) {
      throw new Error("未获取到二维码 key");
    }
    const qrData = await fetchNcmJson("/login/qr/create", { key: state.ncmQrKey, qrimg: "true", timestamp: Date.now() });
    state.ncmQrImage = qrData.data?.qrimg || "";
    state.ncmLoginStatus = "waiting";
    state.ncmLoginMessage = "请用网易云音乐 App 扫码登录。";
    renderNcmPanel();
    state.ncmQrPollingId = window.setInterval(checkNcmQrLogin, 1800);
    checkNcmQrLogin();
  } catch (error) {
    state.ncmLoginStatus = "logged-out";
    state.ncmLoginMessage = `登录二维码生成失败：${error.message}`;
    renderNcmPanel();
  }
}

async function checkNcmQrLogin() {
  if (!state.ncmQrKey) return;
  try {
    const data = await fetchNcmJson(
      "/login/qr/check",
      { key: state.ncmQrKey, timestamp: Date.now() },
      { allowCodes: [800, 801, 802, 803] },
    );
    if (data.code === 801) {
      state.ncmLoginStatus = "waiting";
      state.ncmLoginMessage = "等待扫码确认。";
    } else if (data.code === 802) {
      state.ncmLoginStatus = "scanned";
      state.ncmLoginMessage = "已扫码，请在手机上确认登录。";
    } else if (data.code === 803) {
      stopNcmQrPolling();
      state.ncmQrImage = "";
      state.ncmLoginStatus = "logged-in";
      state.ncmLoginMessage = "登录成功，后续播放请求会使用当前账号。";
      await checkNcmLoginStatus();
      return;
    } else if (data.code === 800) {
      stopNcmQrPolling();
      state.ncmQrImage = "";
      state.ncmLoginStatus = "logged-out";
      state.ncmLoginMessage = "二维码已过期，请重新扫码。";
    } else {
      state.ncmLoginMessage = data.message || "等待扫码确认。";
    }
  } catch (error) {
    stopNcmQrPolling();
    state.ncmLoginStatus = "logged-out";
    state.ncmLoginMessage = `登录检查失败：${error.message}`;
  } finally {
    renderNcmPanel();
  }
}

function stopNcmQrPolling() {
  window.clearInterval(state.ncmQrPollingId);
  state.ncmQrPollingId = null;
}

function getNcmLoginTitle() {
  if (state.ncmLoginStatus === "checking") return "正在检查登录";
  if (state.ncmLoginStatus === "logged-in") return "网易云已登录";
  if (state.ncmLoginStatus === "waiting") return "等待扫码";
  if (state.ncmLoginStatus === "scanned") return "等待手机确认";
  return "网易云未登录";
}

function getNcmQrText() {
  if (state.ncmLoginStatus === "scanned") return "已扫码，请在手机上确认";
  if (state.ncmLoginStatus === "waiting") return "请用网易云音乐 App 扫码";
  return state.ncmLoginMessage;
}

function renderActiveLyricLine() {
  if (!state.ncmLyrics.length) return;
  const nextIndex = getCurrentLyricIndex();
  if (nextIndex === -1 || nextIndex === state.ncmActiveLyricIndex) return;
  state.ncmActiveLyricIndex = nextIndex;
  $$(".ncm-lyrics p").forEach((line, index) => {
    line.className = getLyricLineClass(index);
    if (index === nextIndex) {
      line.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  });
}

function getLyricLineClass(index) {
  if (index === state.ncmActiveLyricIndex) return "active";
  if (index === state.ncmActiveLyricIndex - 1) return "previous";
  if (index === state.ncmActiveLyricIndex + 1) return "next";
  return "";
}

function getCurrentLyricIndex() {
  if (!state.ncmLyrics.length) return -1;
  const currentTime = audioPlayer.currentTime * 1000;
  return state.ncmLyrics.findIndex((line, index) => {
    const nextLine = state.ncmLyrics[index + 1];
    return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
  });
}

function isCardInClaimLyricWindow(card) {
  if (state.claimLyricIndex < 0) return false;
  const lines = [state.ncmLyrics[state.claimLyricIndex], state.ncmLyrics[state.claimLyricIndex - 1]].filter(Boolean);
  return lines.some((line) => line.text.includes(card.word));
}

function resetNcmPlaybackState(message) {
  state.ncmCurrentSong = null;
  state.ncmLyrics = [];
  state.ncmActiveLyricIndex = -1;
  state.songWordBank = [];
  setNcmStatus(message, "ok");
  renderNcmPanel();
}

async function fetchNcmJson(path, params, options = {}) {
  const response = await fetch(`${getNcmApiBase()}${path}?${new URLSearchParams(params)}`, {
    credentials: "same-origin",
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
  if (data.code && Number(data.code) >= 400 && !options.allowCodes?.includes(Number(data.code))) {
    throw new Error(data.message || `API ${data.code}`);
  }
  return data;
}

function getNcmApiBase() {
  const stored = localStorage.getItem(NCM_API_BASE_STORAGE_KEY);
  if (stored) return stored.replace(/\/$/, "");
  if (window.CARU_NCM_API_BASE) return String(window.CARU_NCM_API_BASE).replace(/\/$/, "");
  if (location.protocol === "http:" || location.protocol === "https:") {
    return `${location.origin}/ncm`;
  }
  return `http://127.0.0.1:${DEFAULT_NCM_API_PORT}`;
}

function normalizeNcmSong(song) {
  return {
    id: song.id,
    name: song.name || "未命名歌曲",
    artists: (song.artists || song.ar || []).map((artist) => artist.name).filter(Boolean).join(" / ") || "未知歌手",
    album: song.album?.name || song.al?.name || "未知专辑",
    duration: song.duration || song.dt || 0,
  };
}

function mergeNcmLyrics(data) {
  const original = parseLrc(data.lrc?.lyric || "");
  const translated = new Map(parseLrc(data.tlyric?.lyric || "").map((line) => [Math.round(line.time), line.text]));
  const romanized = new Map(parseLrc(data.romalrc?.lyric || "").map((line) => [Math.round(line.time), line.text]));
  return original
    .filter((line) => line.text)
    .map((line) => ({
      ...line,
      translation: translated.get(Math.round(line.time)) || romanized.get(Math.round(line.time)) || "",
    }));
}

async function buildSongWordBank(lyrics) {
  if (!lyrics.length) return { source: "none", words: [], message: "没有歌词，使用原本词库" };
  const cacheKey = getAiWordCacheKey(lyrics);
  const cachedWords = getCachedAiWords(cacheKey);
  if (hasAiGeneratedWords(cachedWords)) {
    return { source: "AI", words: normalizeDynamicWordBank(cachedWords), cached: true };
  }
  try {
    const response = await fetch("/api/extract-words", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ lyrics }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.enabled && Array.isArray(data.words) && data.words.length) {
        if (data.source !== "fallback" && hasAiGeneratedWords(data.words)) {
          setCachedAiWords(cacheKey, data.words);
          return { source: "AI", words: normalizeDynamicWordBank(data.words) };
        }
        return {
          source: "fallback",
          words: normalizeDynamicWordBank(data.words),
          message: data.error ? `AI 分词失败，临时使用本地分词：${data.error}` : "AI 未生成词卡，临时使用本地分词",
        };
      }
      if (!data.enabled) {
        return { source: "none", words: [], message: "AI 未启用，使用原本词库" };
      }
      return { source: "none", words: [], message: data.error ? `AI 分词失败，使用原本词库：${data.error}` : "AI 未生成词卡，使用原本词库" };
    }
    return { source: "none", words: [], message: `AI 分词接口 HTTP ${response.status}，使用原本词库` };
  } catch {
    return { source: "none", words: [], message: "AI 分词请求失败，使用原本词库" };
  }
}

async function updateSongWordBankInBackground(songId, lyrics) {
  const result = await buildSongWordBank(lyrics);
  if (state.ncmCurrentSong?.id !== songId) return;
  state.songWordBank = result.words;
  setNcmStatus(getSongWordStatus(result), result.words.length ? "ok" : "");
  if (!gamePanel.classList.contains("hidden") && state.songWordBank.length) {
    const message = result.cached ? `已从缓存加入 ${result.words.length} 个歌词词` : `AI 分词完成，已加入 ${result.words.length} 个歌词词`;
    shuffleBoard(message);
    showTemporaryClaimNotice(message);
  }
  renderNcmPanel();
}

function getAiWordCacheKey(lyrics) {
  const text = lyrics
    .map((line) => String(line.text || "").replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n");
  return `v1:${simpleHash(text)}`;
}

function simpleHash(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
}

function getCachedAiWords(cacheKey) {
  try {
    const cache = JSON.parse(localStorage.getItem(AI_WORD_CACHE_STORAGE_KEY) || "{}");
    const words = Array.isArray(cache[cacheKey]) ? cache[cacheKey] : null;
    if (!words || hasAiGeneratedWords(words)) return words;
    delete cache[cacheKey];
    localStorage.setItem(AI_WORD_CACHE_STORAGE_KEY, JSON.stringify(cache));
    return null;
  } catch {
    return null;
  }
}

function setCachedAiWords(cacheKey, words) {
  if (!hasAiGeneratedWords(words)) return;
  try {
    const cache = JSON.parse(localStorage.getItem(AI_WORD_CACHE_STORAGE_KEY) || "{}");
    delete cache[cacheKey];
    cache[cacheKey] = words;
    const keys = Object.keys(cache);
    keys.slice(0, Math.max(0, keys.length - AI_WORD_CACHE_LIMIT)).forEach((key) => delete cache[key]);
    localStorage.setItem(AI_WORD_CACHE_STORAGE_KEY, JSON.stringify(cache));
  } catch {
    localStorage.removeItem(AI_WORD_CACHE_STORAGE_KEY);
  }
}

function hasAiGeneratedWords(words) {
  return Array.isArray(words) && words.some((word) => word?.ai === true);
}

function normalizeDynamicWordBank(cards) {
  const builtInWords = new Set(wordBank.map((card) => card.word));
  const seen = new Set();
  return cards
    .map((card) => ({
      word: String(card.word || "").trim(),
      kana: String(card.kana || "歌词").trim() || "歌词",
      value: Math.min(3, Math.max(1, Number(card.value) || 1)),
      dynamic: true,
      ai: Boolean(card.ai),
    }))
    .filter((card) => card.word && !builtInWords.has(card.word))
    .filter((card) => {
      if (seen.has(card.word)) return false;
      seen.add(card.word);
      return true;
    })
    .slice(0, MAX_DYNAMIC_WORDS);
}

function getSongWordStatus(result) {
  if (result.words.length) {
    if (result.source === "fallback") {
      return `歌曲和歌词已加载，${result.message || `临时使用本地分词加入 ${result.words.length} 个歌词词`}`;
    }
    const source = result.cached ? "缓存" : "AI";
    return `歌曲和歌词已加载，已用${source}加入 ${result.words.length} 个歌词词`;
  }
  return `歌曲和歌词已加载，${result.message || "使用原本词库"}`;
}

function parseLrc(source) {
  return source
    .split(/\r?\n/)
    .map((line) => {
      const match = line.match(/^\[(\d{2}):(\d{2})(?:\.(\d{1,3}))?\](.*)$/);
      if (!match) return null;
      const [, minutes, seconds, fraction = "0", text = ""] = match;
      const milliseconds = Number(fraction.padEnd(3, "0").slice(0, 3));
      return {
        time: (Number(minutes) * 60 + Number(seconds)) * 1000 + milliseconds,
        text: text.trim(),
      };
    })
    .filter(Boolean);
}

function setNcmStatus(message, type = "") {
  state.ncmStatus = message;
  state.ncmStatusType = type;
}

function startAnswerTimer() {
  state.answerStartedAt = performance.now();
  answerTimer.classList.remove("hidden");
  updateAnswerTimer();
  window.clearInterval(state.answerTimerId);
  state.answerTimerId = window.setInterval(updateAnswerTimer, 40);
}

function updateAnswerTimer() {
  const elapsed = performance.now() - state.answerStartedAt;
  const ratio = Math.max(0, 1 - elapsed / state.answerDuration);
  answerTimerBar.style.transform = `scaleX(${ratio})`;
  answerTimer.classList.toggle("danger", ratio < 0.35);
}

function stopAnswerTimer() {
  window.clearInterval(state.answerTimerId);
  state.answerTimerId = null;
  answerTimer.classList.add("hidden");
  answerTimer.classList.remove("danger");
  answerTimerBar.style.transform = "scaleX(1)";
}

function requestConfirm({ title, text, onConfirm }) {
  confirmTitle.textContent = title;
  confirmText.textContent = text;
  state.pendingConfirm = onConfirm;
  confirmModal.classList.remove("hidden");
}

function closeConfirm() {
  confirmModal.classList.add("hidden");
  state.pendingConfirm = null;
}

function runConfirm() {
  const action = state.pendingConfirm;
  closeConfirm();
  action?.();
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function shuffleBoard(message = "正在洗牌") {
  resetBoardRefreshDeadline();
  playSound("shuffle");
  state.boardAnimation = "shuffle";
  state.boardAnimationClearFor = null;
  state.drawnCardId = null;
  clearClaim(message);
  render();
  window.clearTimeout(state.boardAnimationTimer);
  state.boardAnimationTimer = window.setTimeout(() => {
    state.boardAnimation = "deal";
    state.boardAnimationClearFor = null;
    buildBoard();
    render();
  }, 420);
}

function scheduleBoardAnimationClear(animationName) {
  if (state.boardAnimationClearFor === animationName) return;
  window.clearTimeout(state.boardAnimationTimer);
  state.boardAnimationClearFor = animationName;
  state.boardAnimationTimer = window.setTimeout(() => {
    if (state.boardAnimation !== animationName) return;
    state.boardAnimation = null;
    state.boardAnimationClearFor = null;
    state.drawnCardId = null;
    $$(".word-card").forEach((card) => card.classList.remove("deal-in", "draw-in"));
  }, animationName === "deal" ? 900 : 520);
}

function getCardAnimationClass(card) {
  if (state.boardAnimation === "deal") return "deal-in";
  if (state.boardAnimation === "draw" && card.id === state.drawnCardId) return "draw-in";
  return "";
}

function rememberState() {
  state.history.push({
    players: cloneData(state.players),
    cards: cloneData(state.cards),
  });
  if (state.history.length > 12) {
    state.history.shift();
  }
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function undoLastAction() {
  const snapshot = state.history.pop();
  if (!snapshot) return;
  state.players = snapshot.players;
  state.cards = snapshot.cards;
  clearClaim("已撤销上一次判定");
  render();
}

function showResults() {
  stopTimer();
  audioPlayer.pause();
  const ranking = state.players
    .filter((player) => player.active)
    .map((player) => ({ ...player }))
    .sort((a, b) => b.score - a.score);
  const [winner] = ranking;
  winnerTitle.textContent = winner ? `${winner.name}队获胜` : "本局结束";
  resultList.innerHTML = ranking
    .map(
      (player, index) => `
        <div class="result-row" style="--player-color:${player.color}">
          <span class="result-rank">${index + 1}</span>
          <span>${player.name}队</span>
          <strong class="result-score">${player.score}</strong>
        </div>
      `,
    )
    .join("");
  resultModal.classList.remove("hidden");
}

function showCaptureDetail(playerIndex) {
  const player = state.players[playerIndex];
  if (!player?.active) return;
  captureTitle.textContent = `${player.name}队已拿词`;
  captureSummary.innerHTML = `
    <span style="--player-color:${player.color}"><span class="capture-dot"></span>${player.captures.length} 张</span>
    <strong>本首 ${formatSigned(player.roundScore)}</strong>
  `;
  captureDetailList.innerHTML = player.captures.length
    ? player.captures
        .map(
          (capture, index) => `
            <div class="capture-detail-row">
              <span>${index + 1}</span>
              <strong>${capture.word}</strong>
              <small>${capture.kana || " "}</small>
              <b>+${capture.gained}</b>
            </div>
          `,
        )
        .join("")
    : `<div class="empty-detail">还没有拿到词</div>`;
  captureModal.classList.remove("hidden");
}

function closeCaptureModal() {
  captureModal.classList.add("hidden");
}

function resetGame() {
  stopTimer();
  audioPlayer.pause();
  resultModal.classList.add("hidden");
  closeCaptureModal();
  gamePanel.classList.add("hidden");
  setupPanel.classList.remove("hidden");
  delete gamePanel.dataset.playerCount;
  cleanupCardDrag();
  clearClaim();
  state.players = [];
  state.cards = [];
  state.round = 1;
  state.timeLeft = null;
  state.history = [];
}

function releaseCardTouchFreezes(touchingPlayerIndex) {
  state.players.forEach((player, index) => {
    if (index !== touchingPlayerIndex && player.frozenUntilCardTouch) {
      player.frozenUntilCardTouch = false;
      showUnfreezeEffect(index);
    }
  });
}

function showGrabWave(playerIndex) {
  const corner = $(`.corner-player[data-player="${playerIndex}"]`);
  const player = state.players[playerIndex];
  if (!corner || !player) return;
  const rect = corner.getBoundingClientRect();
  const wave = document.createElement("span");
  wave.className = "grab-wave";
  wave.style.setProperty("--player-color", player.color);
  wave.style.left = `${rect.left + rect.width / 2}px`;
  wave.style.top = `${rect.top + rect.height / 2}px`;
  effectLayer.append(wave);
  removeAfter(wave, 760);
}

function showScoreFloat(cardIndex, gained, comboBonus) {
  const cardButton = $$(".word-card")[cardIndex];
  const player = state.players[state.activePlayer];
  if (!cardButton || !player) return;
  const rect = cardButton.getBoundingClientRect();
  const score = document.createElement("span");
  score.className = `score-float ${comboBonus ? "combo" : ""}`;
  score.style.setProperty("--player-color", player.color);
  score.style.left = `${rect.left + rect.width / 2}px`;
  score.style.top = `${rect.top + rect.height / 2}px`;
  score.textContent = comboBonus ? `+${gained} 连击!` : `+${gained}`;
  effectLayer.append(score);
  removeAfter(score, 900);
}

function triggerComboBurst(playerIndex) {
  const player = state.players[playerIndex];
  if (!player) return;
  player.comboBurst = true;
  window.setTimeout(() => {
    const currentPlayer = state.players[playerIndex];
    if (!currentPlayer) return;
    currentPlayer.comboBurst = false;
    renderScorebar();
  }, 820);
}

function showUnfreezeEffect(playerIndex) {
  const corner = $(`.corner-player[data-player="${playerIndex}"]`);
  const player = state.players[playerIndex];
  if (!corner || !player) return;
  const rect = corner.getBoundingClientRect();
  const toast = document.createElement("span");
  toast.className = "unfreeze-toast";
  toast.style.setProperty("--player-color", player.color);
  toast.style.left = `${rect.left + rect.width / 2}px`;
  toast.style.top = `${rect.top + rect.height / 2}px`;
  toast.textContent = "解冻";
  effectLayer.append(toast);
  removeAfter(toast, 880);
}

function removeAfter(element, delay) {
  window.setTimeout(() => element.remove(), delay);
}

function unlockSound() {
  if (!SOUND_ENABLED || state.audioContext) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  try {
    state.audioContext = new AudioContextClass();
    state.audioContext.resume?.();
  } catch {
    state.audioContext = null;
  }
}

function playSound(type) {
  if (!SOUND_ENABLED) return;
  unlockSound();
  const context = state.audioContext;
  if (!context) return;
  if (context.state === "suspended") context.resume?.();
  const now = context.currentTime;
  if (type === "correct") {
    playTone(context, 659, now, 0.08, 0.12, "sine");
    playTone(context, 988, now + 0.07, 0.11, 0.1, "triangle");
  } else if (type === "combo") {
    [523, 659, 784, 1046].forEach((frequency, index) => {
      playTone(context, frequency, now + index * 0.045, 0.1, 0.09, "triangle");
    });
  } else if (type === "wrong") {
    playTone(context, 196, now, 0.12, 0.16, "sawtooth");
    playTone(context, 147, now + 0.08, 0.1, 0.14, "sawtooth");
  } else if (type === "shuffle") {
    [330, 392, 494].forEach((frequency, index) => {
      playTone(context, frequency, now + index * 0.035, 0.045, 0.045, "square");
    });
  }
}

function playTone(context, frequency, startTime, duration, volume, type = "sine") {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.02);
}

function makeCard(card, index) {
  return {
    ...card,
    id: `${card.word}-${index}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    claimed: false,
  };
}

function drawReplacementCard(index, removedWord) {
  const currentWords = new Set(state.cards.map((card) => card.word));
  currentWords.delete(removedWord);
  const playableBank = getPlayableWordBank();
  const pool = playableBank.filter((card) => !currentWords.has(card.word));
  return makeCard(shuffle(pool.length ? pool : playableBank)[0], index);
}

function getBoardColumns() {
  if (state.cardCount >= 32) return 8;
  if (state.cardCount >= 24) return 6;
  return 4;
}

function getBoardRows() {
  return Math.ceil(state.cardCount / getBoardColumns());
}

function getCardFontSize() {
  if (state.cardCount >= 32) return "clamp(13px, 1.55vw, 22px)";
  if (state.cardCount >= 24) return "clamp(16px, 2.1vw, 28px)";
  return "clamp(24px, 3.2vw, 44px)";
}

function getKanaFontSize() {
  if (state.cardCount >= 32) return "8px";
  if (state.cardCount >= 24) return "11px";
  return "13px";
}

function getCardPadding() {
  if (state.cardCount >= 32) return "4px";
  if (state.cardCount >= 24) return "8px";
  return "10px";
}

function getCardBadgeSize() {
  if (state.cardCount >= 32) return "18px";
  if (state.cardCount >= 24) return "26px";
  return "30px";
}

function getCardBadgeOffset() {
  if (state.cardCount >= 32) return "3px";
  if (state.cardCount >= 24) return "6px";
  return "8px";
}

function getBoardGap() {
  if (state.cardCount >= 32) return "6px";
  if (state.cardCount >= 24) return "8px";
  return "10px";
}

function loadStoredWordBank() {
  try {
    const raw = localStorage.getItem(WORD_BANK_STORAGE_KEY);
    return raw ? normalizeWordBank(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

function importWordBank() {
  try {
    const parsed = parseWordBankText(wordBankInput.value);
    wordBank = parsed;
    localStorage.setItem(WORD_BANK_STORAGE_KEY, JSON.stringify(wordBank));
    renderWordThemeOptions();
    renderWordBankStatus(`已保存 ${wordBank.length} 张词卡`, "ok");
  } catch (error) {
    renderWordBankStatus(error.message, "error");
  }
}

function fillWordBankEditor() {
  wordBankInput.value = wordBank.map((card) => `${card.word},${card.kana},${card.value}`).join("\n");
  renderWordBankStatus("已填入当前词库，可编辑后导入保存", "ok");
}

function resetWordBank() {
  wordBank = cloneData(DEFAULT_WORD_BANK);
  localStorage.removeItem(WORD_BANK_STORAGE_KEY);
  fillWordBankEditor();
  renderWordThemeOptions();
  renderWordBankStatus(`已恢复内置 ${wordBank.length} 张词卡`, "ok");
}

function renderWordBankStatus(message, type = "") {
  wordBankCount.textContent = `${wordBank.length} 张`;
  wordBankMessage.textContent = message ?? "支持 CSV/TSV 或 JSON，分值会限制在 1-3。";
  wordBankMessage.className = `word-bank-message ${type}`.trim();
}

function renderWordThemeOptions() {
  const currentValue = wordThemeSelect.value || "all";
  wordThemeSelect.innerHTML = WORD_THEMES.map((theme) => {
    const count = getThemeWordBank(theme.id, wordBank).length;
    const suffix = theme.id === "all" ? `${wordBank.length}张` : `${count}张`;
    const disabled = theme.id !== "all" && count < 12 ? "disabled" : "";
    return `<option value="${theme.id}" ${disabled}>${theme.name}（${suffix}）</option>`;
  }).join("");
  wordThemeSelect.value = wordThemeSelect.querySelector(`option[value="${currentValue}"]:not(:disabled)`) ? currentValue : "all";
}

function getPlayableWordBank() {
  const themedBank = getThemeWordBank(state.wordTheme, wordBank);
  const baseBank = themedBank.length >= Math.min(12, state.cardCount) ? themedBank : wordBank;
  return mergeWordBanks(baseBank, state.songWordBank);
}

function getThemeWordBank(themeId, sourceBank) {
  const theme = WORD_THEMES.find((item) => item.id === themeId);
  if (!theme || theme.id === "all") return sourceBank;
  const themeWords = new Set(theme.words);
  return sourceBank.filter((card) => themeWords.has(card.word));
}

function mergeWordBanks(baseBank, extraBank) {
  if (!extraBank.length) return baseBank;
  const seen = new Set();
  return [...extraBank, ...baseBank].filter((card) => {
    if (seen.has(card.word)) return false;
    seen.add(card.word);
    return true;
  });
}

function parseWordBankText(text) {
  const source = text.trim();
  if (!source) {
    throw new Error("词库不能为空");
  }
  if (source.startsWith("[")) {
    return normalizeWordBank(JSON.parse(source));
  }
  const rows = source
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split(/\t|,/).map((cell) => cell.trim()));
  return normalizeWordBank(
    rows.map(([word, kana = "", value = "1"]) => ({
      word,
      kana,
      value: Number(value),
    })),
  );
}

function normalizeWordBank(cards) {
  if (!Array.isArray(cards)) {
    throw new Error("JSON 必须是数组");
  }
  const normalized = cards
    .map((card) => ({
      word: String(card.word ?? "").trim(),
      kana: String(card.kana ?? "").trim(),
      value: Math.min(3, Math.max(1, Number(card.value) || 1)),
    }))
    .filter((card) => card.word);
  const unique = [];
  const seen = new Set();
  normalized.forEach((card) => {
    if (seen.has(card.word)) return;
    seen.add(card.word);
    unique.push(card);
  });
  if (unique.length < 12) {
    throw new Error("至少需要 12 张有效词卡");
  }
  return unique;
}

function cardColor(value) {
  if (value === 1) return "#f8dd74";
  if (value === 2) return "#9ed5df";
  return "#f3a4a1";
}

function activeColor() {
  if (state.activePlayer === null) return "#252a33";
  return state.players[state.activePlayer].color;
}

function formatSigned(value) {
  return value > 0 ? `+${value}` : String(value);
}

function formatDuration(milliseconds) {
  if (!milliseconds) return "--:--";
  const totalSeconds = Math.round(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol === "file:") return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
