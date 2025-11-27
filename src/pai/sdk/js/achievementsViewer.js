// === Achievements Viewer Panel ===
const achievementsContainer = document.createElement('div');
Object.assign(achievementsContainer.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    width: '300px',
    maxHeight: '400px',
    overflowY: 'auto',
    background: '#161b22',
    border: '2px dashed #58a6ff',
    borderRadius: '10px',
    padding: '10px',
    zIndex: '10000',
    color: '#c9d1d9',
    fontFamily: 'Courier New, monospace',
    display: 'none', // hidden by default
});

// === Header with Toggle Button ===
const header = document.createElement('div');
Object.assign(header.style, {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

const title = document.createElement('h3');
title.textContent = 'Achievements';
Object.assign(title.style, {
    margin: '0',
    color: '#58a6ff',
    fontSize: '16px',
});

const toggleBtn = document.createElement('button');
toggleBtn.textContent = 'X';
Object.assign(toggleBtn.style, {
    background: '#0d1117',
    color: '#58a6ff',
    border: '1px dashed #58a6ff',
    borderRadius: '4px',
    cursor: 'pointer',
});
toggleBtn.onclick = () => achievementsContainer.style.display = 'none';

header.appendChild(title);
header.appendChild(toggleBtn);
achievementsContainer.appendChild(header);

// === Achievements List Container ===
const listContainer = document.createElement('div');
listContainer.style.marginTop = '10px';
achievementsContainer.appendChild(listContainer);

// === Render Achievements ===
function renderAchievements() {
    listContainer.innerHTML = '';
    const all = Achievements.getAll();
    Object.values(all).forEach(ach => {
        const item = document.createElement('div');
        Object.assign(item.style, {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '5px',
            background: ach.unlocked ? '#58a6ff' : '#21262d',
            color: ach.unlocked ? '#0d1117' : '#c9d1d9',
            borderRadius: '6px',
            padding: '5px',
        });

        const icon = document.createElement('span');
        icon.textContent = ach.icon || '🏆';
        icon.style.marginRight = '5px';

        const text = document.createElement('div');
        text.innerHTML = `<strong>${ach.name}</strong><br><small>${ach.description}</small>`;
        text.style.fontSize = '12px';

        item.appendChild(icon);
        item.appendChild(text);
        listContainer.appendChild(item);
    });
}

// Refresh periodically
setInterval(renderAchievements, 1);

// === Button to Open Viewer ===
const showBtn = document.createElement('button');
showBtn.textContent = 'Achievements';
Object.assign(showBtn.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: '10000',
    background: '#0d1117',
    color: '#58a6ff',
    border: '2px dashed #58a6ff',
    borderRadius: '6px',
    padding: '5px 10px',
    cursor: 'pointer',
});
showBtn.onclick = () => achievementsContainer.style.display = 'block';

document.body.appendChild(achievementsContainer);
document.body.appendChild(showBtn);
