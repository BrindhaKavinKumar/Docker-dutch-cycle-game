const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("startBtn");
const playerNameInput = document.getElementById("playerName");
const scoreValue = document.getElementById("scoreValue");
const timerValue = document.getElementById("timerValue");
const leaderboardList = document.getElementById("leaderboard");

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;
const GAME_DURATION = 30;
const ITEM_COUNT = 7;
const PLAYER_SPEED = 5;

let player = {
  x: 120,
  y: 392,
  width: 34,
  height: 34
};

let waffles = [];
let keys = {};
let score = 0;
let timeLeft = GAME_DURATION;
let running = false;
let animationFrameId = null;
let timerInterval = null;

function resetPlayer() {
  player.x = 120;
  player.y = 392;
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function spawnItems() {
  waffles = [];
  for (let i = 0; i < ITEM_COUNT; i++) {
    waffles.push({
      x: randomBetween(160, GAME_WIDTH - 80),
      y: randomBetween(180, 360),
      collected: false
    });
  }
}

function updateHUD() {
  scoreValue.textContent = score;
  timerValue.textContent = timeLeft;
}

function drawSky() {
  const skyGradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
  skyGradient.addColorStop(0, "#8ed6ff");
  skyGradient.addColorStop(1, "#c8eeff");
  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}

function drawSun() {
  ctx.beginPath();
  ctx.fillStyle = "#ffd166";
  ctx.arc(780, 80, 38, 0, Math.PI * 2);
  ctx.fill();
}

function drawCloud(x, y) {
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.beginPath();
  ctx.arc(x, y, 18, 0, Math.PI * 2);
  ctx.arc(x + 20, y - 8, 22, 0, Math.PI * 2);
  ctx.arc(x + 42, y, 18, 0, Math.PI * 2);
  ctx.fill();
}

function drawGround() {
  const groundGradient = ctx.createLinearGradient(0, 330, 0, GAME_HEIGHT);
  groundGradient.addColorStop(0, "#84d17f");
  groundGradient.addColorStop(1, "#5ca85a");
  ctx.fillStyle = groundGradient;
  ctx.fillRect(0, 330, GAME_WIDTH, 170);

  ctx.fillStyle = "#de5d83";
  for (let i = 0; i < 26; i++) {
    ctx.beginPath();
    ctx.arc(20 + i * 36, 355 + (i % 2) * 10, 7, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawCanal() {
  ctx.fillStyle = "#57c7ff";
  ctx.fillRect(0, 300, GAME_WIDTH, 25);

  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 312);
  ctx.lineTo(GAME_WIDTH, 312);
  ctx.stroke();
}

function drawFence() {
  ctx.strokeStyle = "#8d6e63";
  ctx.lineWidth = 3;

  for (let i = 0; i < GAME_WIDTH; i += 40) {
    ctx.beginPath();
    ctx.moveTo(i, 330);
    ctx.lineTo(i, 355);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.moveTo(0, 338);
  ctx.lineTo(GAME_WIDTH, 338);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 349);
  ctx.lineTo(GAME_WIDTH, 349);
  ctx.stroke();
}

function drawPath() {
  ctx.fillStyle = "#d9c2a3";
  ctx.fillRect(0, 390, GAME_WIDTH, 70);

  ctx.strokeStyle = "#fff3bf";
  ctx.lineWidth = 4;
  for (let i = 0; i < GAME_WIDTH; i += 45) {
    ctx.beginPath();
    ctx.moveTo(i, 425);
    ctx.lineTo(i + 22, 425);
    ctx.stroke();
  }
}

function drawWindmill(x, y, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  ctx.fillStyle = "#8d6e63";
  ctx.beginPath();
  ctx.moveTo(-18, 0);
  ctx.lineTo(18, 0);
  ctx.lineTo(12, -90);
  ctx.lineTo(-12, -90);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#5d4037";
  ctx.fillRect(-14, -95, 28, 10);

  ctx.fillStyle = "#3e2723";
  ctx.beginPath();
  ctx.arc(0, -65, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#f5f5f5";
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.moveTo(0, -65);
  ctx.lineTo(42, -95);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, -65);
  ctx.lineTo(-42, -95);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, -65);
  ctx.lineTo(42, -35);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, -65);
  ctx.lineTo(-42, -35);
  ctx.stroke();

  ctx.restore();
}

function drawBackground() {
  drawSky();
  drawSun();
  drawCloud(120, 90);
  drawCloud(250, 70);
  drawCloud(540, 85);
  drawCloud(660, 60);
  drawCanal();
  drawGround();
  drawFence();
  drawPath();
  drawWindmill(180, 325, 1.1);
  drawWindmill(720, 325, 0.95);
}

function drawPlayer() {
  const x = player.x;
  const y = player.y;

  ctx.save();
  ctx.translate(x, y);

  // wheels
  ctx.beginPath();
  ctx.strokeStyle = "#2d3748";
  ctx.lineWidth = 3;
  ctx.arc(-12, 10, 8, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(12, 10, 8, 0, Math.PI * 2);
  ctx.stroke();

  // frame
  ctx.beginPath();
  ctx.strokeStyle = "#e63946";
  ctx.lineWidth = 3;
  ctx.moveTo(-12, 10);
  ctx.lineTo(-2, -2);
  ctx.lineTo(8, 10);
  ctx.lineTo(-12, 10);
  ctx.moveTo(-2, -2);
  ctx.lineTo(12, 10);
  ctx.moveTo(-2, -2);
  ctx.lineTo(2, -12);
  ctx.moveTo(2, -12);
  ctx.lineTo(10, -12);
  ctx.moveTo(12, 10);
  ctx.lineTo(16, -4);
  ctx.stroke();

  // rider head
  ctx.beginPath();
  ctx.fillStyle = "#f4c095";
  ctx.arc(2, -20, 5, 0, Math.PI * 2);
  ctx.fill();

  // helmet
  ctx.beginPath();
  ctx.fillStyle = "#1d4ed8";
  ctx.arc(2, -22, 5, Math.PI, 0);
  ctx.fill();

  // body and arms
  ctx.beginPath();
  ctx.strokeStyle = "#1d4ed8";
  ctx.lineWidth = 3;
  ctx.moveTo(2, -15);
  ctx.lineTo(0, -6);
  ctx.lineTo(-4, 2);
  ctx.moveTo(0, -6);
  ctx.lineTo(8, -2);
  ctx.moveTo(0, -6);
  ctx.lineTo(-8, -2);
  ctx.stroke();

  ctx.restore();
}

function drawStroopwafel(x, y) {
  ctx.save();
  ctx.translate(x, y);

  ctx.fillStyle = "#c97b36";
  ctx.beginPath();
  ctx.arc(0, 0, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#9a5a21";
  ctx.lineWidth = 1.5;

  for (let i = -8; i <= 8; i += 4) {
    ctx.beginPath();
    ctx.moveTo(i, -10);
    ctx.lineTo(i, 10);
    ctx.stroke();
  }

  for (let i = -8; i <= 8; i += 4) {
    ctx.beginPath();
    ctx.moveTo(-10, i);
    ctx.lineTo(10, i);
    ctx.stroke();
  }

  ctx.restore();
}

function drawItems() {
  waffles.forEach(item => {
    if (!item.collected) {
      drawStroopwafel(item.x, item.y);
    }
  });
}

function keepPlayerInBounds() {
  if (player.x < 25) player.x = 25;
  if (player.x > GAME_WIDTH - 25) player.x = GAME_WIDTH - 25;
  if (player.y < 155) player.y = 155;
  if (player.y > 410) player.y = 410;
}

function updateMovement() {
  if (keys["ArrowRight"]) player.x += PLAYER_SPEED;
  if (keys["ArrowLeft"]) player.x -= PLAYER_SPEED;
  if (keys["ArrowUp"]) player.y -= PLAYER_SPEED;
  if (keys["ArrowDown"]) player.y += PLAYER_SPEED;
  keepPlayerInBounds();
}

function checkCollisions() {
  waffles.forEach(item => {
    if (item.collected) return;

    const dx = player.x - item.x;
    const dy = player.y - item.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 20) {
      item.collected = true;
      score += 10;
      updateHUD();
    }
  });

  const remaining = waffles.filter(item => !item.collected).length;
  if (remaining === 0) {
    spawnItems();
  }
}

function render() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  drawBackground();
  drawItems();
  drawPlayer();
}

function gameLoop() {
  if (!running) return;

  updateMovement();
  checkCollisions();
  render();

  animationFrameId = requestAnimationFrame(gameLoop);
}

async function saveScore(name, finalScore) {
  try {
    await fetch("http://localhost:5000/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        player: name,
        score: finalScore
      })
    });
  } catch (error) {
    console.error("Score save failed:", error);
  }
}

