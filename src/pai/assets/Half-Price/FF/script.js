// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Check if canvas and context were successfully obtained
if (!canvas || !ctx) {
    console.error("Error: Could not get canvas or 2D context. Make sure your HTML has a <canvas id='gameCanvas'> element.");
    // You might want to display an error message to the user here
} else {
    // Load sounds
    const resSound = new Audio('./revive.mp3');
    const killSound = new Audio('./kill.mp3');

    // Load images
    const bulletImage = new Image();
    bulletImage.src = './Crowbar.png'; // your bullet image path

    const giantEnemyImage = new Image(); // Image for the giant enemy
    giantEnemyImage.src = './b.png'; // your giant enemy image path

    // Wait for images to load before starting game
    let assetsLoaded = 0;
    const totalAssetsToLoad = 2; // We have 2 images (bullet, giant enemy)

    function assetLoaded() {
        assetsLoaded++;
        if (assetsLoaded === totalAssetsToLoad) {
            startGame();
        }
    }

    bulletImage.onload = assetLoaded;
    giantEnemyImage.onload = assetLoaded;

    // Handle potential image loading errors (optional but recommended)
    bulletImage.onerror = () => {
        console.error("Error loading bullet image:", bulletImage.src);
        // Handle this error - maybe prevent the game from starting or use a fallback
    };
    giantEnemyImage.onerror = () => {
        console.error("Error loading giant enemy image:", giantEnemyImage.src);
        // Handle this error
    };

    // Game variables
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
            color: '#fb7e14',
            defultColor: '#fb7e14', // add this line
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
            color: '#262c6a',
            defaultColor: '#262c6a', // add this line
            controls: { up: 'w', down: 's', left: 'a', right: 'd', shoot: 'e' },
            score: 0
        }
    ];

    const keys = {};
    let giantEnemy = null; // Variable to hold the single giant enemy
    const GIANT_ENEMY_HEALTH = 500; // Health of the giant enemy
    let totalScore = 0;
    let highScore = localStorage.getItem('highScore') || 0;
    let paused = false;

    function startGame() {
        console.log("All assets loaded. Starting game.");
        spawnGiantEnemy(); // Spawn the first giant enemy at the start
        update(); // Start the game loop
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
                // Check if bullet image is loaded before drawing
                if (bulletImage.complete && bulletImage.naturalHeight !== 0) {
                     ctx.drawImage(bulletImage, bullet.x, bullet.y, bullet.width, bullet.height);
                } else {
                    // Fallback if image is not loaded (optional)
                    ctx.fillStyle = 'yellow';
                    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
                }

                bullet.y -= bullet.speed;
                if (bullet.y + bullet.height < 0) {
                    player.bullets.splice(bIndex, 1);
                } else {
                    // Check collision with the giant enemy
                    if (giantEnemy &&
                        bullet.x < giantEnemy.x + giantEnemy.width &&
                        bullet.x + bullet.width > giantEnemy.x &&
                        bullet.y < giantEnemy.y + giantEnemy.height &&
                        bullet.y + bullet.height > giantEnemy.y
                    ) {
                        giantEnemy.health--;
                        player.bullets.splice(bIndex, 1);
                        if (giantEnemy.health <= 0) {
                            player.score += 100; // Award points for defeating the boss
                            totalScore += 100;
                            giantEnemy = null; // Remove the giant enemy

                            if (totalScore > highScore) {
                                highScore = totalScore;
                                localStorage.setItem('highScore', highScore);
                            }
                            // Check if killSound is loaded before playing
                            if (killSound) {
                                killSound.play(); // Play kill sound on boss defeat
                            } else {
                                console.warn("Kill sound not loaded.");
                            }
                            spawnGiantEnemy(); // Spawn a new giant enemy
                        }
                    }
                }
            });
        });
    }

    // Draw giant enemy
    function drawGiantEnemy() {
        if (!giantEnemy) return;

        // Check if giant enemy image is loaded before drawing
        if (giantEnemyImage.complete && giantEnemyImage.naturalHeight !== 0) {
            ctx.drawImage(giantEnemyImage, giantEnemy.x, giantEnemy.y, giantEnemy.width, giantEnemy.height);
        } else {
            // Fallback if image is not loaded (optional)
            ctx.fillStyle = 'purple';
            ctx.fillRect(giantEnemy.x, giantEnemy.y, giantEnemy.width, giantEnemy.height);
        }


        // Draw health bar
        const healthBarWidth = giantEnemy.width;
        const healthBarHeight = 10;
        const healthPercentage = giantEnemy.health / GIANT_ENEMY_HEALTH;
        ctx.fillStyle = 'red';
        ctx.fillRect(giantEnemy.x, giantEnemy.y - healthBarHeight - 5, healthBarWidth, healthBarHeight);
        ctx.fillStyle = 'lime';
        ctx.fillRect(giantEnemy.x, giantEnemy.y - healthBarHeight - 5, healthBarWidth * healthPercentage, healthBarHeight);
        ctx.strokeStyle = '#fff';
        ctx.strokeRect(giantEnemy.x, giantEnemy.y - healthBarHeight - 5, healthBarWidth, healthBarHeight);

        moveGiantEnemy();
        checkCollisionWithPlayers(giantEnemy);
    }

    // Giant enemy chases nearest player
    function moveGiantEnemy() {
        const alivePlayers = players.filter(p => p.alive);
        if (alivePlayers.length === 0) return;
        let closestPlayer = null;
        let minDist = Infinity;
        alivePlayers.forEach(p => {
            const dist = Math.hypot(p.x - giantEnemy.x, p.y - giantEnemy.y);
            if (dist < minDist) {
                minDist = dist;
                closestPlayer = p;
            }
        });
        if (closestPlayer) {
            const angle = Math.atan2(closestPlayer.y - giantEnemy.y, closestPlayer.x - giantEnemy.x);
            giantEnemy.x += giantEnemy.speed * Math.cos(angle);
            giantEnemy.y += giantEnemy.speed * Math.sin(angle);
        }
    }

    // Check collision with players (only for the giant enemy)
    function checkCollisionWithPlayers(enemy) {
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
            width: 20, // Adjust bullet width/height to match image if needed
            height: 40,
            speed: 7
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
                    // Check if resSound is loaded before playing
                    if (resSound) {
                         resSound.play();
                    } else {
                        console.warn("Revive sound not loaded.");
                    }
                    player.color = player.defaultColor; // Reset color to default
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

    // Spawn the giant enemy
    function spawnGiantEnemy() {
        if (!giantEnemy) {
            const enemyWidth = 100; // Giant enemy size
            const enemyHeight = 100;
            const x = Math.random() * (canvas.width - enemyWidth);
            const speed = 1; // Giant enemy speed
            giantEnemy = { x, y: 0, width: enemyWidth, height: enemyHeight, speed, health: GIANT_ENEMY_HEALTH };
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
        drawGiantEnemy(); // Only draw the giant enemy
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

    // The game starts in the assetLoaded function
} // End of the else block for canvas check
update();