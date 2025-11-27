const canvas = document.getElementById('arena');
const ctx = canvas.getContext('2d');
const player1ScoreSound = new Audio('sfx/bscore.mp3');
const player2ScoreSound = new Audio('sfx/oscore.mp3');
const throwSound = new Audio('sfx/throw.mp3'); 
let overtimeDuration = 120000; // 2 minutes in milliseconds
let overtimeTimer = overtimeDuration;
let overtimeInterval;

const player1 = {
    x: 100,
    y: 100,
    width: 20,
    height: 20,
    color: '#01aae1',
    speed: 5,
    maxSpeed: 5,
    velocity: { x: 0, y: 0 },
    hasDisc: false
};

const player2 = {
    x: canvas.width - 40,
    y: 100,
    width: 20,
    height: 20,
    color: '#C58615',
    speed: 5,
    maxSpeed: 5,
    velocity: { x: 0, y: 0 },
    hasDisc: false,
    active: true
};

const disc = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    color: 'white',
    thrown: true,
    speed: 10,
    direction: { x: 0, y: 0 }
};

const twoPointAreaRadius = 150;
const goals = [
    { x: 100, y: canvas.height / 2 - 50, width: 10, height: 100, color: '#2deeff' },
    { x: canvas.width - 110, y: canvas.height / 2 - 50, width: 10, height: 100, color: 'orange' }
];

const backboardOffset = 100;
const backboards = [
    { x: goals[0].x - backboardOffset, y: canvas.height / 2, radius: 30, color: 'grey' },
    { x: goals[1].x + goals[1].width + backboardOffset, y: canvas.height / 2, radius: 30, color: 'grey' }
];

let mouseX = 0;
let mouseY = 0;
let keys = {};
let player1Score = 0;
let player2Score = 0;

let timer = 300000;// 5 minutes in milliseconds
let timerInterval;

// Flag to track if it's in overtime
let isInOvertime = false;
let overtimeCount = 0; // Counter for overtime rounds
const maxOvertimeRounds = 6; // Maximum number of overtime rounds allowed

const twoPointAreas = [
    {
        x: goals[0].x - twoPointAreaRadius,
        y: goals[0].y - twoPointAreaRadius,
        width: twoPointAreaRadius * 2,
        height: twoPointAreaRadius * 2.5
    },
    {
        x: goals[1].x - twoPointAreaRadius,
        y: goals[1].y - twoPointAreaRadius,
        width: twoPointAreaRadius * 2,
        height: twoPointAreaRadius * 2.5
    }
];

// Obstacles similar to Echo Arena
const obstacles = [
    { x: 250, y: 220, width: 20, height: 100, color: '#2deeff' },
    { x: 50, y: 400, width: 100, height: 25, color: '#2deeff' },
    { x: 50, y: 100, width: 100, height: 25, color: '#2deeff' },
    { x: 205, y: 150, width: 20, height: 20, color: '#2deeff' },
    { x: 205, y: 350, width: 20, height: 20, color: '#2deeff' },
    { x: 800, y: 220, width: 20, height: 100, color: 'orange' },
    { x: 920, y: 94, width: 100, height: 25, color: 'orange' },
    { x: 925, y: 400, width: 100, height: 25, color: 'orange' },
    { x: 847, y: 150, width: 20, height: 20, color: 'orange' },
    { x: 847, y: 350, width: 20, height: 20, color: 'orange' },

];

function drawArenaBackground() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    
    // Much darker colors for the gradient
    gradient.addColorStop(0, 'rgba(10, 50, 70, 0.9)'); // Very dark blue
    gradient.addColorStop(1, 'rgba(70, 30, 0, 0.9)'); // Very dark orange

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer(player) {
    ctx.fillStyle = player.color;
    ctx.shadowColor = player.color;
    ctx.shadowBlur = 25;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.shadowBlur = 0; // Reset shadow
}

