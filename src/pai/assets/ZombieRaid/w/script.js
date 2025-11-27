const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 40,
    height: 40,
    speed: 5,
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
let wave = 1; // Starting wave
let enemiesPerWave = 1; // Base enemies count

// Display high score
document.getElementById('highScore').textContent = highScore;

function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
    ctx.fillStyle = 'yellow';
    player.bullets.forEach((bullet, bIndex) => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        bullet.y -= bullet.speed;

        // Remove bullets off-screen
        if (bullet.y + bullet.height < 0) {
            player.bullets.splice(bIndex, 1);
        }

        // Check collision with enemies
        enemies.forEach((enemy, eIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                // Reduce enemy health
                enemy.health -= 5;

                // Remove bullet
                player.bullets.splice(bIndex, 1);

                // Check if enemy is dead
                if (enemy.health <= 0) {
                    enemies.splice(eIndex, 1);
                    score++;
                    document.getElementById('score').textContent = score;

                    if (score > highScore) {
                        highScore = score;
                        localStorage.setItem('highScore', highScore);
                        document.getElementById('highScore').textContent = highScore;
                    }
                }
            }
        });
    });
}

function drawEnemies() {
    ctx.fillStyle = 'green';
    enemies.forEach((enemy, index) => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        moveEnemy(enemy);
        checkCollisionWithPlayer(enemy, index);
        if (
            enemy.y > canvas.height ||
            enemy.x > canvas.width ||
            enemy.x < -enemy.width
        ) {
            enemies.splice(index, 1);
        }
        // Draw health above enemy
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(enemy.health, enemy.x + enemy.width / 2, enemy.y - 5);
    });
}

function moveEnemy(enemy) {
    const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
    enemy.x += enemy.speed * Math.cos(angle);
    enemy.y += enemy.speed * Math.sin(angle);
}

function checkCollisionWithPlayer(enemy, index) {
    if (
        player.x < enemy.x + enemy.width &&
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y
    ) {
        alert('Game Over! Restarting...');
        enemies.length = 0;
        player.bullets.length = 0;
        player.x = canvas.width / 2;
        player.y = canvas.height / 2;
        score = 0;
        document.getElementById('score').textContent = score;
        wave = 1;
        spawnWave();
    }
}

function movePlayer() {
    if (keys.up && player.y > 0) player.y -= player.speed;
    if (keys.down && player.y + player.height < canvas.height)
        player.y += player.speed;
    if (keys.left && player.x > 0) player.x -= player.speed;
    if (
        keys.right &&
        player.x + player.width < canvas.width
    )
        player.x += player.speed;
}

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

// Function to draw current wave number
function drawWave() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Wave: ${wave}`, 10, 25);
}

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

    // Draw wave count
    drawWave();

    // Check if wave is cleared
    if (enemies.length === 0) {
        wave++;
        spawnWave();
    }

    requestAnimationFrame(update);
}

// Function to spawn a wave
function spawnWave() {
    const enemyCount = enemiesPerWave + (wave - 1) * 1; // Increase enemy count each wave
    const enemyHealth = 5 + (wave - 1) * 1; // Increase health each wave
    for (let i = 0; i < enemyCount; i++) {
        const enemyWidth = 40;
        const enemyHeight = 40;
        const x = Math.random() * (canvas.width - enemyWidth);
        const speed = Math.random() * 2 + 1 + wave * 0.2; // Slightly increase speed per wave
        enemies.push({ x, y: 0, width: enemyWidth, height: enemyHeight, speed, health: enemyHealth });
    }
}

// Event listeners
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') keys.up = true;
    if (e.key === 'ArrowDown') keys.down = true;
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
    if (e.key === ' ') {
        // Shoot bullets
        player.bullets.push({
            x: player.x + player.width / 2 - 2.5,
            y: player.y,
            width: 5,
            height: 10,
            speed: 7
        });
    }
    if (e.key === '/') {
        paused = !paused;
        if (!paused) {
            requestAnimationFrame(update);
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') keys.up = false;
    if (e.key === 'ArrowDown') keys.down = false;
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
});

// Initial spawn
spawnWave();

// Start the game loop
update();