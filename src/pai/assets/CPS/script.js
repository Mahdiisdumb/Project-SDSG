let clickCount = 0;
let isCounting = false;
let timer;
let resultDisplay;
let timerDisplay;
let countdown;
let timerDuration = 5; // Duration in seconds for CPS check

document.addEventListener('DOMContentLoaded', () => {
    const checkButton = document.querySelector('.CHECK');
    resultDisplay = document.getElementById('result');
    timerDisplay = document.getElementById('timerDisplay');

    checkButton.addEventListener('click', () => {
        if (!isCounting) {
            startCPSCheck();
        } else {
            clickCount++; // Increment click count during counting
        }
    });

    // Prevent Enter key from triggering a click
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default action for Enter key
        }
    });
});

function startCPSCheck() {
    clickCount = 0;
    isCounting = true;
    timerDisplay.textContent = `Timer: ${timerDuration}`; // Reset timer display

    // Start the timer for CPS check
    timer = setTimeout(() => {
        isCounting = false;
        const cps = (clickCount / timerDuration).toFixed(2);
        alert(`Your CPS: ${cps}`); // Show result as an alert
        clearInterval(countdown); // Clear countdown interval
    }, timerDuration * 1000);

    // Countdown display
    let timeLeft = timerDuration;
    countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Timer: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(countdown); // Stop the countdown when it reaches 0
        }
    }, 1000);
}