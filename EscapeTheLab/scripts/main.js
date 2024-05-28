// Get Canvas element and set context to 2D
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Get HTML elements
const startBtn = document.getElementById('startBtn');
const skipBtn = document.getElementById('skip-intro-btn');
const overlay = document.getElementById('overlay');
const introContainer = document.getElementById('intro-container');
const instructionPage = document.getElementById('instruction-container');
const introElement = {
    1: document.getElementById('intro1'),
    2: document.getElementById('intro2'),
    3: document.getElementById('intro3'),
    4: document.getElementById('intro4')
}
const combinationLockContainer = document.getElementById('combination-lock-container');
const lockElement = document.querySelectorAll('.lock');
const unlockElement = document.querySelectorAll('.unlock');
const gameOverScreen = document.getElementById('game-over-screen')

// Image data
const images = {
    menu: { src: './assets/images/menu.png', width: 1590 * 2.5, height: 580 * 2.5, boxes: [] },
    lab1: { src: './assets/images/lab1.png', width: 1900 * 2, height: 800 * 2, boxes: ['lab1-box1', 'lab1-box2'] },
    lab2: { src: './assets/images/lab2.png', width: 1603 * 2.5, height: 629 * 2.5, boxes: ['lab2-box1', 'lab2-box2', 'lab2-box3'] },
    lab3: { src: './assets/images/lab3.png', width: 1600 * 2.5, height: 675 * 2.5, boxes: ['lab3-box1', 'lab3-box2'] },
    exit: { src: './assets/images/exit.png', width: 1790 * 2.5, height: 635 * 2.5, boxes: ['exit-box1', 'exit-box2', 'exit-box3'] }
};

// Introduction text
const introTexts = [
    'Awakening within the eerie confines of an abandoned laboratory, your memory blanketed in uncertainty.',
    'Your mission: unravel the enigma shrouding your predicament and unearth the code essential for your liberation.',
    'Tread cautiously, for a lethal gas leak inches closer, threatening to ensnare you within its toxic embrace.',
    'Time ticks away as you delve into the mysteries lurking within these forsaken walls, your very survival hanging in the balance.'
];

// Initial coordinates of interactive boxes
const interactiveBoxData = {
    'lab1-box1': { topValue: 1375, leftValue: 850, src: './assets/images/morseCodeChart.jpg', imageWidth: 650, imageHeight: 450 },
    'lab1-box2': { topValue: 950, leftValue: 3365, src: './assets/images/bombing.png', imageWidth: 850, imageHeight: 400 },
    'lab2-box1': { topValue: 900, leftValue: 45, src: './assets/images/accelerationGravity.png', imageWidth: 900, imageHeight: 500 },
    'lab2-box2': { topValue: 80, leftValue: 1050, src: './assets/images/morseCode.png', imageWidth: 1000, imageHeight: 150 },
    'lab2-box3': { topValue: 925, leftValue: 2980, src: './assets/images/baseOfAllLife.png', imageWidth: 850, imageHeight: 650 },
    'lab3-box1': { topValue: 1010, leftValue: 3600, src: './assets/images/carbonAtom.jpg', imageWidth: 500, imageHeight: 500 },
    'lab3-box2': { topValue: 1410, leftValue: 410, src: './assets/images/harness.png', imageWidth: 850, imageHeight: 650 },
    'exit-box1': { topValue: 785, leftValue: 1085, src: './assets/images/morseCodeDate.png', imageWidth: 850, imageHeight: 400 },
    'exit-box2': { topValue: 905, leftValue: 2310, src: './assets/images/u235.png', imageWidth: 850, imageHeight: 650 },
    'exit-box3': { topValue: 1055, leftValue: 4250, src: 'combinationLock' },
}

// Animation variables850
let x = 0, y = 0; 
let currentImg = images['menu'];
let overlayOpacity = 0.8, introductionOpacity = 1, lockOpacity = 1;
let overlayZindex = 3000;
let instructionPosition = -2000;
let lastRefreshRate = 0;
let particles;
let menuDeltaX = -3;
let menuDeltaY = -1;
let particleDrawCooldown = 0;
const gravity = 0.03;
const friction = 0.99;

// Key state variables
let leftArrowPressed = false;
let rightArrowPressed = false;
let upArrowPressed = false;
let downArrowPressed = false;

// Game state variables
let atMainPage = true;
let atIntro = false;
let atInstruction = false;
let atGame = false;
let atEnd = false;
let initialIntroduction = true;
let initialInstructions = true;
let hasDisplayedContent = false;
let celebration = false;
let isPaused = false;

