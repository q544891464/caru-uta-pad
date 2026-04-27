const WORD_BANK = [
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
  { word: "約束", kana: "やくそく", value: 2 },
  { word: "涙", kana: "なみだ", value: 2 },
  { word: "未来", kana: "みらい", value: 2 },
  { word: "声", kana: "こえ", value: 2 },
  { word: "世界", kana: "せかい", value: 2 },
  { word: "光", kana: "ひかり", value: 2 },
  { word: "笑顔", kana: "えがお", value: 2 },
  { word: "季節", kana: "きせつ", value: 2 },
  { word: "時間", kana: "じかん", value: 2 },
  { word: "風", kana: "かぜ", value: 2 },
  { word: "花", kana: "はな", value: 2 },
  { word: "雨", kana: "あめ", value: 2 },
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
];

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
  roundLength: 60,
  timeLeft: 60,
  timerId: null,
  playerCount: 4,
  cardCount: 16,
  penaltyMode: "light",
  activePlayer: null,
  selectedCardId: null,
  answerDeadlineId: null,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const setupPanel = $("#setupPanel");
const gamePanel = $("#gamePanel");
const setupForm = $("#setupForm");
const board = $("#board");
const scorebar = $("#scorebar");
const captures = $("#captures");
const claimPanel = $("#claimPanel");
const claimText = $("#claimText");
const claimActions = $("#claimActions");
const timer = $("#timer");
const roundNumber = $("#roundNumber");
const audioInput = $("#audioInput");
const audioPlayer = $("#audioPlayer");

setupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.playerCount = Number($("#playerCount").value);
  state.cardCount = Number($("#cardCount").value);
  state.roundLength = Number($("#roundLength").value);
  state.penaltyMode = $("#penaltyMode").value;
  state.players = PLAYER_PRESETS.map((player, index) => ({
    ...player,
    active: index < state.playerCount,
    score: 0,
    roundScore: 0,
    combo: 0,
    frozenUntil: 0,
    frozenForRound: false,
    captures: [],
  }));
  state.round = 1;
  state.timeLeft = state.roundLength;
  setupPanel.classList.add("hidden");
  gamePanel.classList.remove("hidden");
  buildBoard();
  render();
});

audioInput.addEventListener("change", () => {
  const [file] = audioInput.files;
  if (!file) return;
  audioPlayer.src = URL.createObjectURL(file);
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
  buildBoard();
  render();
});

$("#finishRound").addEventListener("click", finishRound);
$("#markCorrect").addEventListener("click", markCorrect);
$("#markWrong").addEventListener("click", markWrong);
$("#cancelClaim").addEventListener("click", () => clearClaim());

$$(".corner-player").forEach((button) => {
  button.addEventListener("click", () => grabPlayer(Number(button.dataset.player)));
});

function buildBoard() {
  const ones = shuffle(WORD_BANK.filter((card) => card.value === 1)).slice(0, Math.ceil(state.cardCount * 0.45));
  const twos = shuffle(WORD_BANK.filter((card) => card.value === 2)).slice(0, Math.ceil(state.cardCount * 0.35));
  const threes = shuffle(WORD_BANK.filter((card) => card.value === 3)).slice(0, state.cardCount - ones.length - twos.length);
  state.cards = shuffle([...ones, ...twos, ...threes]).slice(0, state.cardCount).map((card, index) => ({
    ...makeCard(card, index),
  }));
}

function grabPlayer(index) {
  const player = state.players[index];
  if (!player?.active || state.activePlayer !== null) return;
  if (player.frozenForRound || Date.now() < player.frozenUntil) return;

  state.activePlayer = index;
  state.selectedCardId = null;
  window.clearTimeout(state.answerDeadlineId);
  state.answerDeadlineId = window.setTimeout(() => {
    applyWrong(index, "超时");
  }, 2000);
  render();
}

function selectCard(cardId) {
  if (state.activePlayer === null) return;
  const card = state.cards.find((item) => item.id === cardId);
  if (!card || card.claimed) return;
  window.clearTimeout(state.answerDeadlineId);
  state.selectedCardId = cardId;
  render();
}

function markCorrect() {
  if (state.activePlayer === null || !state.selectedCardId) return;
  const player = state.players[state.activePlayer];
  const cardIndex = state.cards.findIndex((item) => item.id === state.selectedCardId);
  const card = state.cards[cardIndex];
  if (!player || !card) return;

  const base = card.value;
  player.combo += 1;
  const comboBonus = player.combo > 0 && player.combo % 3 === 0 ? 2 : 0;
  player.score += base + comboBonus;
  player.roundScore += base + comboBonus;
  player.captures.unshift({
    ...card,
    repeated: false,
    gained: base + comboBonus,
    bonusText: comboBonus ? ` +${comboBonus}连击` : "",
  });
  state.cards[cardIndex] = drawReplacementCard(cardIndex, card.word);
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
  player.score -= 1;
  player.roundScore -= 1;
  player.combo = 0;
  if (state.penaltyMode === "standard") {
    player.frozenForRound = true;
  } else {
    player.frozenUntil = Date.now() + 2000;
    window.setTimeout(render, 2050);
  }
  clearClaim(`${player.name} ${reason}，-1`);
  render();
}

