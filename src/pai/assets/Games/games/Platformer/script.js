const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const player = {
  x: 50, y: 300,
  width: 40, height: 40,
  dx: 0, dy: 0,
  speed: 2, gravity: 0.5, jumpPower: -10,
  onGround: false
};
const keys = { right: false, left: false, up: false };
let level = 0;

function drawPlayer() {
  ctx.fillStyle = 'white';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
  levels[level].forEach(p => {
    ctx.fillStyle = p.type === 'spike' ? 'red' : 'black';
    ctx.fillRect(p.x, p.y, p.width, p.height);
  });
}

function checkCollisions(platform) {
  const playerLeft = player.x;
  const playerRight = player.x + player.width;
  const playerTop = player.y;
  const playerBottom = player.y + player.height;
  const platformLeft = platform.x;
  const platformRight = platform.x + platform.width;
  const platformTop = platform.y;
  const platformBottom = platform.y + platform.height;

  const horizontalOverlap = playerRight > platformLeft && playerLeft < platformRight;
  const verticalOverlap = playerBottom > platformTop && playerTop < platformBottom;

  return horizontalOverlap && verticalOverlap;
}

function updatePlayer() {
  player.dx = 0;
  if (keys.right) player.dx = player.speed;
  if (keys.left) player.dx = -player.speed;
  player.x += player.dx;

  if (keys.up && player.onGround) {
    player.dy = player.jumpPower;
    player.onGround = false;
  }

  player.dy += player.gravity;
  const nextY = player.y + player.dy;
  let landed = false;

  levels[level].forEach(p => {
    if (checkCollisions(p)) {
      if (p.type === 'spike') {
        resetPlayer();
      } else if (player.y + player.height <= p.y && nextY + player.height >= p.y) {
        // Landing on platform from above
        player.dy = p.y - player.y - player.height;
        landed = true;
      }
    }
  });

  player.y += player.dy;
  player.onGround = landed;

  // Bottom boundary
  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
    player.dy = 0;
    player.onGround = true;
  }

  // Wrap around horizontally
  if (player.x > canvas.width) {
    player.x = 0;
    level = (level + 1) % levels.length;
  } else if (player.x < 0) {
    player.x = canvas.width - player.width;
    level = (level - 1 + levels.length) % levels.length;
  }
}

function resetPlayer() {
  player.x = 50;
  player.y = 300;
  player.dx = 0;
  player.dy = 0;
  level = 0;
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlatforms();
  updatePlayer();
  drawPlayer();
  requestAnimationFrame(update);
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') keys.right = true;
  if (e.key === 'ArrowLeft') keys.left = true;
  if (e.key === 'ArrowUp') keys.up = true;
});

document.addEventListener('keyup', e => {
  if (e.key === 'ArrowRight') keys.right = false;
  if (e.key === 'ArrowLeft') keys.left = false;
  if (e.key === 'ArrowUp') keys.up = false;
});

update();