// Set initial position of mouse
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

// Function that sets canvas size to full viewport
function setCanvasSize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

// Function that clears canvas
function clearScreen() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
}

// Function to render image
function renderImage(targetImage) {
    const image = new Image();
    image.src = targetImage.src;
    ctx.drawImage(image, x, y, targetImage.width, targetImage.height);
}

// Function to load text letter by letter
function loadText(text, element) {
    let index = 0;
    const interval = setInterval(() => {
        element.textContent += text[index];
        index++;
        if (index >= text.length) {
            playPauseAudio('key', false); // Stop typing sound when text is finished
            clearInterval(interval);
        }
    }, 50);
}

// Function that loads intro text sequentially
function loadIntroTextSequentially(currentIndex) {
    // Check if game is at Intro
    if (!atIntro) return;

    // Get the length of the introText object by counting its keys
    const introTextLength = introTexts.length;

    // Check if the current index exceeds the length of the introText object
    if (currentIndex >= introTextLength) {
        // Change scene
        setTimeout(() => {
            atInstruction = true;
            atIntro = false;
            startBtn.disabled = true;
        }, 5000);

        // If currentIndex is greater than or equal to the length, stop recursion
        return;
    }

    // Use setTimeout to delay execution of the loadText function
    setTimeout(() => {
        // Load text corresponding to the current index using the loadText function
        loadText(introTexts[currentIndex], introElement[currentIndex + 1]);

        playPauseAudio('key', true, 1); // Play typing sound
        
        // Set a timout to let loadText() finish loading the text
        setTimeout(() => loadIntroTextSequentially(currentIndex + 1), 5000);
    }, 2000);
}

// Function to load content into a container
function loadContent(content) {
    // Check if it is combination lock
    if (interactiveBoxData[content].src === 'combinationLock') {
        document.getElementById('combination-lock-container').style.zIndex = 1999;
    } else {
        // Create an image element
        const img = document.createElement('img');
        
        // Get the container where the content will be displayed
        const container = document.getElementById('display-content');

        // Get the Image data
        const imageData = interactiveBoxData[content];

        // Set the image source and dimensions
        img.src = imageData.src;
        img.width = imageData.imageWidth;
        img.height = imageData.imageHeight;

        // Append the image to the container
        container.appendChild(img);
    }

    // Update the state to indicate content has been displayed
    hasDisplayedContent = !hasDisplayedContent;
}

// Function that moves the background and the interactive boxes of the associated background
function moveBackground(targetImage) {
    // Set variables
    let dx = 0, dy = 0;
    let borderX = (canvas.width - targetImage.width);
    let borderY = (canvas.height - targetImage.height);

    // Add direction if respective keys are pressed
    if (leftArrowPressed && x < 0 - 20) dx += 20;
    if (rightArrowPressed && x > borderX + 20) dx -= 20;
    if (upArrowPressed && y < 0 - 20) dy += 20;
    if (downArrowPressed && y > borderY + 20) dy -= 20;

    // Move interactive boxes along with the background
    const boxElement = targetImage.boxes;
    boxElement.forEach(element => {
        // Get the element
        const targetElement = document.getElementById(element);

        // Get the computed style of the element
        const computedStyle = window.getComputedStyle(targetElement);

        // Get the value of the 'top' and 'left' style property
        let topValue = parseInt(computedStyle.getPropertyValue('top'));
        let leftValue = parseInt(computedStyle.getPropertyValue('left'));

        // Move
        topValue += dy;
        leftValue += dx;

        targetElement.style.top = `${topValue}px`;
        targetElement.style.left = `${leftValue}px`;
    });

    // Move
    x += dx;
    y += dy;
}

// Function to toggle display of interactive boxes
function toggleBoxes(currentImg, show) {
    // Set variables
    const boxElement = currentImg.boxes;
    const zIndex = show ? 1000 : -1000;

    // Cycle through each element in boxElement
    boxElement.forEach(element => {
        // Set variables
        const currentElement = document.getElementById(element);
        currentElement.style.zIndex = zIndex;

        // Set box initial box coordinates
        if (atGame) {
            const { topValue, leftValue } = interactiveBoxData[element];
            currentElement.style.top = `${topValue}px`;
            currentElement.style.left = `${leftValue}px`;
        }
    });
}

// Function to toggle pause
function togglePause() {
    // Show or hide instruction
    instructionPosition = -instructionPosition;
    instructionPage.style.zIndex = instructionPosition;

    // Change pause to true or false
    if (isPaused) {
        isPaused = false;
        return;
    }
    isPaused = true;
}

