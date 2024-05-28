// Execute onload
window.onload = () => {
    init();
    displayHighscore();
    playPauseAudio('menuBg', true, 0.5); // Play menu bg music

    // Increase time each seconds during game or when it is not paused
    setInterval(() => {
        if (!isPaused && atGame) time += 1;
    }, 1000);
}

// Execute when Start Button in menu is clicked to start game
startBtn.addEventListener('click', () => {
    // Set game state
    atMainPage = false;
    atIntro = true;
    overlay.style.zIndex = 3000;
    introContainer.style.zIndex = 3000;

    // Load intro text letter by letter
    loadIntroTextSequentially(0)

    playPauseAudio('menuBg', false); // Stop menu music
    playPauseAudio('select', true, 0.6); // Play select sound

    // Show skip button to skip intro
    setTimeout(() => {
        skipBtn.style.zIndex = 3000;
    }, 2000);
});

// Execute when Skip Button is clicked to skip intro
skipBtn.addEventListener('click', () => {
    // Set game state
    atInstruction = true;
    atIntro = false;

    // Make start and skip button disabled to avoid accidentle clicks
    startBtn.disabled = true;
    skipBtn.disabled = true;

    playPauseAudio('select', true, 0.6); // Play select sound
});

// Execute when WASD or arrow key are pressed for movement
window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
            leftArrowPressed = true;
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            rightArrowPressed = true;
            break;
        case 'ArrowUp':
        case 'w':
        case 'W':
            upArrowPressed = true;
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            downArrowPressed = true;
            break;
    }
});

// Execute when WASD or arrow key are pressed to stop movement
window.addEventListener('keyup', function(event) {
    switch (event.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
            leftArrowPressed = false;
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            rightArrowPressed = false;
            break;
        case 'ArrowUp':
        case 'w':
        case 'W':
            upArrowPressed = false;
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            downArrowPressed = false;
            break;
    }
});

// Execute when escape key is pressed to show instructions
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && atGame) togglePause(); // Pause game if escape is pressed
});

// Cycle through all keys in images to create multiple event listeners
Object.keys(images).slice(1).forEach(key => {
    // Event listeners to show the area clicked depending on the key clicked
    document.getElementById(key).addEventListener('click', () => {
        // Reset coordinates
        x = 0;
        y = 0;

        // Hide interactive boxes of previous area
        toggleBoxes(currentImg, false);

        // Set background to new area and show its respective interactive boxes
        currentImg = images[key];
        toggleBoxes(currentImg, true);

        togglePause(); // Unpause the game
        playPauseAudio('select', true, 0.6); // Play select sound
    });
});

// Execute when viewport is resized
window.addEventListener('resize', () => {
    init(); // Re-initiate

    // Reset coordinates
    x = 0;
    y = 0;

    // Reset coordinates of interactive boxes
    toggleBoxes(currentImg, false);
    toggleBoxes(currentImg, true);
});

// Cycle through all keys in interactiveBoxData to create multiple event listeners
Object.keys(interactiveBoxData).forEach(key => {
    // Event listeners to load content of the box clicked in the interactiveBoxData
    document.getElementById(key).addEventListener('click', () => {
        loadContent(key); // Load the content of the box
        playPauseAudio('select', true, 0.6); // Play select sound
    });
});

// Execute when refresh button is clicked
document.getElementById('restart').addEventListener('click', () => {
    window.location.reload(); // Reload page
});

// Execute when user click
window.addEventListener('mousedown', (event) => {
    const combinationLock = document.getElementById('combination-lock-container'); // Get HTML element

    // Check if content is loaded and the click is outside of the lock
    if (hasDisplayedContent && !combinationLock.contains(event.target)) {
        // Hide hide content and lock
        document.getElementById('display-content').innerHTML = '';
        combinationLock.style.zIndex = -2000;
        hasDisplayedContent = !hasDisplayedContent;
    }

    // Execute when cooldown is 0
    if (particleDrawCooldown <= 0 && atEnd) {
        drawParticle(); // Draw particle
        particleDrawCooldown = 50;
    }
});