async function loadLeaderboard() {
  try {
    const res = await fetch("http://localhost:5000/leaderboard");
    const data = await res.json();

    leaderboardList.innerHTML = "";

    if (!data.length) {
      const li = document.createElement("li");
      li.textContent = "No scores yet. Be the first rider!";
      li.className = "empty-state";
      leaderboardList.appendChild(li);
      return;
    }

    data.forEach(entry => {
      const li = document.createElement("li");
      li.textContent = `${entry.player} — ${entry.score} pts`;
      leaderboardList.appendChild(li);
    });
  } catch (error) {
    leaderboardList.innerHTML = "";
    const li = document.createElement("li");
    li.textContent = "Leaderboard unavailable";
    li.className = "empty-state";
    leaderboardList.appendChild(li);
    console.error("Leaderboard load failed:", error);
  }
}

async function endGame() {
  running = false;
  startBtn.disabled = false;

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  if (timerInterval) {
    clearInterval(timerInterval);
  }

  const name = playerNameInput.value.trim() || "Dutch Rider";
  await saveScore(name, score);
  await loadLeaderboard();

  render();

  setTimeout(() => {
    alert(`Ride finished!\n${name}, your score is ${score} points.`);
  }, 100);
}

function startGame() {
  score = 0;
  timeLeft = GAME_DURATION;
  running = true;
  startBtn.disabled = true;

  resetPlayer();
  spawnItems();
  updateHUD();
  render();

  timerInterval = setInterval(() => {
    timeLeft -= 1;
    updateHUD();

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  gameLoop();
}

document.addEventListener("keydown", event => {
  keys[event.key] = true;
});

document.addEventListener("keyup", event => {
  keys[event.key] = false;
});

startBtn.addEventListener("click", startGame);

updateHUD();
render();
loadLeaderboard();