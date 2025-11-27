document.getElementById("h").onclick = function () {
    location.href = "./HP/run.html"; // Redirects to the parent directory and then to load.html
};
document.getElementById("d").onclick = function () {
    location.href = "./DC/run.html"; // Redirects to the parent directory and then to load.html
};
document.getElementById("f").onclick = function () {
    location.href = "./FF/run.html"; // Redirects to the parent directory and then to load.html
};
// Create a black overlay
const overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = '100vw';
overlay.style.height = '100vh';
overlay.style.background = 'black';
overlay.style.zIndex = 9999;
overlay.style.opacity = 1;
overlay.style.transition = 'opacity 2s';

// Add overlay to the body
document.body.appendChild(overlay);

// After 3 seconds, fade out the overlay
setTimeout(() => {
    overlay.style.opacity = 0;
    // Remove overlay after fade out
    setTimeout(() => {
        overlay.remove();
    }, 2000);
}, 3000);