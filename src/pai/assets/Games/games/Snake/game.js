const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 20;
const rows = canvas.height / scale;
const cols = canvas.width / scale;
const statusEl = document.getElementById('status');
const scoreEl = document.getElementById('score');

let snake = [{ x: 10 * scale, y: 10 * scale }];
let direction = { x: 1, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let paused = false;

function placeFood() {
  food.x = Math.floor(Math.random() * cols) * scale;
  food.y = Math.floor(Math.random() * rows) * scale;
}

placeFood();

window.addEventListener('keydown', (e) => {
  if (e.key === ' ') {
    paused = !paused;
    statusEl.textContent = paused ? 'PAUSED' : 'Press SPACE to pause/resume';
    return;
  }
  if (paused) return;

  if (e.key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -1 };
  else if (e.key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: 1 };
  else if (e.key === 'ArrowLeft' && direction.x === 0) direction = { x: -1, y: 0 };
  else if (e.key === 'ArrowRight' && direction.x === 0) direction = { x: 1, y: 0 };
});

function draw() {
  if (paused) return;

  // Clear canvas
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = '#f00';
  ctx.fillRect(food.x, food.y, scale, scale);

  // Move snake
  const head = {
    x: snake[0].x + direction.x * scale,
    y: snake[0].y + direction.y * scale
  };

  // Check collisions
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || 
      snake.some((s, i) => i > 0 && s.x === head.x && s.y === head.y)) {
    alert(`Game Over! Score: ${score}`);
    snake = [{ x: 10 * scale, y: 10 * scale }];
    direction = { x: 1, y: 0 };
    score = 0;
    scoreEl.textContent = score;
    placeFood();
    paused = false;
    statusEl.textContent = 'Press SPACE to pause/resume';
    return;
  }

  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = score;
    placeFood();
  } else {
    snake.pop();
  }

  // Draw snake
  ctx.fillStyle = '#0f0';
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, scale, scale));
}

setInterval(draw, 100);