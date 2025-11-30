document.getElementById("back").onclick = function () {
    location.href = "../load.html"; // Redirects to the parent directory and then to load.html
};
document.getElementById("MS").onclick = function () {
    location.href = "MS/run.html"; // Redirects to the parent directory and then to load.html
};
        // Simple page controls: back navigation and open maintainer repo/page
        document.getElementById('back')?.addEventListener('click', () => history.back());
        document.getElementById('github')?.addEventListener('click', () => {
        // Open the maintainer's repository or homepage in a new tab
        window.open('https://github.com/Mahdiisdumb/Project-SDSG', '_blank', 'noopener');
        });
