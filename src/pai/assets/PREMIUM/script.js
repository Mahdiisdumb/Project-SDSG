(function () {
    const premiumGames = ['Baldis Plus', 'Baldis Baisics', 'bergentruck', 'Deltatraveler', 'karlson', 'Minesweeper plus', 'OG FNF', 'People Playground', 'Pizza Tower', 'raft', 'slender' 'Sonic.EXE', 'UCN', 'Ultra Kill', 'UNDERTALE AND DELTARUNE']; const copyBtn = document.getElementById('copyEmailBtn'); if (copyBtn) { copyBtn.addEventListener('click', () => { const template = document.getElementById('email - template').innerText; navigator.clipboard.writeText(template).then(() => alert('Email template copied!')) }) }
    const activateBtn = document.getElementById('activateBtn'); if (activateBtn) activateBtn.addEventListener('click', activatePremiumWithCaesar); const checkPaidBtn = document.getElementById('checkPaidBtn'); if (checkPaidBtn) checkPaidBtn.addEventListener('click', checkPremiumStatus); function renderPremiumGames() {
        const container = document.getElementById('premiumGamesContainer'); if (!container) return; container.innerHTML = ''; const isPremium = localStorage.getItem('sdsd-premium') === 'active'; premiumGames.forEach(name => {
            const btn = document.createElement('button'); btn.textContent = name; if (isPremium) { btn.classList.add('unlocked'); btn.disabled = !1; btn.addEventListener('click', () => { window.location.href = `assets/huh/stealer leave/there is nothing pay then you get/what are you doing/STOP/i cant understand/security left/${name}/run.html` }) } else { btn.classList.add('locked'); btn.disabled = !0; btn.addEventListener('click', (e) => e.preventDefault()) }
            container.appendChild(btn)
        })
    }
    function activatePremiumWithCaesar() {
        const inputEl = document.getElementById('premiumCodeInput'); if (!inputEl) return; const userInput = inputEl.value.trim(); if (!userInput) { alert('Please enter a code'); return }
        const decoded = (window.Deobf && typeof window.Deobf.getDecodedCode === 'function') ? window.Deobf.getDecodedCode() : null; if (!decoded) { alert('Activation unavailable (deobfuscation error).'); return }
        if (userInput === decoded) { localStorage.setItem('sdsd-premium', 'active'); unlockPremium(); alert('Premium unlocked! Enjoy the games.') } else { alert('Invalid code.') }
    }
    function checkPremiumStatus() { if (localStorage.getItem('sdsd-premium') === 'active') { unlockPremium() } else { alert('Premium not active yet.') } }
    function unlockPremium() { const codeDiv = document.getElementById('premiumCodeSection'); if (codeDiv && codeDiv.parentNode) codeDiv.parentNode.removeChild(codeDiv); const instr = document.getElementById('instructions'); if (instr && instr.parentNode) instr.parentNode.removeChild(instr); renderPremiumGames() }
    document.addEventListener('DOMContentLoaded', () => { renderPremiumGames(); if (localStorage.getItem('sdsd-premium') === 'active') unlockPremium(); }); window.checkPremiumStatus = checkPremiumStatus
})()