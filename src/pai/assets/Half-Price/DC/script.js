// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const resSound = new Audio('./revive.mp3');
// Load images
const bulletImage = new Image();
bulletImage.src = './Crowbar.png'; // your bullet image path

const bulletImage1 = new Image();
bulletImage1.src = './bullet.png'; // your bullet image path for player 2

const enemyImage = new Image();
enemyImage.src = 'Headcrab.png'; // your enemy image path

// Load kill sound
const killSound = new Audio('./kill.mp3'); // your sound path

// Wait for images to load before starting game
let assetsLoaded = 0;
bulletImage.onload = () => {
    assetsLoaded++;
    if (assetsLoaded === 2) startGame();
};
enemyImage.onload = () => {
    assetsLoaded++;
    if (assetsLoaded === 2) startGame();
};

// Game variables
const players = [
    {
        x: 50,
        y: canvas.height - 60,
        width: 40,
        height: 40,
        speed: 10,
        bullets: [],
        alive: true,
        invincible: false,
        invincibleTime: 0,
        color: '#fb7e14',
        defaultColor: '#fb7e14', // add this line
        controls: { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight', shoot: ' ' },
        score: 0
    },
    {
        x: 100,
        y: canvas.height - 60,
        width: 40,
        height: 40,
        speed: 10,
        bullets: [],
        alive: true,
        invincible: false,
        invincibleTime: 0,
        color: '#5a4e3c',
        defaultColor: '#5a4e3c', // add this line
        controls: { up: 'w', down: 's', left: 'a', right: 'd', shoot: 'e' },
        score: 0
    }
];

const keys = {};
const enemies = [];
let totalScore = 0;
let highScore = localStorage.getItem('highScore') || 0;
let paused = false;

function startGame() {
    update();
}

// Draw player
function drawPlayer(player) {
    ctx.fillStyle = player.invincible ? 'rgba(255,255,255,0.5)' : player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.fillText(`Score: ${player.score}`, player.x, player.y - 10);
}

// Draw high score
function drawHighScore() {
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`High Score: ${highScore}`, canvas.width / 2, 30);
}

// Draw bullets
function drawBullets() {
    players.forEach(player => {
        player.bullets.forEach((bullet, bIndex) => {
            const bulletImg = player === players[1] ? bulletImage1 : bulletImage;
ctx.drawImage(bulletImg, bullet.x, bullet.y, bullet.width, bullet.height);
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
                        player.score++;
                        totalScore++;
                        if (totalScore > highScore) {
                            highScore = totalScore;
                            localStorage.setItem('highScore', highScore);
                        }
                        killSound.play(); // Play kill sound
                    }
                });
            }
        });
    });
}

// Draw enemies
function drawEnemies() {
    enemies.forEach((enemy, index) => {
        ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);
        moveEnemy(enemy);
        checkCollisionWithPlayers(enemy, index);
        if (
            enemy.y > canvas.height ||
            enemy.x > canvas.width ||
            enemy.x + enemy.width < 0
        ) {
            enemies.splice(index, 1);
        }
    });
}

// Enemies chase nearest player
function moveEnemy(enemy) {
    const alivePlayers = players.filter(p => p.alive);
    if (alivePlayers.length === 0) return;
    let closestPlayer = null;
    let minDist = Infinity;
    alivePlayers.forEach(p => {
        const dist = Math.hypot(p.x - enemy.x, p.y - enemy.y);
        if (dist < minDist) {
            minDist = dist;
            closestPlayer = p;
        }
    });
    if (closestPlayer) {
        const angle = Math.atan2(closestPlayer.y - enemy.y, closestPlayer.x - enemy.x);
        enemy.x += enemy.speed * Math.cos(angle);
        enemy.y += enemy.speed * Math.sin(angle);
    }
}

// Check collision with players
function checkCollisionWithPlayers(enemy, index) {
    players.forEach((player) => {
        if (
            player.alive &&
            !player.invincible &&
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            // Player dies
            player.alive = false;
            player.color = 'pink';
        }
    });
}

// Move player
function movePlayer(player) {
    if (!player.alive) return;
    if (keys[player.controls.up] && player.y > 0) player.y -= player.speed;
    if (keys[player.controls.down] && player.y + player.height < canvas.height) player.y += player.speed;
    if (keys[player.controls.left] && player.x > 0) player.x -= player.speed;
    if (keys[player.controls.right] && player.x + player.width < canvas.width) player.x += player.speed;
}

// Shooting
function shoot(player) {
    if (!player.alive || player.bullets.length > 5) return;
    player.bullets.push({
        x: player.x + player.width / 2 - 10,
        y: player.y,
        width: 20,
        height: 40,
        speed: 14
    });
}

// Revive players
function checkPlayerRevival() {
    players.forEach((player, index) => {
        if (!player.alive) {
            const other = players[1 - index];
            if (
                other.alive &&
                other.x < player.x + player.width &&
                other.x + other.width > player.x &&
                other.y < player.y + player.height &&
                other.y + other.height > player.y
            ) {
                player.alive = true;
                player.invincible = true;
                player.invincibleTime = 5000;
                resSound.play();
                player.color = player.defaultColor;
            }
        }
    });
}

// Game over
function endGame() {
    alert("Game Over! Restarting...");
    location.reload();
}

// Check if both dead
function checkGameOver() {
    if (!players[0].alive && !players[1].alive) {
        endGame();
    }
}

// Main update loop
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Invincibility timers
    players.forEach(p => {
        if (p.invincible) {
            p.invincibleTime -= 16;
            if (p.invincibleTime <= 0) {
                p.invincible = false;
            }
        }
    });

    // Draw everything
    players.forEach(drawPlayer);
    drawHighScore();
    drawBullets();
    drawEnemies();
    players.forEach(movePlayer);
    checkPlayerRevival();
    checkGameOver();

    requestAnimationFrame(update);
}

// Controls
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    players.forEach(p => {
        if (e.key === p.controls.shoot) {
            shoot(p);
        }
    });
});
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Spawn enemies
setInterval(() => {
    if (!paused) {
        const enemyW = 40;
        const enemyH = 40;
        const x = Math.random() * (canvas.width - enemyW);
        const speed = Math.random() * 2 + 1;
        enemies.push({ x, y: 0, width: enemyW, height: enemyH, speed });
    }
}, 1000);

// Start game when assets are ready
// (handled above with startGame)