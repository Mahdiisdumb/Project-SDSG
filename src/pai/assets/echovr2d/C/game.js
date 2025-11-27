const canvas = document.getElementById('arena');
const ctx = canvas.getContext('2d');

// Player settings
const player1 = {
    x: 100,
    y: 100,
    width: 20,
    height: 20,
    color: '#01aae1',
    speed: 5,
    health: 100,
    bullets: [],
    lastDirection: { x: 0, y: 0 },
    isDead: false
};

const player2 = {
    x: canvas.width - 140,
    y: 100,
    width: 20,
    height: 20,
    color: '#C58615',
    speed: 5,
    health: 100,
    bullets: [],
    lastDirection: { x: 0, y: 0 },
    isDead: false
};

const payload = {
    x: 300,
    y: 300,
    width: 20,
    height: 20,
    color: 'pink'
};

// Goal object at the blue side
const goal = {
    x: 100,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: 'pink'
};

let gameStartTime;
const gameDuration = 180; // 3 minutes in seconds
let keys = {};
let elapsedTime = 0;

// Draw the game background
function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(10, 50, 70, 0.9)');
    gradient.addColorStop(1, 'rgba(70, 30, 0, 0.9)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw each player
function drawPlayer(player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
    ctx.shadowBlur = 15;
    ctx.shadowBlur = 0; // Reset shadow

    // Draw health bar
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y - 10, player.width, 5);
    ctx.fillStyle = 'green';
    ctx.fillRect(player.x, player.y - 10, player.width * (player.health / 100), 5);
}

