const Achievements = (function () {
    const storageKey = 'SDSG_Achievements';
    let achievements = {};
    function load() {
        const saved = localStorage.getItem(storageKey);
        if (saved) { try { achievements = JSON.parse(saved); } catch { achievements = {}; } }
    }
    function save() { localStorage.setItem(storageKey, JSON.stringify(achievements)); }
    function register(id, { name, description, icon }) { if (!achievements[id]) achievements[id] = { unlocked: false, name, description, icon: icon || '', progress: 0 }; }
    function unlock(id) { if (achievements[id] && !achievements[id].unlocked) { achievements[id].unlocked = true; save(); showNotification(`🎉 Achievement Unlocked: ${achievements[id].name}`); } }
    function progress(id, amount = 1, target = 1) { if (achievements[id] && !achievements[id].unlocked) { achievements[id].progress = (achievements[id].progress || 0) + amount; if (achievements[id].progress >= target) unlock(id); else save(); } }
    function isUnlocked(id) { return achievements[id] && achievements[id].unlocked; }
    function getAll() { return achievements; }
    function reset() { achievements = {}; save(); }
    function showNotification(msg) {
        const toast = document.createElement('div'); toast.textContent = msg;
        toast.style.position = 'fixed'; toast.style.top = '10px'; toast.style.right = '10px';
        toast.style.background = '#58a6ff'; toast.style.color = '#0d1117';
        toast.style.padding = '10px'; toast.style.borderRadius = '6px';
        toast.style.zIndex = 9999; toast.style.boxShadow = '0 0 10px #000';
        document.body.appendChild(toast); setTimeout(() => document.body.removeChild(toast), 4000);
    }
    load();
    return { register, unlock, progress, isUnlocked, getAll, reset };
})();
