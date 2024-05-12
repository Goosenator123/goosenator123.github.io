// Event Listeners
window.onload = () => {
    setCanvasSize();
    animate(1); // Start animation loop
    init();
}

startBtn.addEventListener('click', () => {
    atMainPage = false;
    atIntro = true;
    overlay.style.zIndex = 3000;
    introContainer.style.zIndex = 3000;
    loadIntroTextSequentially(0)
    setTimeout(() => {
        skipBtn.style.zIndex = 3000;
    }, 2000);
});

skipBtn.addEventListener('click', () => {
    atInstruction = true;
    atIntro = false;
    startBtn.disabled = true;
    skipBtn.disabled = true;
});

window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowLeft':
            leftArrowPressed = true;
            break;
        case 'ArrowRight':
            rightArrowPressed = true;
            break;
        case 'ArrowUp':
            upArrowPressed = true;
            break;
        case 'ArrowDown':
            downArrowPressed = true;
            break;
    }
  });
  
window.addEventListener('keyup', function(event) {
    switch (event.key) {
        case 'ArrowLeft':
            leftArrowPressed = false;
            break;
        case 'ArrowRight':
            rightArrowPressed = false;
            break;
        case 'ArrowUp':
            upArrowPressed = false;
            break;
        case 'ArrowDown':
            downArrowPressed = false;
            break;
    }
});

// Event listener for the Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && atGame) { // Check if the key code is equal to the keycode of the "Escape" key
        togglePause();
    }
});

// Event listeners for image clicks, ignoring the first key
Object.keys(images).slice(1).forEach(key => {
    document.getElementById(key).addEventListener('click', () => {
        x = 0;
        y = 0;
        toggleBoxes(currentImg, false);
        currentImg = images[key];
        toggleBoxes(currentImg, true);
        togglePause();
    });
});

// Event Listener for resize canvas
window.addEventListener('resize', () => {
    setCanvasSize(); // Resize
    init(); // Re-initiate
    x = 0;
    y = 0;
    toggleBoxes(currentImg, false);
    toggleBoxes(currentImg, true);
});

Object.keys(interactiveBoxData).forEach(key => {
    document.getElementById(key).addEventListener('click', () => {
        loadContent(key);
    });
});

window.addEventListener('mousedown', (event) => {
    const combinationLock = document.getElementById('combination-lock-container');
    if (hasDisplayedContent && !combinationLock.contains(event.target)) {
        document.getElementById('display-content').innerHTML = '';
        combinationLock.style.zIndex = -2000;
        hasDisplayedContent = !hasDisplayedContent;
    }
});

// Refresh page upon restart
document.getElementById('restart').addEventListener('click', () => {
    window.location.reload();
});

// Execute upon user click
window.addEventListener('click', (event) => {
    // Set mouse coordinates
    mouse.x = event.x;
    mouse.y = event.y;

    // Set variables
    const particleCount = 1000;
    const angleIncrement = (Math.PI * 2) / particleCount;
    const power = 15;

    // Check if arrived at celebration
    if (celebration) {
        // Generate particles
        for (let i = 0; i < particleCount; i++) {
            // Set random color
            let color = `hsl(${Math.random() * 360}, 50%, 50%)`

            // Assign particle properties
            particles.push(new Particle(mouse.x, mouse.y, 5, color, { 
                x: Math.cos(angleIncrement * i) * Math.random() * power, 
                y: Math.sin(angleIncrement * i) * Math.random() * power
            }, Math.random()));
        }
    }
});