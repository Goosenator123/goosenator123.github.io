// Get Canvas element and set context to 2D
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Get HTML elements
const startBtn = document.getElementById('startBtn');
const skipBtn = document.getElementById('skip-intro-btn');
const overlay = document.getElementById('overlay');
const introContainer = document.getElementById('intro-container');
const instructionPage = document.getElementById('instructions');
const introElement = {
    1: document.getElementById('intro1'),
    2: document.getElementById('intro2'),
    3: document.getElementById('intro3'),
    4: document.getElementById('intro4')
}

// Image data
const images = {
    menu: { src: './assets/main.svg', scale: 2, offset: -810, max: -630 },
    lab1: { src: './assets/lab1.svg', scale: 1.5, offset: -500, max: 0 },
    lab2: { src: './assets/lab2.svg', scale: 1.82, offset: -710, max: -410 },
    lab3: { src: './assets/lab3.svg', scale: 1.7, offset: -640, max: -250 },
    exit: { src: './assets/exit2.svg', scale: 1.8, offset: -700, max: -380 }
};

// Introduction text
const introTexts = [
    'Awakening within the eerie confines of an abandoned laboratory, your memory blanketed in uncertainty.',
    'Your mission: unravel the enigma shrouding your predicament and unearth the code essential for your liberation.',
    'Tread cautiously, for a lethal gas leak inches closer, threatening to ensnare you within its toxic embrace.',
    'Time ticks away as you delve into the mysteries lurking within these forsaken walls, your very survival hanging in the balance.'
];

// Animation variables
let x = 0;
let speed = -1;
let position = -1000;
let overlayOpacity = 0.8;
let currentImg = images['menu'];
let lastRefreshRate = 0;

// Game state variables
let atMainPage = true;
let atIntro = false;
let atInstruction = false;
let atGame = false;
let initialInstructions = true;

// Set canvas size to full screen function
function setCanvasSize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
setCanvasSize();

// Function to render image
function renderImage(targetImage) {
    const image = new Image();
    image.src = targetImage.src;
    let newWidth = image.width * targetImage.scale;
    let newHeight = image.height * targetImage.scale;
    ctx.drawImage(image, x, targetImage.offset, newWidth, newHeight);
}

// Function to load text letter by letter
function loadText(text, element) {
    let index = 0;
    const interval = setInterval(() => {
        element.textContent += text[index];
        index++;
        if (index >= text.length) clearInterval(interval);
    }, 50);
}

// Function that loads intro text sequentially
function loadIntroTextSequentially(currentIndex) {
    // Check if game is at Intro
    if (!atIntro) {
        return;
    }

    // Get the length of the introText object by counting its keys
    const introTextLength = introTexts.length;

    // Check if the current index exceeds the length of the introText object
    if (currentIndex >= introTextLength) {
        // Change scene
        setTimeout(() => {
            atInstruction = !atInstruction;
            atIntro = !atIntro;
            atGame = !atGame;
            startBtn.disabled = true;
        }, 5000);

        // If currentIndex is greater than or equal to the length, stop recursion
        return;
    }

    // Use setTimeout to delay execution of the loadText function
    setTimeout(() => {
        // Load text corresponding to the current index using the loadText function
        loadText(introTexts[currentIndex], introElement[currentIndex + 1]);
        
        // Set a timout to let loadText() finish loading the text
        setTimeout(() => {
            // Call the function recursively for the next index
            loadIntroTextSequentially(currentIndex + 1); // Call the function recursively for the next index
        }, 5000);
    }, 2000);
}

// Function to toggle pause
function togglePause() {
    position = -position;
    instructionPage.style.zIndex = position;
}

// Function for Main page
function mainPageFunction(deltaTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (x > 0 || x < currentImg.max) {
        speed = -speed;
    }
    x += speed * (deltaTime / 16); // Scale speed by deltaTime for smooth animation
}

// Function for Introduction
function introductionFunction(deltaTime) {
    if (overlayOpacity < 1) {
        overlay.style.backgroundColor = `rgba(0, 0, 0, ${overlayOpacity})`;
        overlayOpacity += 0.005 * (deltaTime / 16); // Scale opacity change by deltaTime
    } else {
        x = 0;
        currentImg = images['lab1'];
    }
}

// Function for Instructions
function instructionsFunction(deltaTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (overlayOpacity > 0) {
        overlay.style.backgroundColor = `rgba(0, 0, 0, ${overlayOpacity})`;
        for (let key in introElement) {
            introElement[key].style.opacity = overlayOpacity;
        }
        
        overlayOpacity -= 0.01 * (deltaTime / 16); // Scale opacity change by deltaTime
    } else if (initialInstructions) {
        togglePause();
        introContainer.style.zIndex = -100;
        initialInstructions = !initialInstructions;
    }
}

// Animation Loop
function animate(timestamp) {
    requestAnimationFrame(animate); // Loop animation

    // Calculate time difference between frames
    const deltaTime = timestamp - lastRefreshRate;
    lastRefreshRate = timestamp;
    
    if (atMainPage) {
        mainPageFunction(deltaTime);
    } else if (atIntro) {
        introductionFunction(deltaTime);
    } else if (atInstruction) {
        instructionsFunction(deltaTime);
    }

    renderImage(currentImg);
}
animate(1); // Start animation loop

// Event Listeners
startBtn.addEventListener('click', () => {
    atMainPage = !atMainPage;
    atIntro = !atIntro;
    loadIntroTextSequentially(0)
    skipBtn.disabled = false;
})

skipBtn.addEventListener('click', () => {
    atInstruction = !atInstruction;
    atIntro = !atIntro;
    atGame = !atGame;
    startBtn.disabled = true;
    skipBtn.disabled = true;
})

window.addEventListener('keydown', (event) => {
    // Check if game state is at game
    if (!atGame) {
        return; // Interrupt function if not
    }
    
    if (event.key === 'ArrowLeft' && x < 0) {
        x += 10;
    } else if (event.key === 'ArrowRight' && x > currentImg.max) {
        x -= 10;
    }
})

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
        currentImg = images[key];
    });
});
