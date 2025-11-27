const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const resSound = new Audio('./revive.mp3'); // Revival sound

// Initialize players with controls, position, and properties
const players = [
    {
        x: 50,
        y: canvas.height - 60,
        width: 40,
        height: 40,
        speed: 5,
        bullets: [],
        alive: true,
        invincible: false,
        invincibleTime: 0,
        color: 'red',
        controls: { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight', shoot: ' ' },
        score: 0
    },
    {
        x: 100,
        y: canvas.height - 60,
        width: 40,
        height: 40,
        speed: 5,
        bullets: [],
        alive: true,
        invincible: false,
        invincibleTime: 0,
        color: 'blue',
        controls: { up: 'w', down: 's', left: 'a', right: 'd', shoot: 'e' },
        score: 0
    }
];

const keys = {}; // Global key state
const enemies = [];
let totalScore = 0;
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
let paused = false;
let wave = 1; // Starting wave

// Draw individual player
function drawPlayer(player) {
    ctx.fillStyle = player.invincible ? 'rgba(255,255,255,0.5)' : player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.fillText(`Score: ${player.score}`, player.x, player.y - 10);
}

// Draw high score at top center
function drawHighScore() {
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`High Score: ${highScore}`, canvas.width / 2, 30);
}

// Draw bullets for a player
function drawBullets(player) {
    player.bullets.forEach((bullet, bIndex) => {
        ctx.fillStyle = 'yellow';
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
                // Enemy takes damage
                enemy.health -= 5;

                // Remove bullet
                player.bullets.splice(bIndex, 1);

                // Check if enemy is dead
                if (enemy.health <= 0) {
                    enemies.splice(eIndex, 1);
                    player.score++;
                    totalScore++;
                    if (totalScore > highScore) {
                        highScore = totalScore;
                        localStorage.setItem('highScore', highScore);
                    }
                }
            }
        });
    });
}

// Draw enemies and move them towards nearest alive player
function drawEnemies() {
    ctx.fillStyle = 'green';
    enemies.forEach((enemy, index) => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        moveEnemy(enemy);
        checkCollisionWithPlayers(enemy, index);
        // Remove enemies off-screen
        if (
            enemy.y > canvas.height ||
            enemy.x > canvas.width ||
            enemy.x < -enemy.width
        ) {
            enemies.splice(index, 1);
        }
        // Draw enemy health
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(enemy.health, enemy.x + enemy.width / 2, enemy.y - 5);
    });
}

// Make enemies target the nearest alive player
function moveEnemy(enemy) {
    const alivePlayers = players.filter(p => p.alive);
    if (alivePlayers.length === 0) return; // No alive players
    // Find nearest player
    let closest = null;
    let minDist = Infinity;
    for (const p of alivePlayers) {
        const dist = Math.hypot(p.x - enemy.x, p.y - enemy.y);
        if (dist < minDist) {
            minDist = dist;
            closest = p;
        }
    }
    if (closest) {
        const angle = Math.atan2(closest.y - enemy.y, closest.x - enemy.x);
        enemy.x += enemy.speed * Math.cos(angle);
        enemy.y += enemy.speed * Math.sin(angle);
    }
}

// Check collision of enemies with players
function checkCollisionWithPlayers(enemy, enemyIndex) {
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
            player.color = 'pink'; // Dead color
        }
    });
}

// Move players based on key presses
function movePlayer(player) {
    if (!player.alive) return;
    if (keys[player.controls.up] && player.y > 0) player.y -= player.speed;
    if (keys[player.controls.down] && player.y + player.height < canvas.height)
        player.y += player.speed;
    if (keys[player.controls.left] && player.x > 0) player.x -= player.speed;
    if (keys[player.controls.right] && player.x + player.width < canvas.width)
        player.x += player.speed;
}

// Fire bullets
function shoot(player) {
    if (!player.alive) return;
    if (player.bullets.length > 5) return; // Limit bullets
    player.bullets.push({
        x: player.x + player.width / 2 - 2.5,
        y: player.y,
        width: 5,
        height: 10,
        speed: 7
    });
}

// Handle revival if players touch while one is dead
function checkPlayerRevival() {
    players.forEach((player, index) => {
        if (!player.alive) {
            const otherPlayer = players[1 - index];
            if (
                otherPlayer.alive &&
                // Touching check
                otherPlayer.x < player.x + player.width &&
                otherPlayer.x + otherPlayer.width > player.x &&
                otherPlayer.y < player.y + player.height &&
                otherPlayer.y + otherPlayer.height > player.y
            ) {
                // Revive and grant invincibility
                player.alive = true;
                player.invincible = true;
                player.invincibleTime = 5000; // 5 seconds
                resSound.play();
                // Restore color based on player
                player.color = index === 0 ? 'red' : 'blue';
            }
        }
    });
}

// End game when both players are dead
function endGame() {
    alert("Game Over (Reload Page)");
    location.reload();
}

// Check game over condition
function checkGameOver() {
    if (!players[0].alive && !players[1].alive) {
        endGame();
    }
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

// Draw current wave
function drawWave() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Wave: ${wave}`, 10, 25);
}

// Main update loop
function update() {
    if (paused) {
        drawPauseScreen();
        requestAnimationFrame(update);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update invincibility timers
    players.forEach(p => {
        if (p.invincible) {
            p.invincibleTime -= 16;
            if (p.invincibleTime <= 0) {
                p.invincible = false;
            }
        }
    });

    // Draw UI elements
    drawHighScore();
    drawWave();

    // Draw players
    players.forEach(drawPlayer);
    // Draw bullets
    players.forEach(p => drawBullets(p));
    // Draw enemies
    drawEnemies();

    // Move players
    players.forEach(movePlayer);

    // Handle revival
    checkPlayerRevival();

    // Check game over
    checkGameOver();

    // Check if wave is cleared
    if (enemies.length === 0) {
        wave++;
        spawnWave();
    }

    requestAnimationFrame(update);
}

// Handle key down
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    // Shooting
    players.forEach(p => {
        if (e.key === p.controls.shoot) {
            shoot(p);
        }
    });
    // Pause toggle
    if (e.key === '/') {
        paused = !paused;
        if (!paused) requestAnimationFrame(update);
    }
});
// Handle key up
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Spawn enemies periodically
setInterval(() => {
    spawnWave(); // Spawn new wave after some time if desired
}, 15000); // Optional: spawn waves automatically every 15 seconds

// Spawn initial wave
function spawnWave() {
    const enemyCount = 3 + wave; // Increase enemies per wave
    const enemyHealth = 5 + Math.floor(wave / 2); // Increase health
    for (let i = 0; i < enemyCount; i++) {
        const enemyWidth = 40;
        const enemyHeight = 40;
        const x = Math.random() * (canvas.width - enemyWidth);
        const speed = Math.random() * 2 + 1 + wave * 0.2; // Increase speed with wave
        enemies.push({ x, y: 0, width: enemyWidth, height: enemyHeight, speed, health: enemyHealth });
    }
}

// Start the game loop
update();