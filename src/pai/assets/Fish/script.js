document.getElementById('changeButton').addEventListener('click', function() {
    const fishGif = document.getElementById('fishGif');
    const originalSrc = 'tenor.gif';
    const newSrc = 'fis.jpg'; // New funny fish GIF

    fishGif.src = newSrc;

    setTimeout(() => {
        fishGif.src = originalSrc;
    }, 900);
});
