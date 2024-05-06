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
    menu: { src: './assets/menu.png', width: 1600 * 2.5, height: 590 * 2.5, boxes: [] },
    lab1: { src: './assets/lab1.png', width: 1854 * 2, height: 918 * 2, boxes: ['lab1-box1'] },
    lab2: { src: './assets/lab2.png', width: 1603 * 2.5, height: 627 * 2.5, boxes: [] },
    lab3: { src: './assets/lab3.png', width: 1602 * 2.5, height: 685 * 2.5, boxes: [] },
    exit: { src: './assets/exit.png', width: 1790 * 2.5, height: 635 * 2.5, boxes: [] }
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
let y = 0;
let speed = -1;
let instructionPosition = -1000;
let skipButtonPosition = -1000;
let interactiveBoxPosition = 1000;
let overlayOpacity = 0.8;
let currentImg = images['exit'];
let lastRefreshRate = 0;
let imageScale = 1.5;

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
let initialInstructions = true;
let hasDisplayedContent = false;

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
    ctx.drawImage(image, x, y, targetImage.width, targetImage.height);
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
            skipBtn.style.zIndex = -skipButtonPosition;
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

// Function that loads other HTML files
function loadContent(content) {
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Define the file you want to load
    const fileUrl = './morseCodeChart.html';

    // Make a GET request to fetch the HTML content
    xhr.open('GET', fileUrl, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            // On successful request, insert the HTML content into the specified div
            document.getElementById('display-content').innerHTML = xhr.responseText;
            hasDisplayedContent = !hasDisplayedContent;
        }
    };
    xhr.send();
}

// Function that displays interactive boxes
function displayBoxes(currentImg) {
    const boxes = currentImg.boxes;
    const elementArray = [];
    boxes.forEach(element => {
        elementArray.push(document.getElementById(element));
    })
    // console.log(elementArray);
}

// Function to toggle pause
function togglePause() {
    instructionPosition = -instructionPosition;
    instructionPage.style.zIndex = instructionPosition;
}

function moveBackground(targetImage) {
    let dx = 0;
    let dy = 0;
    let borderX = (canvas.width - targetImage.width);
    let borderY = (canvas.height - targetImage.height);

    if (leftArrowPressed && x < 0) {
        dx += 20;
    }
    if (rightArrowPressed && x > borderX) {
        dx -= 20;
    }
    if (upArrowPressed && y < 0) {
        dy += 20;
    }
    if (downArrowPressed && y > borderY) {
        dy -= 20;
    }

    x += dx;
    y += dy;
}

// Function for Main page
function mainPageFunction(deltaTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (x > 0 || x < currentImg.max) {
        speed = -speed;
    }
    // x += speed * (deltaTime / 16); // Scale speed by deltaTime for smooth animation
}

// Function for Introduction
function introductionFunction(deltaTime) {
    if (overlayOpacity < 1) {
        overlay.style.backgroundColor = `rgba(0, 0, 0, ${overlayOpacity})`;
        overlayOpacity += 0.005 * (deltaTime / 16); // Scale opacity change by deltaTime
    } else {
        x = 0;
        y = 0;
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
    } else if (atGame) {
        moveBackground(currentImg);
    }

    renderImage(currentImg);
    displayBoxes(currentImg);
    moveBackground(currentImg);
}
animate(1); // Start animation loop

// Event Listeners
startBtn.addEventListener('click', () => {
    atMainPage = !atMainPage;
    atIntro = !atIntro;
    loadIntroTextSequentially(0)
    setTimeout(() => {
        skipBtn.style.zIndex = -skipButtonPosition;
    }, 2000);
});

skipBtn.addEventListener('click', () => {
    atInstruction = !atInstruction;
    atIntro = !atIntro;
    atGame = !atGame;
    startBtn.disabled = true;
    skipBtn.disabled = true;
    skipBtn.style.zIndex = skipButtonPosition;
});

window.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        leftArrowPressed = true;
    } else if (event.key === 'ArrowRight') {
        rightArrowPressed = true;
    } else if (event.key === 'ArrowUp') {
        upArrowPressed = true;
    } else if (event.key === 'ArrowDown') {
        downArrowPressed = true;
    }
  });
  
window.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowLeft') {
        leftArrowPressed = false;
    } else if (event.key === 'ArrowRight') {
        rightArrowPressed = false;
    }else if (event.key === 'ArrowUp') {
        upArrowPressed = false;
    } else if (event.key === 'ArrowDown') {
        downArrowPressed = false;
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
        currentImg = images[key];
    });
});

document.getElementById('lab1-box1').addEventListener('click', () => {
    loadContent();
});

window.addEventListener('mousedown', () => {
    if (hasDisplayedContent) {
        document.getElementById('display-content').innerHTML = '';
        hasDisplayedContent = !hasDisplayedContent;
    }
});

window.addEventListener('resize', () => {
    setCanvasSize();
});