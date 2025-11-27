// Initialize variables from localStorage or defaults
let score = 0;
let highScore = parseInt(localStorage.getItem('highScore')) || 0;
let multiplier = parseInt(localStorage.getItem('multiplier')) || 1;
let multiplierCost = parseInt(localStorage.getItem('multiplierCost')) || 10;
let autoClickers = parseInt(localStorage.getItem('autoClickers')) || 0;
let autoClickerCost = parseInt(localStorage.getItem('autoClickerCost')) || 10;

// Update display
function updateDisplay() {
  document.getElementById('score').innerText = `Score: ${score}`;
  document.getElementById('highScore').innerText = `High Score: ${highScore}`;
  document.getElementById('multiplier').innerText = `Current Multiplier: ${multiplier}x`;
  document.getElementById('multiplierCostDisplay').innerText = multiplierCost;
  document.getElementById('autoClickerRate').innerText = `Auto Clickers: ${autoClickers} (${autoClickers} clicks/sec)`;
  document.getElementById('autoClickerCostDisplay').innerText = autoClickerCost;
}

// Save data to local storage
function saveData() {
  localStorage.setItem('highScore', highScore);
  localStorage.setItem('multiplier', multiplier);
  localStorage.setItem('multiplierCost', multiplierCost);
  localStorage.setItem('autoClickers', autoClickers);
  localStorage.setItem('autoClickerCost', autoClickerCost);
}

// Check and update high score
function checkHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
  }
}

// Cookie click handler
function cookieClick() {
  score += (1 * multiplier);
  checkHighScore();
  updateDisplay();
}

// Load high score
function loadFromHighScore() {
  score = parseInt(localStorage.getItem('highScore')) || 0;
  updateDisplay();
}

// Buy multiplier
function buyMultiplier() {
  if (score >= multiplierCost) {
    score -= multiplierCost;
    multiplier += 1;
    multiplierCost = Math.floor(multiplierCost * 1.5);
    saveData();
    updateDisplay();
  } else {
    alert('Not enough score to buy multiplier!');
  }
}

// Buy auto clicker
function buyAutoClicker() {
  if (score >= autoClickerCost) {
    score -= autoClickerCost;
    autoClickers += 1;
    autoClickerCost = Math.floor(autoClickerCost * 1.5);
    saveData();
    updateDisplay();
  } else {
    alert('Not enough score to buy auto clicker!');
  }
}

// Add huge score
function addHugeScore() {
  score += 100000000000000000000; // 100 quintillion
  checkHighScore();
  updateDisplay();
}

// Kill score (reset)
function killScore() {
  score = 0;
  highScore = 0;
  saveData();
  updateDisplay();
}

// Auto click every second
function autoClick() {
  if (autoClickers > 0) {
    score += autoClickers;
    checkHighScore();
    updateDisplay();
  }
}

// Setup event listeners after DOM loads
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cookieButton').addEventListener('click', cookieClick);
  document.getElementById('killScore').addEventListener('click', killScore);
  document.getElementById('loadHighScoreBtn').addEventListener('click', loadFromHighScore);
  document.getElementById('addHugeScore').addEventListener('click', addHugeScore);
  document.getElementById('buyMultiplierBtn').addEventListener('click', buyMultiplier);
  document.getElementById('buyAutoClickerBtn').addEventListener('click', buyAutoClicker);

  // Initial display
  loadFromHighScore();
  updateDisplay();
});

// Auto click interval
setInterval(autoClick, 1000);