// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const bulletImage = new Image();
bulletImage.src = 'knife.png'; // Replace with your bullet image path

const enemyImage = new Image();
enemyImage.src = 'kris.png'; // Replace with your enemy image path
const killSound = new Audio('kill.wav'); // replace with your sound file path
const playerImage = new Image();
playerImage.src = 'player.png'; // your player sprite

// Track image loading
let imagesLoaded = 0;
bulletImage.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === 32) startGame();
};
enemyImage.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === 3) startGame();
};
playerImage.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === 3) startGame();
};


// Game variables
const player = {
    x: canvas.width / 2 - 68 / 2, // center horizontally
    y: canvas.height - 50,
    width: 68,   // updated width
    height: 65,  // updated height
    speed: 10,
    bullets: []
};


const keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

const enemies = [];
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let paused = false;

// Update high score display
document.getElementById('highScore').textContent = highScore;

// Start the game after images are loaded
function startGame() {
    update();
}

// Draw player as rectangle (optional: can replace with image)
function drawPlayer() {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

// Draw bullets with images
function drawBullets() {
    player.bullets.forEach((bullet, bIndex) => {
        ctx.drawImage(bulletImage, bullet.x, bullet.y, bullet.width, bullet.height);
        bullet.y -= bullet.speed;
        if (bullet.y + bullet.height < 0) {
            player.bullets.splice(bIndex, 1);
        } else {
            // Check collision with enemies
            enemies.forEach((enemy, eIndex) => {
                if (
                    bullet.x < enemy.x + enemy.width &&
                    bullet.x + bullet.width > enemy.x &&
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + bullet.height > enemy.y
                ) {
                    enemies.splice(eIndex, 1);
                    player.bullets.splice(bIndex, 1);
                    score++;
                    document.getElementById('score').textContent = score;
                    killSound.play();
                    if (score > highScore) {
                        highScore = score;
                        localStorage.setItem('highScore', highScore);
                        document.getElementById('highScore').textContent = highScore;
                    }
                }
            });
        }
    });
    // When shooting bullets

}

// Draw enemies with images
function drawEnemies() {
    enemies.forEach((enemy, index) => {
        ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);
        moveEnemy(enemy);
        checkCollisionWithPlayer(enemy, index);
        if (
            enemy.y > canvas.height ||
            enemy.x > canvas.width ||
            enemy.x + enemy.width < 0
        ) {
            enemies.splice(index, 1);
        }
    });
}

// Make enemies move toward the player
function moveEnemy(enemy) {
    const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
    enemy.x += enemy.speed * Math.cos(angle);
    enemy.y += enemy.speed * Math.sin(angle);
}

// Check collision with player
function checkCollisionWithPlayer(enemy, index) {
    if (
        player.x < enemy.x + enemy.width &&
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y
    ) {
        alert('Kris touched you meaning the player now has control.');
        enemies.length = 0;
        player.bullets.length = 0;
        player.x = canvas.width / 2 - player.width / 2;
        player.y = canvas.height - 50;
        score = 0;
        document.getElementById('score').textContent = score;
    }
}

// Move player based on pressed keys
function movePlayer() {
    if (keys.up && player.y > 0) player.y -= player.speed;
    if (keys.down && player.y + player.height < canvas.height) player.y += player.speed;
    if (keys.left && player.x > 0) player.x -= player.speed;
    if (keys.right && player.x + player.width < canvas.width) player.x += player.speed;
}

// Draw pause overlay
function drawPauseScreen() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Paused', canvas.width / 2, canvas.height / 2 - 20);
    ctx.font = '20px Arial';
    ctx.fillText('Press / to continue', canvas.width / 2, canvas.height / 2 + 20);
}

// Main update loop
function update() {
    if (paused) {
        drawPauseScreen();
        requestAnimationFrame(update);
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBullets();
    drawEnemies();
    movePlayer();
    requestAnimationFrame(update);
}

// Handle key events
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') keys.up = true;
    if (e.key === 'ArrowDown') keys.down = true;
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
    if (e.key === ' ') {
        player.bullets.push({
            x: player.x + player.width / 2 - 29 / 2, // center the knife
            y: player.y,
            width: 29,
            height: 47,
            speed: 14
        });
    }
    if (e.key === '/') {
        paused = !paused;
        if (!paused) {
            update(); // Resume game loop
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') keys.up = false;
    if (e.key === 'ArrowDown') keys.down = false;
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
});

// Spawn enemies periodically
setInterval(() => {
    if (!paused) {
        const enemyWidth = 19;
        const enemyHeight = 37;
        const x = Math.random() * (canvas.width - enemyWidth);
        const speed = Math.random() * 2 + 1;
        enemies.push({ x, y: 0, width: enemyWidth, height: enemyHeight, speed });
    }
}, 1000);