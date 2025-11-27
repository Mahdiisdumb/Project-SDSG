// === Plugin Panel ===
const pluginPanel = document.createElement('div');
pluginPanel.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    width: 250px;
    max-height: 400px;
    overflow-y: auto;
    background: #161b22;
    border: 2px dashed #58a6ff;
    border-radius: 10px;
    padding: 10px;
    z-index: 10000;
    color: #c9d1d9;
    font-family: 'Courier New', monospace;
    display: none;
`;

// Panel header
const panelHeader = document.createElement('div');
panelHeader.style.cssText = 'display:flex;justify-content:space-between;align-items:center';

const panelTitle = document.createElement('h3');
panelTitle.textContent = 'Plugins';
panelTitle.style.color = '#58a6ff';
panelTitle.style.margin = '0';
panelHeader.appendChild(panelTitle);

const panelCloseBtn = document.createElement('button');
panelCloseBtn.textContent = 'X';
panelCloseBtn.style.cssText = `
    background: #0d1117;
    color: #58a6ff;
    border: 1px dashed #58a6ff;
    border-radius: 4px;
    cursor: pointer;
`;
panelCloseBtn.onclick = () => pluginPanel.style.display = 'none';
panelHeader.appendChild(panelCloseBtn);

pluginPanel.appendChild(panelHeader);

// Plugin list container
const pluginListContainer = document.createElement('div');
pluginListContainer.style.marginTop = '10px';
pluginPanel.appendChild(pluginListContainer);

// Function to render plugin list
function renderPluginList() {
    pluginListContainer.innerHTML = '';
    pluginManager.listPlugins().forEach(name => {
        const isActive = pluginManager.isActive(name);

        const item = document.createElement('div');
        item.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
            padding: 5px;
            border-radius: 6px;
            background: ${isActive ? '#58a6ff' : '#21262d'};
            color: ${isActive ? '#0d1117' : '#c9d1d9'};
        `;

        const label = document.createElement('span');
        label.textContent = name;

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = isActive ? 'Disable' : 'Enable';
        toggleBtn.style.cssText = `
            background: #0d1117;
            color: #58a6ff;
            border: 1px dashed #58a6ff;
            border-radius: 4px;
            cursor: pointer;
        `;
        toggleBtn.onclick = () => {
            pluginManager.togglePlugin(name);
            renderPluginList(); // refresh after toggling
        };

        item.appendChild(label);
        item.appendChild(toggleBtn);
        pluginListContainer.appendChild(item);
    });
}

// Refresh plugin list every 0.5s
setInterval(renderPluginList, 500);

// Show panel button
const showPluginPanelBtn = document.createElement('button');
showPluginPanelBtn.textContent = 'Plugins';
showPluginPanelBtn.style.cssText = `
    position: fixed;
    bottom: 60px;
    left: 20px;
    z-index: 10000;
    background: #0d1117;
    color: #58a6ff;
    border: 2px dashed #58a6ff;
    border-radius: 6px;
    padding: 5px 10px;
    cursor: pointer;
`;
showPluginPanelBtn.onclick = () => pluginPanel.style.display = 'block';

document.body.appendChild(pluginPanel);
document.body.appendChild(showPluginPanelBtn);
