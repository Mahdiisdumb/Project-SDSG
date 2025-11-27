// Get the canvas element and set its dimensions
const canvas = document.getElementById('raycasterCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the map and other constants
const map = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
];
const tileSize = 64;
const numRays = 120;
const fov = Math.PI / 6; // Field of view
const halfFov = fov / 3;
const maxDepth = 1000;

// Player object
let player = {
    x: tileSize * 1.5,
    y: tileSize * 1.5,
    angle: 0,
    speed: 3
};

// Function to check for wall collisions
function isWall(x, y) {
    const mapX = Math.floor(x / tileSize);
    const mapY = Math.floor(y / tileSize);
    return map[mapY] && map[mapY][mapX] === 1; // Ensure map boundaries are respected
}

// Function to cast rays and render the 3D view
function castRays() {
    for (let i = 0; i < numRays; i++) {
        const rayAngle = (player.angle - halfFov) + (i / numRays) * fov;
        const ray = { x: player.x, y: player.y, angle: rayAngle };

        for (let depth = 0; depth < maxDepth; depth++) {
            ray.x += Math.cos(ray.angle);
            ray.y += Math.sin(ray.angle);

            // Check for wall collision
            if (isWall(ray.x, ray.y)) {
                const distance = Math.sqrt((ray.x - player.x) ** 2 + (ray.y - player.y) ** 2);
                const wallHeight = (tileSize / distance) * 277;

                // Draw the wall in the 3D view
                ctx.fillStyle = 'rgba(255, 255, 255, 1)';
                ctx.fillRect(
                    (canvas.width / 2) + (i * (canvas.width / (2 * numRays))),
                    (canvas.height / 2) - (wallHeight / 2),
                    (canvas.width / (2 * numRays)),
                    wallHeight
                );
                break; // Stop checking further for this ray
            }
        }

        // Draw the ray in the 2D view
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(player.x, player.y);
        ctx.lineTo(ray.x, ray.y);
        ctx.stroke();
    }
}

// Handle player movement with collision detection
function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;

    // Check for wall collision before moving
    if (!isWall(newX, player.y)) {
        player.x = newX;
    }
    if (!isWall(player.x, newY)) {
        player.y = newY;
    }
}

// Event listener for keydown to move the player
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w': // Move forward
            movePlayer(Math.cos(player.angle) * player.speed, Math.sin(player.angle) * player.speed);
            break;
        case 's': // Move backward
            movePlayer(-Math.cos(player.angle) * player.speed, -Math.sin(player.angle) * player.speed);
            break;
        case 'a': // Turn left
            player.angle -= 0.1;
            break;
        case 'd': // Turn right
            player.angle += 0.1;
            break;
        case 'ArrowLeft': // Strafe left
            movePlayer(-Math.sin(player.angle) * player.speed, Math.cos(player.angle) * player.speed);
            break;
        case 'ArrowRight': // Strafe right
            movePlayer(Math.sin(player.angle) * player.speed, -Math.cos(player.angle) * player.speed);
            break;
    }
});

// Clear the screen function
function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Main game loop function
function gameLoop() {
    clearScreen();

    // Draw 2D map and player on the left side
    ctx.fillStyle = 'gray';
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 1) {
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
    }

    // Draw player
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x - 5, player.y - 5, 10, 10); // Player representation

    // Cast rays for 3D view on the right side
    castRays();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();