const player = document.getElementById('player');
const target = document.getElementById('target');
const scoreElement = document.getElementById('score');
const highscoreElement = document.getElementById('highscore');

const gameContainer = document.getElementById('game-container');
const containerWidth = gameContainer.offsetWidth;
const containerHeight = gameContainer.offsetHeight;

let score = 0;
let highscore = localStorage.getItem('highScore') || 0;
let playerSpeed = 4.5;
let targetSpeed = 4;

highscoreElement.textContent = highscore;

// Player starting position
let playerX = 100;
let playerY = 100;

// Target starting position and velocity
let targetX = Math.random() * (containerWidth - 60);
let targetY = Math.random() * (containerHeight - 60);
let targetVelocityX = targetSpeed * (Math.random() > 0.5 ? 1 : -1);
let targetVelocityY = targetSpeed * (Math.random() > 0.5 ? 1 : -1);

// Variables to track target's previous position and stuck status
let previousTargetX = targetX;
let previousTargetY = targetY;
let stuckCounter = 0;
const maxStuckFrames = 30; // Number of frames to consider as stuck

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

// Movement detection for player
window.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = false;
    }
});

// Move the target randomly
function moveTargetRandomly() {
    targetX += targetVelocityX;
    targetY += targetVelocityY;

    // Bounce the target off the walls when it reaches the edges
    if (targetX <= 0 || targetX >= containerWidth - 60) {
        targetVelocityX *= -1; // Reverse X direction
        targetX = Math.max(0, Math.min(containerWidth - 60, targetX));
    }
    if (targetY <= 0 || targetY >= containerHeight - 60) {
        targetVelocityY *= -1; // Reverse Y direction
        targetY = Math.max(0, Math.min(containerHeight - 60, targetY));
    }
}

// Teleport the target to a random position
function teleportTarget() {
    targetX = Math.random() * (containerWidth - 60);
    targetY = Math.random() * (containerHeight - 60);
    targetVelocityX = targetSpeed * (Math.random() > 0.5 ? 1 : -1);
    targetVelocityY = targetSpeed * (Math.random() > 0.5 ? 1 : -1);
}

function update() {
    // Player movement
    if (keys.ArrowUp && playerY > 0) playerY -= playerSpeed;
    if (keys.ArrowDown && playerY < containerHeight - 60) playerY += playerSpeed;
    if (keys.ArrowLeft && playerX > 0) playerX -= playerSpeed;
    if (keys.ArrowRight && playerX < containerWidth - 60) playerX += playerSpeed;

    // Apply movement to player
    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';

    // Store previous position of the target to check for stuck state
    previousTargetX = targetX;
    previousTargetY = targetY;

    // Compute distance from the player to the target
    const distanceToPlayer = Math.sqrt((targetX - playerX) ** 2 + (targetY - playerY) ** 2);

    if (distanceToPlayer < 200) { // If within proximity
        // Make target run away from the player
        const deltaX = targetX - playerX;
        const deltaY = targetY - playerY;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        targetVelocityX = (deltaX / distance) * targetSpeed; // Move away
        targetVelocityY = (deltaY / distance) * targetSpeed; // Move away

        targetX += targetVelocityX;
        targetY += targetVelocityY;

        // Ensure the target doesn't stick to the walls
        targetX = Math.max(0, Math.min(containerWidth - 60, targetX));
        targetY = Math.max(0, Math.min(containerHeight - 60, targetY));
    } else {
        // Move target randomly when not close to the player
        moveTargetRandomly();
    }

    // Check for stuck condition
    if (targetX === previousTargetX && targetY === previousTargetY) {
        stuckCounter++;
        if (stuckCounter >= maxStuckFrames) {
            teleportTarget();
            stuckCounter = 0; // Reset counter after teleportation
        }
    } else {
        stuckCounter = 0; // Reset counter if target has moved
    }

    // Apply movement to target
    target.style.left = targetX + 'px';
    target.style.top = targetY + 'px';

    // Detect collision with the target (catch)
    if (Math.abs(playerX - targetX) < 60 && Math.abs(playerY - targetY) < 60) {
        score++;
        scoreElement.textContent = score;

        // Check high score
        if (score > highscore) {
            highscore = score;
            localStorage.setItem('highScore', highscore);
            highscoreElement.textContent = highscore;
        }

        // Reposition the target when caught
        repositionTarget();
    }

    requestAnimationFrame(update);
}

// Function to reposition the target to a random position when caught
function repositionTarget() {
    targetX = Math.random() * (containerWidth - 60);
    targetY = Math.random() * (containerHeight - 60);
    stuckCounter = 0; // Reset stuck counter after repositioning
    // Keep the target moving at the same speed
    targetVelocityX = targetSpeed * (Math.random() > 0.5 ? 1 : -1);
    targetVelocityY = targetSpeed * (Math.random() > 0.5 ? 1 : -1);
}

update();