function drawBackboards() {
    backboards.forEach(backboard => {
        ctx.fillStyle = backboard.color;
        ctx.beginPath();
        ctx.arc(backboard.x, backboard.y, backboard.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawDisc() {
    if (disc.thrown) {
        ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 30;
        ctx.beginPath();
        ctx.arc(disc.x, disc.y, disc.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
    } else {
        if (player1.hasDisc) {
            disc.x = player1.x + player1.width / 2;
            disc.y = player1.y + player1.height / 2;
        } else if (player2.hasDisc) {
            disc.x = player2.x + player2.width / 2;
            disc.y = player2.y + player2.height / 2;
        }
    }
}

function drawGoals() {
    goals.forEach(goal => {
        ctx.shadowColor = goal.color;
        ctx.shadowBlur = 20;
        ctx.fillStyle = goal.color;
        ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
        ctx.shadowBlur = 0;
    });
}


function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.shadowColor = obstacle.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function drawAimIndicator(player) {
    if (player.hasDisc) {
        ctx.strokeStyle = 'rgb(255, 0, 0)';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(player.x + player.width / 2, player.y + player.height / 2);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
    }
}

function drawTimer() {
    const minutes = Math.floor(timer / 60000);
    const seconds = Math.floor((timer % 60000) / 1000);
    const milliseconds = Math.floor((timer % 1000) / 10);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '30px Arial';
    ctx.fillText(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`, canvas.width / 2 - 30, 40);

    if (isInOvertime) {
        drawOvertimeIndicator();
    }
}

function drawOvertimeIndicator() {
    const overtimeMinutes = Math.floor(overtimeTimer / 60000);
    const overtimeSeconds = Math.floor((overtimeTimer % 60000) / 1000);
    const overtimeMilliseconds = Math.floor((overtimeTimer % 1000) / 10);

    ctx.fillStyle = 'red';
    ctx.font = '30px Arial';
    ctx.fillText(`OT: ${String(overtimeMinutes).padStart(2, '0')}:${String(overtimeSeconds).padStart(2, '0')}`, 485, 75);
}

function drawOvertimeRoundIndicator() {
    ctx.fillStyle = 'red';
    ctx.font = '15px Arial';
    ctx.fillText(`OT Round: ${overtimeCount + 1} / ${maxOvertimeRounds}`, 490, 95);
}

function drawScoreP1() { // draw the score for player 1
    ctx.fillStyle = '#2deeff';
    ctx.font = '40px Arial';
    ctx.fillText(`${player1Score}`, 480, 50);
}

function drawScoreP2() { // Draw the player 2 score
    ctx.fillStyle = 'orange';
    ctx.font = '40px Arial';
    ctx.fillText(` ${player2Score}`, 580, 50);
}

function isInTwoPointArea(player) {
    const areaIndex = player === player1 ? 1 : 0; // Determine which goal's area to check based on the player
    const area = twoPointAreas[areaIndex];
    return player.x >= area.x && player.x <= area.x + area.width &&
           player.y >= area.y && player.y <= area.y + area.height;
}

function checkDiscCollision() { // check if the disc hits the borders
    const distX1 = disc.x - (player1.x + player1.width / 2);
    const distY1 = disc.y - (player1.y + player1.height / 2);
    const distance1 = Math.sqrt(distX1 * distX1 + distY1 * distY1);

    if (distance1 < disc.radius + player1.width / 2) {
        player1.hasDisc = true;
        disc.thrown = false;
    }

    if (player2.active) {
        const distX2 = disc.x - (player2.x + player2.width / 2);
        const distY2 = disc.y - (player2.y + player2.height / 2);
        const distance2 = Math.sqrt(distX2 * distX2 + distY2 * distY2);

        if (distance2 < disc.radius + player2.width / 2) {
            player2.hasDisc = true;
            disc.thrown = false;
        }
    }
}

function checkObstacleCollision() {
    obstacles.forEach(obstacle => {
        if (disc.thrown) {
            // Check for collision with obstacle
            if (
                disc.x + disc.radius > obstacle.x &&
                disc.x - disc.radius < obstacle.x + obstacle.width &&
                disc.y + disc.radius > obstacle.y &&
                disc.y - disc.radius < obstacle.y + obstacle.height
            ) {
                // Determine the side of collision

                // Calculate distances to each side
                const deltaLeft = (disc.x + disc.radius) - obstacle.x;
                const deltaRight = (obstacle.x + obstacle.width) - (disc.x - disc.radius);
                const deltaTop = (disc.y + disc.radius) - obstacle.y;
                const deltaBottom = (obstacle.y + obstacle.height) - (disc.y - disc.radius);

                // Find the minimum penetration
                const minDeltaX = Math.min(deltaLeft, deltaRight);
                const minDeltaY = Math.min(deltaTop, deltaBottom);

                // Resolve collision based on the smallest penetration
                if (minDeltaX < minDeltaY) {
                    // Horizontal collision - reflect x velocity
                    if (deltaLeft < deltaRight) {
                        // Hit on the left side of obstacle
                        disc.x = obstacle.x - disc.radius; // reposition outside obstacle
                        disc.direction.x *= -1; // reflect x direction
                    } else {
                        // Hit on the right side
                        disc.x = obstacle.x + obstacle.width + disc.radius;
                        disc.direction.x *= -1;
                    }
                } else {
                    // Vertical collision - reflect y velocity
                    if (deltaTop < deltaBottom) {
                        // Hit on the top side
                        disc.y = obstacle.y - disc.radius;
                        disc.direction.y *= -1;
                    } else {
                        // Hit on the bottom side
                        disc.y = obstacle.y + obstacle.height + disc.radius;
                        disc.direction.y *= -1;
                    }
                }

                // Optional: add some energy loss for realism
                disc.direction.x *= 0.9;
                disc.direction.y *= 0.9;
            }
        }
    });
}

function checkGoalCollision() { // checks if the discs hits one of the goals
    if (disc.thrown) {
        const discHitsGoal = (goal) => {
            return disc.x + disc.radius > goal.x && disc.x - disc.radius < goal.x + goal.width &&
                   disc.y + disc.radius > goal.y && disc.y - disc.radius < goal.y + goal.height;
        };

        // Check for Player 2's goal
        if (discHitsGoal(goals[0])) {
            if (isInOvertime) {
                player2Score += 3; // Score under overtime rules
                player2ScoreSound.play();
                if (player1Score === player2Score) {
                    resetGameForOvertime();
                } else {
                    alert("Player 2 wins During OT! (SPAM ENTER)");
                    window.location.reload(); // End game and reload if Player 2 won
                }
            } else {
                // Check if Player 2 is inside the two-point area when scoring
                if (isInTwoPointArea(player2)) {
                    player2Score += 2;
                } else {
                    player2Score += 3;
                }
                player2ScoreSound.play();
                resetGame(player1);
                checkMercyWin();
            }
        }

        // Check for Player 1's goal
        if (discHitsGoal(goals[1])) {
            if (isInOvertime) {
                player1Score += 3; // Score under overtime rules
                player1ScoreSound.play();
                if (player1Score === player2Score) {
                    resetGameForOvertime();
                } else {
                    alert("Player 1 wins During OT! (SPAM ENTER)");
                    window.location.reload(); // End game and reload if Player 1 won
                }
            } else {
                // Check if Player 1 is inside the two-point area when scoring
                if (isInTwoPointArea(player1)) {
                    player1Score += 2;
                } else {
                    player1Score += 3;
                }
                player1ScoreSound.play();
                resetGame(player2);
                checkMercyWin();
            }
        }

        // Check for self-scoring conditions but doesnt work so (WIP)
        if (discHitsGoal(goals[1]) && player1.hasDisc) {
            if (isInTwoPointArea(player1)) {
                player1Score -= 2; // Deduct 2 points for self-scoring
            } else {
                player1Score -= 3; // Deduct 3 points for self-scoring
            }
            resetGame(player1);
        }

        if (discHitsGoal(goals[0]) && player2.hasDisc) {
            if (isInTwoPointArea(player2)) {
                player2Score -= 2; // Deduct 2 points for self-scoring
            } else {
                player2Score -= 3; // Deduct 3 points for self-scoring
            }
            resetGame(player2);
        }
    }
}

function resetGame(scorer) { // the game gives the disc to the player who got scored on
    disc.thrown = false;
    disc.x = scorer.x + scorer.width / 2;
    disc.y = scorer.y + scorer.height / 2;
    scorer.velocity.x = 0;
    scorer.velocity.y = 0;
    player1.velocity.x = 0;
    player1.velocity.y = 0;
    player2.velocity.x = 0;
    player2.velocity.y = 0;
    player1.hasDisc = false;
    player2.hasDisc = false;
    scorer.hasDisc = true;

    // If already in overtime, restart the timer
    if (isInOvertime) {
        clearInterval(overtimeInterval);
        startOvertime(); // Restart overtime
    }
}

function resetGameForOvertime() { // evry round resets the game to this logic
    // Reset discs and players
    disc.thrown = true;
    disc.x = canvas.width / 2; // Center the disc
    disc.y = canvas.height / 2; // Center the disc
    player1.hasDisc = false;
    player2.hasDisc = false;
    player1.velocity.x = 0;
    player1.velocity.y = 0;
    player2.velocity.x = 0;
    player2.velocity.y = 0;

    // Check how many overtimes we've had
    overtimeCount++;
    if (overtimeCount >= maxOvertimeRounds) {
        alert("Max overtime rounds reached! Final scores:");
        alert(`Player 1: ${player1Score}, Player 2: ${player2Score}`);
        window.location.reload(); // End game if max reached
    } else {
        // Start a new overtime round
        startOvertime();
    }
}

function checkMercyWin() { // mercy win checks
    if (player1Score >= player2Score + 12) {
        alert('Player 1 wins by mercy! (Mercy Win is when the player has 12 more points than you)');
        window.location.reload();
    } else if (player2Score >= player1Score + 12) {
        alert('Player 2 wins by mercy! (Mercy Win is when the player has 12 more points than you)');
        window.location.reload();
    }
}

function drawTwoPointAreas() {
    twoPointAreas.forEach((area, index) => {
        ctx.fillStyle = index === 0 ? 'rgba(45, 238, 255, 0.3)' : 'rgba(255, 165, 0, 0.3)';
        ctx.beginPath();
        ctx.arc(area.x + area.width / 2, area.y + area.height / 2, area.width / 2, 0, Math.PI * 2);
        ctx.fill();
    });
}

function checkBackboardCollision() { // colison with the backboard
    backboards.forEach(backboard => {
        if (disc.thrown) {
            const dx = disc.x - backboard.x;
            const dy = disc.y - backboard.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < disc.radius + backboard.radius) {
                const angle = Math.random() * 2 * Math.PI;
                disc.direction.x = Math.cos(angle);
                disc.direction.y = Math.sin(angle);

                const length = Math.sqrt(disc.direction.x ** 2 + disc.direction.y ** 2);
                disc.direction.x /= length;
                disc.direction.y /= length;

                const overlap = (disc.radius + backboard.radius) - distance;
                disc.x += disc.direction.x * overlap;
                disc.y += disc.direction.y * overlap;
            }
        }
    });
}

function updatePlayerMovement() {
    // Player 1 movement with arrow keys
    if (keys['ArrowUp'] && player1.velocity.y > -player1.maxSpeed) {
        player1.velocity.y -= player1.speed;
    }
    if (keys['ArrowDown'] && player1.velocity.y < player1.maxSpeed) {
        player1.velocity.y += player1.speed;
    }
    if (keys['ArrowLeft'] && player1.velocity.x > -player1.maxSpeed) {
        player1.velocity.x -= player1.speed;
    }
    if (keys['ArrowRight'] && player1.velocity.x < player1.maxSpeed) {
        player1.velocity.x += player1.speed;
    }

    // Player 2 movement with W, A, S, D keys
    if (keys['w'] && player2.velocity.y > -player2.maxSpeed) {
        player2.velocity.y -= player2.speed;
    }
    if (keys['s'] && player2.velocity.y < player2.maxSpeed) {
        player2.velocity.y += player2.speed;
    }
    if (keys['a'] && player2.velocity.x > -player2.maxSpeed) {
        player2.velocity.x -= player2.speed;
    }
    if (keys['d'] && player2.velocity.x < player2.maxSpeed) {
        player2.velocity.x += player2.speed;
    }

    // Apply friction
    player1.velocity.x *= 0.95;
    player1.velocity.y *= 0.95;
    player2.velocity.x *= 0.95;
    player2.velocity.y *= 0.95;

    // Update player positions based on velocities
    player1.x += player1.velocity.x;
    player1.y += player1.velocity.y;
    player2.x += player2.velocity.x;
    player2.y += player2.velocity.y;

    // Keep players within boundaries
    player1.x = Math.max(0, Math.min(canvas.width - player1.width, player1.x));
    player1.y = Math.max(0, Math.min(canvas.height - player1.height, player1.y));
    player2.x = Math.max(0, Math.min(canvas.width - player2.width, player2.x));
    player2.y = Math.max(0, Math.min(canvas.height - player2.height, player2.y));
}

function update() { // update game so its not just broken
    drawArenaBackground(); // Background first for consistent layering
    drawGoals();
    drawBackboards();
    checkBackboardCollision();
    drawObstacles();
    drawPlayer(player1);
    if (player2.active) drawPlayer(player2);
    drawDisc();
    drawTwoPointAreas();
    drawAimIndicator(player1);
    if (player2.active) drawAimIndicator(player2);
    drawTimer();
    drawScoreP1();
    drawScoreP2();

    // Only draw the overtime indicators if in overtime
    if (isInOvertime) {
        drawOvertimeRoundIndicator();
    }

    // Update player movement
    updatePlayerMovement();

    // Disc movement logic
    if (disc.thrown) {
        disc.x += disc.direction.x * disc.speed;
        disc.y += disc.direction.y * disc.speed;

        // Bounce off walls
        if (disc.x - disc.radius < 0 || disc.x + disc.radius > canvas.width) {
            disc.direction.x *= -1;
        }
        if (disc.y - disc.radius < 0 || disc.y + disc.radius > canvas.height) {
            disc.direction.y *= -1;
        }
    }

    // Collision checks
    checkDiscCollision();
    checkObstacleCollision();
    checkGoalCollision();
}

function throwDisc() { // the throw disc func
    if (!disc.thrown && (player1.hasDisc || player2.hasDisc)) {
        const player = player1.hasDisc ? player1 : player2;
        const angle = Math.atan2(mouseY - (player.y + player.height / 2), mouseX - (player.x + player.width / 2));
        disc.direction.x = Math.cos(angle);
        disc.direction.y = Math.sin(angle);
        disc.x = player.x + player.width / 2 + disc.direction.x * (disc.radius + 5);
        disc.y = player.y + player.height / 2 + disc.direction.y * (disc.radius + 5);
        disc.thrown = true;
        throwSound.play();
        player1.hasDisc = false;
        player2.hasDisc = false;

        // Change the disc color based on the player throwing it
        if (player === player1) {
            disc.color = goals[0].color; // Player 1's color not player color
        } else {
            disc.color = goals[1].color; // Player 2's color not player color
        }
    }
}

function startOvertime() { // OT FUNC
    isInOvertime = true;
    overtimeTimer = overtimeDuration; // Reset the overtime timer
    clearInterval(overtimeInterval); // Clear the previous interval
    overtimeInterval = setInterval(() => {
        overtimeTimer -= 100; // Decrease timer by 100 milliseconds
        if (overtimeTimer <= 0) {
            clearInterval(overtimeInterval);
            if (player1Score === player2Score) {
                alert("starting another OT round!");
                resetGameForOvertime(); // Start a new overtime if still tied
            }
        }
    }, 100);
}

canvas.addEventListener('mousemove', (event) => { // finding mouse position
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
});

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
    if (event.key === ' ') { // throw disc when hit space key
        throwDisc();
    }
    if (event.key === '2') {
        player2.active = true; // Activate Player 2 even though p2 is always active
    }
});

document.addEventListener('keyup', (event) => { // keyup means key response
    keys[event.key] = false;
});

// Timer function
function startTimer() {
    timerInterval = setInterval(() => {
        timer -= 100; // Decrease timer by 100 milliseconds
        if (timer <= 0) {
            clearInterval(timerInterval);
            timer = 0; // Stop at 0

            // If scores are tied at the end of regulation, start overtime
            if (player1Score === player2Score) {
                startOvertime();
            } else { // Win alerts
                alert(player1Score > player2Score 
                    ? 'Player 1 wins! ' 
                    : 'Player 2 wins! ');
                window.location.reload(); // Reload after alert
            }
        }
    }, 100);
}

startTimer(); // timer starts
setInterval(update, 1000 / 60); // FPS baisicly