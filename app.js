const WORD_BANK_STORAGE_KEY = "caru-uta-pad-word-bank";

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
  roundLength: 60,
  timeLeft: 60,
  timerId: null,
  playerCount: 4,
  cardCount: 16,
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
const audioBox = $("#audioBox");
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
const wordBankInput = $("#wordBankInput");
const wordBankCount = $("#wordBankCount");
const wordBankMessage = $("#wordBankMessage");
const effectLayer = $("#effectLayer");

renderWordBankStatus();

gamePanel.addEventListener(
  "touchmove",
  (event) => {
    event.preventDefault();
  },
  { passive: false },
);

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
    frozenUntilCardTouch: false,
    comboBurst: false,
    captures: [],
  }));
  state.round = 1;
  state.timeLeft = state.roundLength;
  state.history = [];
  state.boardAnimation = "deal";
  state.drawnCardId = null;
  setupPanel.classList.add("hidden");
  gamePanel.classList.remove("hidden");
  buildBoard();
  render();
});

audioInput.addEventListener("change", () => {
  const [file] = audioInput.files;
  if (!file) return;
  audioPlayer.src = URL.createObjectURL(file);
  audioBox.open = false;
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
$("#loadWordBank").addEventListener("click", importWordBank);
$("#exportWordBank").addEventListener("click", fillWordBankEditor);
$("#resetWordBank").addEventListener("click", resetWordBank);
$("#markCorrect").addEventListener("click", markCorrect);
$("#markWrong").addEventListener("click", markWrong);
$("#cancelClaim").addEventListener("click", () => clearClaim());

$$(".corner-player").forEach((button) => {
  button.addEventListener("pointerdown", () => grabPlayer(Number(button.dataset.player)));
});

function buildBoard() {
  const targetCounts = {
    1: Math.ceil(state.cardCount * 0.45),
    2: Math.ceil(state.cardCount * 0.35),
    3: state.cardCount,
  };
  targetCounts[3] = state.cardCount - targetCounts[1] - targetCounts[2];

  const selected = [1, 2, 3].flatMap((value) =>
    shuffle(wordBank.filter((card) => card.value === value)).slice(0, targetCounts[value]),
  );
  const selectedWords = new Set(selected.map((card) => card.word));
  const fillers = shuffle(wordBank.filter((card) => !selectedWords.has(card.word))).slice(0, state.cardCount - selected.length);
  const boardCards = [...selected, ...fillers];

  while (boardCards.length < state.cardCount) {
    boardCards.push(shuffle(wordBank)[0]);
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
  showGrabWave(index);
  startAnswerTimer();
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
  releaseCardTouchFreezes(state.activePlayer);
  window.clearTimeout(state.answerDeadlineId);
  stopAnswerTimer();
  state.selectedCardId = cardId;
  render();
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
  if (state.penaltyMode === "standard") {
    player.frozenUntilCardTouch = true;
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
  rememberState();
  capture.repeated = true;
  player.score += 1;
  player.roundScore += 1;
  render();
}

function clearClaim(message = "听到词后，先按自己的颜色角") {
  window.clearTimeout(state.answerDeadlineId);
  stopAnswerTimer();
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
  state.history = [];
  state.round += 1;
  state.timeLeft = state.roundLength;
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
  undoAction.disabled = state.history.length === 0;
  board.style.setProperty("--board-columns", getBoardColumns());
  board.style.setProperty("--board-rows", getBoardRows());
  board.style.setProperty("--card-font-size", getCardFontSize());
  board.style.setProperty("--kana-font-size", getKanaFontSize());
  board.style.setProperty("--card-padding", getCardPadding());
  board.style.setProperty("--card-badge-size", getCardBadgeSize());
  board.style.setProperty("--card-badge-offset", getCardBadgeOffset());
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
    button.classList.toggle("hidden", !player?.active);
    button.classList.toggle("frozen", Boolean(frozen));
    button.classList.toggle("active", state.activePlayer === index);
    button.textContent = frozen ? `${player.name} 冻结` : `${player.name} 抢`;
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
    button.addEventListener("pointerdown", () => selectCard(button.dataset.card));
  });
  if (state.boardAnimation === "deal" || state.boardAnimation === "draw") {
    scheduleBoardAnimationClear(state.boardAnimation);
  }
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
    button.addEventListener("pointerdown", () => repeatCapture(Number(button.dataset.player), Number(button.dataset.capture)));
  });
}

function renderClaim() {
  if (state.activePlayer === null) {
    claimActions.classList.add("hidden");
    answerTimer.classList.add("hidden");
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
  answerTimer.classList.toggle("hidden", Boolean(card));
}

function renderTimer() {
  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft % 60;
  timer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
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

function resetGame() {
  stopTimer();
  audioPlayer.pause();
  resultModal.classList.add("hidden");
  gamePanel.classList.add("hidden");
  setupPanel.classList.remove("hidden");
  clearClaim();
  state.players = [];
  state.cards = [];
  state.round = 1;
  state.timeLeft = state.roundLength;
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
  const pool = wordBank.filter((card) => !currentWords.has(card.word));
  return makeCard(shuffle(pool.length ? pool : wordBank)[0], index);
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
  if (state.cardCount >= 32) return "clamp(18px, 2.45vw, 34px)";
  if (state.cardCount >= 24) return "clamp(20px, 2.8vw, 38px)";
  return "clamp(24px, 3.2vw, 44px)";
}

function getKanaFontSize() {
  if (state.cardCount >= 32) return "10px";
  if (state.cardCount >= 24) return "11px";
  return "13px";
}

function getCardPadding() {
  if (state.cardCount >= 32) return "6px";
  if (state.cardCount >= 24) return "8px";
  return "10px";
}

function getCardBadgeSize() {
  if (state.cardCount >= 32) return "24px";
  if (state.cardCount >= 24) return "26px";
  return "30px";
}

function getCardBadgeOffset() {
  if (state.cardCount >= 32) return "5px";
  if (state.cardCount >= 24) return "6px";
  return "8px";
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
  renderWordBankStatus(`已恢复内置 ${wordBank.length} 张词卡`, "ok");
}

function renderWordBankStatus(message, type = "") {
  wordBankCount.textContent = `${wordBank.length} 张`;
  wordBankMessage.textContent = message ?? "支持 CSV/TSV 或 JSON，分值会限制在 1-3。";
  wordBankMessage.className = `word-bank-message ${type}`.trim();
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
