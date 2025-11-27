const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const inventory = document.getElementById('inventory');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game variables
const blockSize = 50;
const blocks = [];
const blockTypes = {
    dirt: '#8B4513',
    grass: '#228B22',
    stone: '#808080',
    wood: '#DEB887',
    ruby: '#Ff0000',
    emarald: '#00ff00',
    dimond: '#B9F2FF',
    coal: '#151716',
    clay: '#B66A50',
    purp: '#800080',
    shit: '#5A3D37',
    iron: 'lightgrey',
    orange: 'orange',
    echounito: '#C58615',
    echounit: '#01aae1',
    echogoalb: '#2deeff',
    echodisc: 'white',
};

// Camera position
let cameraX = 0;
let cameraY = 0;

// Mouse position
let mouseX = 0;
let mouseY = 0;

// Selected block
let selectedBlock = 'dirt';

// Save game function
function saveGame() {
    const gameState = {
        blocks: blocks,
        cameraX: cameraX,
        cameraY: cameraY
    };
    localStorage.setItem('gameState2D', JSON.stringify(gameState));
    console.log('Game saved!');
}

// Load game function
function loadGame() {
    const savedState = localStorage.getItem('gameState2D');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        blocks.length = 0;
        blocks.push(...gameState.blocks);
        cameraX = gameState.cameraX;
        cameraY = gameState.cameraY;
        console.log('Game loaded!');
    }
}

// Auto-save functionality
function autoSave() {
    saveGame();
}

// Set up auto-save interval
setInterval(autoSave, 30000);

// Create inventory UI
Object.entries(blockTypes).forEach(([type, color]) => {
    const blockElement = document.createElement('button');
    blockElement.className = 'block-select';
    blockElement.style.backgroundColor = color;
    blockElement.onclick = () => {
        document.querySelectorAll('.block-select').forEach(el => el.classList.remove('selected'));
        blockElement.classList.add('selected');
        selectedBlock = type;
    };
    inventory.appendChild(blockElement);
});

// Place initial ground
for (let x = -20; x < 20; x++) {
    blocks.push({
        x: x * blockSize,
        y: 300,
        type: 'grass'
    });
}

function breakNearestBlock(x, y) {
    const gridX = Math.floor((x + cameraX) / blockSize) * blockSize;
    const gridY = Math.floor((y + cameraY) / blockSize) * blockSize;
    
    const index = blocks.findIndex(block => 
        block.x === gridX && 
        block.y === gridY
    );
    
    if (index !== -1) {
        blocks.splice(index, 1);
        autoSave();
    }
}

// Game loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#87CEEB'; // Sky color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw blocks
    blocks.forEach(block => {
        ctx.fillStyle = blockTypes[block.type];
        ctx.fillRect(
            block.x - cameraX,
            block.y - cameraY,
            blockSize,
            blockSize
        );
        
        // Add outline to blocks
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeRect(
            block.x - cameraX,
            block.y - cameraY,
            blockSize,
            blockSize
        );
    });

    // Draw hover outline
    const hoverX = Math.floor((mouseX + cameraX) / blockSize) * blockSize - cameraX;
    const hoverY = Math.floor((mouseY + cameraY) / blockSize) * blockSize - cameraY;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.strokeRect(hoverX, hoverY, blockSize, blockSize);

    requestAnimationFrame(draw);
}

// Track mouse position
canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Handle mouse click for placing blocks
canvas.addEventListener('click', (e) => {
    const x = Math.floor((e.clientX + cameraX) / blockSize) * blockSize;
    const y = Math.floor((e.clientY + cameraY) / blockSize) * blockSize;

    if (e.button === 0) { // Left click to place
        const existingBlock = blocks.find(block => block.x === x && block.y === y);
        if (!existingBlock) {
            blocks.push({
                x: x,
                y: y,
                type: selectedBlock
            });
            autoSave();
        }
    }
});

// Handle keyboard controls
window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            cameraX -= 10;
            break;
        case 'ArrowRight':
            cameraX += 10;
            break;
        case 'ArrowUp':
            cameraY -= 10;
            break;
        case 'ArrowDown':
            cameraY += 10;
            break;
        case 'b':
            breakNearestBlock(mouseX, mouseY);
            break;
    }
});

// Set up save/load button listeners
document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveButton');
    const loadButton = document.getElementById('loadButton');

    saveButton.addEventListener('click', saveGame);
    loadButton.addEventListener('click', loadGame);
});

// Start game
draw();
// Add at the top with other variables
let showingSaveIndicator = false;

// Add this function
function showSaveIndicator() {
    const indicator = document.createElement('div');
    indicator.textContent = 'Auto Saving...';
    indicator.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        transition: opacity 0.5s;
    `;
    document.body.appendChild(indicator);
    
    setTimeout(() => {
        indicator.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(indicator);
        }, 500);
    }, 1500);
}

// Modify the autoSave function
function autoSave() {
    saveGame();
    showSaveIndicator();
}

// Modify the saveGame function
function saveGame() {
    const gameState = {
        blocks: blocks,
        cameraX: cameraX,
        cameraY: cameraY
    };
    localStorage.setItem('gameState2D', JSON.stringify(gameState));
    showSaveIndicator();
}
