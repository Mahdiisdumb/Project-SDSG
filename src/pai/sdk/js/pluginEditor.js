// === Plugin Editor Container ===
const pluginEditorContainer = document.createElement('div');
pluginEditorContainer.style.marginTop = '10px';
pluginEditorContainer.style.padding = '10px';
pluginEditorContainer.style.background = '#21262d';
pluginEditorContainer.style.border = '1px dashed #58a6ff';
pluginEditorContainer.style.borderRadius = '6px';

const pluginEditorTitle = document.createElement('h3');
pluginEditorTitle.textContent = 'Plugin Editor';
pluginEditorTitle.style.color = '#58a6ff';
pluginEditorContainer.appendChild(pluginEditorTitle);

// Plugin Code Input
const pluginCodeInput = document.createElement('textarea');
pluginCodeInput.placeholder = 'Enter plugin code here. Must return a disable function!';
pluginCodeInput.style.width = '100%';
pluginCodeInput.style.height = '100px';
pluginCodeInput.style.background = '#0d1117';
pluginCodeInput.style.color = '#c9d1d9';
pluginCodeInput.style.border = '1px dashed #58a6ff';
pluginCodeInput.style.marginBottom = '5px';
pluginEditorContainer.appendChild(pluginCodeInput);

// Plugin Name Input
const pluginNameInput = document.createElement('input');
pluginNameInput.placeholder = 'Plugin Name';
pluginNameInput.style.width = '100%';
pluginNameInput.style.marginBottom = '5px';
pluginEditorContainer.appendChild(pluginNameInput);

// Add Plugin Button
const addPluginBtn = document.createElement('button');
addPluginBtn.textContent = 'Add Plugin';
addPluginBtn.style.width = '100%';
addPluginBtn.style.cursor = 'pointer';
pluginEditorContainer.appendChild(addPluginBtn);

document.body.appendChild(pluginEditorContainer);

// === Add Plugin Logic ===
addPluginBtn.onclick = () => {
    const name = pluginNameInput.value.trim();
    const code = pluginCodeInput.value.trim();
    if (!name || !code) return alert('Enter both plugin name and code!');

    try {
        // Wrap code in a function that returns a disable function
        const fn = new Function('editor', 'preview', `
            const disable = (function(){
                ${code}
            })();
            return disable;
        `);

        // Register plugin in PluginManager (disabled by default)
        pluginManager.registerPlugin(name, 'User-added plugin', fn);

        // Clear inputs
        pluginNameInput.value = '';
        pluginCodeInput.value = '';

        // Refresh plugin panel
        renderPluginList();

        // Optional: achievement progress
        if (typeof Achievements !== 'undefined') Achievements.progress('pluginCreator');

        alert(`Plugin "${name}" added!`);

    } catch (err) {
        console.error(err);
        alert('Error in plugin code: ' + err.message);
    }
};
