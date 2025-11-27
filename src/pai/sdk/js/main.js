// --- Template dropdown ---
const templateSelect = document.getElementById('templateSelect');
function updateTemplateDropdown() {
    templateSelect.innerHTML = '';
    Object.keys(sdk.templates).forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        templateSelect.appendChild(opt);
    });
}
updateTemplateDropdown();

templateSelect.addEventListener('change', () => sdk.loadTemplate(templateSelect.value));

// --- Export achievements ---
let projectCount = 0;
document.getElementById('exportBtn').addEventListener('click', () => {
    const name = document.getElementById('gameName').value.trim() || 'MyGame';
    sdk.exportGame(name);
    Achievements.unlock('firstExport');

    projectCount++;
    if (projectCount >= 1) Achievements.unlock('gameMaker');
    if (projectCount >= 10) Achievements.unlock('sdkVeteran');
});

// --- Asset uploader ---
document.getElementById('assetUploader').addEventListener('change', e => {
    Array.from(e.target.files).forEach(file => sdk.addAsset(file.name, file));
    alert(`${e.target.files.length} asset(s) added!`);
});

// --- Code achievements tracking ---
let stats = {
    lines: 0,
    functions: 0,
    loops: 0,
    conditionals: 0,
    arrays: 0,
    objects: 0,
    eventListeners: 0,
    domManip: 0,
    pluginsUsed: 0,
    bugFixes: 0,
    automation: 0,
};
// --- Copy / Paste / Script Kidde ---
const SCRIPT_KIDDE_PASTES_REQUIRED = 5;

function countOccurrences(regex, text) {
    const matches = text.match(regex);
    return matches ? matches.length : 0;
}

sdk.editor.addEventListener('input', () => {
    const code = sdk.editor.value;

    // --- Basic ---
    stats.lines = code.split('\n').length;
    if (stats.lines >= 100) Achievements.unlock('hundredLines');
    if (/<[a-z][\s\S]*>/i.test(code)) Achievements.unlock('firstHTML');
    if (/<style>/.test(code) || /[{}]/.test(code)) Achievements.unlock('firstCSS');
    if (/[^;]+;/.test(code)) Achievements.unlock('firstJS');

    // --- Intermediate ---
    const funcs = countOccurrences(/\bfunction\b/g, code);
    if (funcs > stats.functions) {
        stats.functions = funcs;
        if (funcs >= 1) Achievements.unlock('firstFunction');
        if (funcs >= 5) Achievements.unlock('fiveFunctions');
        if (funcs >= 100) Achievements.unlock('hundredFunctions');
    }

    const loops = countOccurrences(/\b(for|while)\b/g, code);
    if (loops > stats.loops) {
        stats.loops = loops;
        if (loops >= 1) Achievements.unlock('firstLoop');
        if (loops >= 10) Achievements.unlock('tenLoops');
        if (loops >= 100) Achievements.unlock('oneHundredLoops');
    }

    const conditionals = countOccurrences(/\bif\b|\belse\b/g, code);
    if (conditionals > stats.conditionals) {
        stats.conditionals = conditionals;
        if (conditionals >= 1) Achievements.unlock('firstConditional');
    }

    const arrays = countOccurrences(/\[.*?\]/g, code);
    if (arrays > stats.arrays) {
        stats.arrays = arrays;
        if (arrays >= 1) Achievements.unlock('firstArray');
    }

    const objects = countOccurrences(/\{.*?\}/g, code);
    if (objects > stats.objects) {
        stats.objects = objects;
        if (objects >= 1) Achievements.unlock('firstObject');
    }

    const events = countOccurrences(/addEventListener\s*\(/g, code);
    if (events > stats.eventListeners) {
        stats.eventListeners = events;
        if (events >= 1) Achievements.unlock('firstEvent');
    }

    const domManip = countOccurrences(/document\.(getElementById|querySelector|createElement|appendChild|innerHTML|textContent)/g, code);
    if (domManip > stats.domManip) {
        stats.domManip = domManip;
        if (domManip >= 1) Achievements.unlock('firstDOM');
    }

    // --- Advanced ---
    if (/fetch\s*\(/.test(code)) Achievements.unlock('apiExplorer');
    if (/setInterval|setTimeout/.test(code)) Achievements.unlock('automationWizard');
    if (/<html>[\s\S]*<style>[\s\S]*<script>/.test(code)) Achievements.unlock('fullStack');
    if (/canvas|getContext|requestAnimationFrame|gradient/.test(code)) Achievements.unlock('creativeCoding');

    // --- Expert / Challenge achievements ---
    // Bug fixes need to be triggered manually via a function
});

// --- Copy / Paste ---
sdk.editor.addEventListener('paste', () => {
    scriptKiddePasteCount++;

    // Unlock Script Kidde after 5 pastes
    if (scriptKiddePasteCount >= SCRIPT_KIDDE_PASTES_REQUIRED) {
        Achievements.unlock('scriptKidde');
    }

    // Always unlock basic copy/paste achievement
    Achievements.unlock('copyPaste');
});

// --- Plugin usage ---
function trackPluginUsage() {
    stats.pluginsUsed++;
 
    if (stats.pluginsUsed >= 1) Achievements.unlock('pluginCreator');
}

// --- Bug fixes ---
function trackBugFix() {
    stats.bugFixes++;
    if (stats.bugFixes >= 1) Achievements.unlock('debugger');
    if (stats.bugFixes >= 50) Achievements.unlock('masterDebugger');
}

// --- Load default template ---
sdk.loadTemplate(templateSelect.value || Object.keys(sdk.templates)[0]);