// Function that draws particle
function drawParticle() {
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

        playFireworkSound();
    }
}

// Function for Main page
function mainPageFunction(deltaTime) {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Change direction if coordinates touch the border
    if (x > 0 || x <= (canvas.width - currentImg.width)) menuDeltaX = -menuDeltaX;
    if (y > 0 || y <= (canvas.height - currentImg.height)) menuDeltaY = -menuDeltaY;
    x += menuDeltaX * (deltaTime / 16); // Scale speed by deltaTime for smooth animation
    y += menuDeltaY * (deltaTime / 16); // Scale speed by deltaTime for smooth animation
}

// Function for Introduction
function introductionFunction(deltaTime) {
    // Gradually increase opacity value until it reaches 1
    if (overlayOpacity < 1) {
        overlay.style.backgroundColor = `rgba(0, 0, 0, ${overlayOpacity})`;
        overlayOpacity += 0.01 * (deltaTime / 16); // Scale opacity change by deltaTime
    } else if (initialIntroduction) {
        // Reset coordinates
        x = 0;
        y = 0;

        // Hide main menu
        document.getElementById('main-menu').style.zIndex = -2000;

        // Set background for game
        currentImg = images['lab1'];
        togglePause();
        initialIntroduction = false;
    }
}

// Function for Instructions
function instructionsFunction(deltaTime) {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Decrease opacity until it is 0
    if (introductionOpacity > 0) {
        // Reduce opacity for each element in introElement
        for (let key in introElement) {
            introElement[key].style.opacity = introductionOpacity;
        }

        // Disable buttons and hide them
        startBtn.disabled = true;
        skipBtn.disabled = true;
        skipBtn.style.opacity = introductionOpacity
        introductionOpacity -= 0.01 * (deltaTime / 16); // Scale opacity change by deltaTime
    } else if (overlayOpacity > 0) {
        playPauseAudio('key', false); // Play select sound

        // Gradually hide overlay by decreasing its opacity
        overlay.style.backgroundColor = `rgba(0, 0, 0, ${overlayOpacity})`;
        overlayOpacity -= 0.02 * (deltaTime / 16); // Scale opacity change by deltaTime
    } else if (initialInstructions) {
        // Set values to start game
        toggleBoxes(currentImg, true);
        atGame = true;
        atInstruction = false;
        overlay.style.zIndex = -1;
        introContainer.style.zIndex = -3000;
        initialInstructions = false;
        skipBtn.style.zIndex = -2000;
        timerContainer.style.zIndex = 1000;
        playPauseAudio('gameBg', true, 0.8); // Play game music
    }
}

// Function of the end of the game
function gameEndFunction(deltaTime) {
    // Clear screen
    clearScreen();

    // Increase opacity if below 1
    if (overlayOpacity < 1) {
        // Set values for game over
        gameOverScreen.style.zIndex = 3000;
        gameOverScreen.style.opacity = overlayOpacity;
        combinationLockContainer.style.opacity = lockOpacity;
        timerContainer.style.opacity = lockOpacity;
        overlayOpacity += 0.01 * (deltaTime / 16); // Scale opacity change by deltaTime
        lockOpacity -= 0.02 * (deltaTime / 16); // Scale opacity change by deltaTime
    } else if (!celebration) {
        // Set game over page
        combinationLockContainer.style.zIndex = -3000;
        timerContainer.style.zIndex = -3000;
        canvas.style.zIndex = 1;
        celebration = true;
    } else {
        // Decrease cooldown count by 1 each loop
        if (particleDrawCooldown > 0) particleDrawCooldown--;

        // Update each particles of fireworks
        particles.forEach((particle, index) => {
            // Check if particle is no longer visible
            if (particle.opacity > 0) {
                particle.update(); // Update
            } else {
                particles.splice(index, 1); // Erase particle from array
            }
        });
    }
}

// Implementation
function init() {
    particles = []; // Clear particles
    setCanvasSize();
}

function animate(timestamp) {
    requestAnimationFrame(animate); // Loop animation

    // Calculate time difference between frames
    const deltaTime = timestamp - lastRefreshRate;
    lastRefreshRate = timestamp;
    
    // Execute depending on game state
    if (atMainPage) mainPageFunction(deltaTime);
    else if (atIntro) introductionFunction(deltaTime);
    else if (atInstruction) instructionsFunction(deltaTime);
    else if (atGame) {
        moveBackground(currentImg); 
        updateTime();
    } else if (atEnd) gameEndFunction(deltaTime);

    if (!atEnd) {
        renderImage(currentImg);
    }
    updateTime();
}
animate(1); // Start animation loop