// Draw the bullets
function drawBullets(bullets) {
    ctx.fillStyle = 'yellow';
    bullets.forEach(bullet => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Draw the payload
function drawPayload() {
    ctx.fillStyle = payload.color;
    ctx.fillRect(payload.x, payload.y, payload.width, payload.height);
}

// Draw the goal
function drawGoal() {
    ctx.fillStyle = goal.color;
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
}

// Draw the timer
function drawTimer() {
    const timeLeft = Math.max(0, Math.ceil(gameDuration - elapsedTime)); // Calculate remaining time
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Format timer

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Time Left: ${formattedTime}`, canvas.width - 150, 30); // Draw timer on canvas
}

// Update bullets position
function updateBullets(bullets) {
    bullets.forEach((bullet, index) => {
        bullet.x += bullet.direction.x * bullet.speed;
        bullet.y += bullet.direction.y * bullet.speed;

        // Remove bullets if they go off-screen
        if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
            bullets.splice(index, 1);
        }
    });
}

// Shoot bullet from player
function shootBullet(player) {
    if (player.lastDirection.x !== 0 || player.lastDirection.y !== 0) {
        if (!player.isDead) { // Allow shooting only if player is not dead
            const bullet = {
                x: player.x + player.width / 2,
                y: player.y + player.height / 2,
                direction: {
                    x: player.lastDirection.x,
                    y: player.lastDirection.y
                },
                speed: 10
            };
            player.bullets.push(bullet);
        }
    }
}

// Check collision between bullets and players
function checkBulletCollision() {
    player1.bullets.forEach((bullet, bulletIndex) => {
        if (bullet.x > player2.x && bullet.x < player2.x + player2.width &&
            bullet.y > player2.y && bullet.y < player2.y + player2.height && !player2.isDead) {
            player2.health -= 10; // Deal damage to Player 2
            if (player2.health <= 0) {
                player2Dead(); // Handle Player 2's death
            }
            player1.bullets.splice(bulletIndex, 1); // Remove bullet after hit
        }
    });

    player2.bullets.forEach((bullet, bulletIndex) => {
        if (bullet.x > player1.x && bullet.x < player1.x + player1.width &&
            bullet.y > player1.y && bullet.y < player1.y + player1.height && !player1.isDead) {
            player1.health -= 10; // Deal damage to Player 1
            if (player1.health <= 0) {
                player1Dead(); // Handle Player 1's death
            }
            player2.bullets.splice(bulletIndex, 1); // Remove bullet after hit
        }
    });
}

// Handle Player 1's death
function player1Dead() {
    player1.isDead = true; // Set player 1 dead state
    player1.color = 'grey';
    setTimeout(() => {
        player1.health = 100; // Respawn player
        player1.color = '#01aae1'; // Restore original color
        player1.x = 100; // Respawn position
        player1.y = 100;
        player1.isDead = false; // Reset dead state
    }, 5000); // 5 seconds as dead
}

// Handle Player 2's death
function player2Dead() {
    player2.isDead = true; // Set player 2 dead state
    player2.color = 'grey';
    setTimeout(() => {
        player2.health = 100; // Respawn player
        player2.color = '#C58615'; // Restore original color
        player2.x = canvas.width - 140; // Respawn position
        player2.y = 100;
        player2.isDead = false; // Reset dead state
    }, 5000); // 5 seconds as dead
}

// Main update loop
function update() {
    elapsedTime = Math.floor((Date.now() - gameStartTime) / 1000); // Calculate elapsed time
    if (elapsedTime >= gameDuration) {
        endGame(); // End game if time runs out
        return; // Stop further updating
    }

    drawBackground();
    drawPlayer(player1);
    drawPlayer(player2);
    drawBullets(player1.bullets);
    drawBullets(player2.bullets);
    drawPayload(); // Draw the payload
    drawGoal(); // Draw the goal
    drawTimer(); // Draw the timer

    // Draw aim indicators
    drawAimIndicator(player1);
    drawAimIndicator(player2);

    updatePlayerMovement();
    updateBullets(player1.bullets);
    updateBullets(player2.bullets);
    checkBulletCollision();
    updatePayload(); // Update the position of the payload
}

// Draw aim indicator for players
function drawAimIndicator(player) {
    if (player.lastDirection.x !== 0 || player.lastDirection.y !== 0) {
        const aimEndX = player.x + player.width / 2 + player.lastDirection.x * 50; // Extend line 50 pixels
        const aimEndY = player.y + player.height / 2 + player.lastDirection.y * 50; // Extend line 50 pixels

        ctx.strokeStyle = player.color; // Use player's color for the aim line
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(player.x + player.width / 2, player.y + player.height / 2); // Start from the center of the player
        ctx.lineTo(aimEndX, aimEndY); // Draw to the end of the aiming vector
        ctx.stroke();
    }
}

// Update player movement
function updatePlayerMovement() {
    if (player1.isDead && player2.isDead) return; // Stop movement if both players are dead

    // Player 1 movement
    const direction1 = { x: 0, y: 0 };
    if (!player1.isDead) {
        if (keys['ArrowUp']) direction1.y = -1;
        if (keys['ArrowDown']) direction1.y = 1;
        if (keys['ArrowLeft']) direction1.x = -1;
        if (keys['ArrowRight']) direction1.x = 1;

        // Normalize direction
        const length1 = Math.sqrt(direction1.x ** 2 + direction1.y ** 2);
        if (length1 > 0) {
            direction1.x /= length1;
            direction1.y /= length1;
        }

        player1.x += direction1.x * player1.speed;
        player1.y += direction1.y * player1.speed;
        player1.lastDirection = { x: direction1.x, y: direction1.y };

        // Keep player 1 within boundaries
        player1.x = Math.max(0, Math.min(canvas.width - player1.width, player1.x));
        player1.y = Math.max(0, Math.min(canvas.height - player1.height, player1.y));
    }

    // Player 2 movement
    const direction2 = { x: 0, y: 0 };
    if (!player2.isDead) {
        if (keys['w']) direction2.y = -1;
        if (keys['s']) direction2.y = 1;
        if (keys['a']) direction2.x = -1;
        if (keys['d']) direction2.x = 1;

        // Normalize direction
        const length2 = Math.sqrt(direction2.x ** 2 + direction2.y ** 2);
        if (length2 > 0) {
            direction2.x /= length2;
            direction2.y /= length2;
        }

        player2.x += direction2.x * player2.speed;
        player2.y += direction2.y * player2.speed;
        player2.lastDirection = { x: direction2.x, y: direction2.y };

        // Keep player 2 within boundaries
        player2.x = Math.max(0, Math.min(canvas.width - player2.width, player2.x));
        player2.y = Math.max(0, Math.min(canvas.height - player2.height, player2.y));
    }
}

// Update the payload position
function updatePayload() {
    // Make the payload follow Player 2
    if (!player2.isDead) {
        payload.x = player2.x + player2.width + 5; // Offset a little in front of Player 2
        payload.y = player2.y; // Align vertically with Player 2
    }

    // Check if the payload reached the goal
    if (
        payload.x < goal.x + goal.width &&
        payload.x + payload.width > goal.x &&
        payload.y < goal.y + goal.height &&
        payload.y + payload.height > goal.y
    ) {
        alert('Orange team wins!');
        resetGame();
    }
}

// Input handling
document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
    // Player 1 shooting
    if (event.key === ' ') {
        shootBullet(player1);
    }
    // Player 2 shooting
    if (event.key === 'e') {
        shootBullet(player2);
    }
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

// Start the game
function startGame() {
    gameStartTime = Date.now(); // Start the timer
}

// Reset game state
function resetGame() {
    player1.health = player2.health = 100;
    player1.x = 100;
    player1.y = 100;
    player2.x = canvas.width - 140;
    player2.y = 100;
    payload.x = player2.x + player2.width + 5; // Reset payload position in front of player 2
    payload.y = player2.y; // Align vertically with Player 2
    elapsedTime = 0; // Reset elapsed time for the new game
    startGame(); // Restart the game timer
}

// Function to handle the end of the game
function endGame() {
    if (player1.health <= 0) {
        alert('Player 2 wins!');
    } else if (player2.health <= 0) {
        alert('Player 1 wins!');
    } else {
        alert('Time is up! Blue team wins!');
    }
    // Optionally, reset the game
    resetGame();
}

// Start the game
startGame();
setInterval(update, 1000 / 60); // Run update at 60 FPS