function repeatCapture(playerIndex, captureIndex) {
  const player = state.players[playerIndex];
  const capture = player?.captures[captureIndex];
  if (!capture || capture.repeated) return;
  capture.repeated = true;
  player.score += 1;
  player.roundScore += 1;
  render();
}

function clearClaim(message = "听到词后，先按自己的颜色角") {
  window.clearTimeout(state.answerDeadlineId);
  state.activePlayer = null;
  state.selectedCardId = null;
  claimText.textContent = message;
  claimPanel.className = "claim-panel idle";
  claimActions.classList.add("hidden");
  $$(".corner-player").forEach((button) => button.classList.remove("active"));
}

function finishRound() {
  stopTimer();
  audioPlayer.pause();
  state.round += 1;
  state.timeLeft = state.roundLength;
  state.players.forEach((player) => {
    player.roundScore = 0;
    player.combo = 0;
    player.frozenForRound = false;
    player.frozenUntil = 0;
    player.captures = [];
  });
  clearClaim("已进入下一首，换歌后开始");
  buildBoard();
  render();
}

function startTimer() {
  if (state.timerId) return;
  state.timerId = window.setInterval(() => {
    state.timeLeft = Math.max(0, state.timeLeft - 1);
    renderTimer();
    if (state.timeLeft === 0) {
      stopTimer();
      audioPlayer.pause();
      clearClaim("本首结束，点结算进入下一首");
    }
  }, 1000);
}

function stopTimer() {
  window.clearInterval(state.timerId);
  state.timerId = null;
}

function render() {
  renderScorebar();
  renderCorners();
  renderBoard();
  renderCaptures();
  renderClaim();
  renderTimer();
  roundNumber.textContent = state.round;
}

function renderScorebar() {
  scorebar.innerHTML = state.players
    .map(
      (player) => `
        <article class="score-card ${player.active ? "" : "inactive"}" style="--player-color:${player.color}">
          <span class="score-dot"></span>
          <div>
            <div class="score-name">${player.name}队</div>
            <div class="score-meta">本首 ${formatSigned(player.roundScore)} / 连击 ${player.combo}</div>
          </div>
          <strong class="score-value">${player.score}</strong>
        </article>
      `,
    )
    .join("");
}

function renderCorners() {
  $$(".corner-player").forEach((button) => {
    const index = Number(button.dataset.player);
    const player = state.players[index];
    const frozen = player?.frozenForRound || Date.now() < player?.frozenUntil;
    button.style.setProperty("--player-color", player?.color ?? "#999");
    button.classList.toggle("hidden", !player?.active);
    button.classList.toggle("frozen", Boolean(frozen));
    button.classList.toggle("active", state.activePlayer === index);
    button.textContent = frozen ? `${player.name} 冻结` : `${player.name} 抢`;
  });
}

function renderBoard() {
  board.innerHTML = state.cards
    .map((card) => {
      const selected = state.selectedCardId === card.id;
      return `
        <button
          class="word-card ${card.claimed ? "claimed" : ""} ${selected ? "selected" : ""}"
          style="--card-bg:${cardColor(card.value)}; --active-color:${activeColor()}"
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
    button.addEventListener("click", () => selectCard(button.dataset.card));
  });
}

function renderCaptures() {
  captures.innerHTML = state.players
    .map(
      (player, playerIndex) => `
        <article class="capture-row ${player.active ? "" : "inactive"}" style="--player-color:${player.color}">
          <div class="capture-title"><span class="capture-dot"></span>${player.name} 已拿词：点词可记同歌再现 +1</div>
          <div class="chips">
            ${player.captures
              .slice(0, 10)
              .map(
                (capture, captureIndex) => `
                  <button class="chip ${capture.repeated ? "flipped" : ""}" data-player="${playerIndex}" data-capture="${captureIndex}" type="button">
                    ${capture.word} +${capture.gained}${capture.repeated ? " 再+1" : ""}${capture.bonusText}
                  </button>
                `,
              )
              .join("")}
          </div>
        </article>
      `,
    )
    .join("");
  $$(".chip").forEach((button) => {
    button.addEventListener("click", () => repeatCapture(Number(button.dataset.player), Number(button.dataset.capture)));
  });
}

function renderClaim() {
  if (state.activePlayer === null) {
    claimActions.classList.add("hidden");
    claimPanel.classList.remove("active");
    claimPanel.classList.remove("judging");
    claimPanel.style.removeProperty("--active-color");
    return;
  }
  const player = state.players[state.activePlayer];
  const card = state.cards.find((item) => item.id === state.selectedCardId);
  claimPanel.classList.add("active");
  claimPanel.classList.toggle("judging", Boolean(card));
  claimPanel.style.setProperty("--active-color", player.color);
  claimText.textContent = card ? `${player.name}队选择了「${card.word}」，请判定` : `${player.name}队抢到，2 秒内点词卡`;
  claimActions.classList.toggle("hidden", !card);
}

function renderTimer() {
  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft % 60;
  timer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
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
  const pool = WORD_BANK.filter((card) => !currentWords.has(card.word));
  return makeCard(shuffle(pool.length ? pool : WORD_BANK)[0], index);
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
