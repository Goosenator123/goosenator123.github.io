// Get Canvas element and set context to 2D
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Get HTML element
const startBtn = document.getElementById('startBtn');
const skipBtn = document.getElementById('skip-intro-btn');
skipBtn.disabled = true; // Set skip button to be disabled

const intructionPage = document.getElementById('instructions')
const overlay = document.getElementById('overlay');
const introContainer = document.getElementById('intro-container');
const introElement = {
    1: document.getElementById('intro1'),
    2: document.getElementById('intro2'),
    3: document.getElementById('intro3'),
    4: document.getElementById('intro4')
}

// Set canvas size to full screen function
function setCanvasSize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
setCanvasSize();

// Menu image
const menuImg = {
    src: './assets/main.svg',
    scale: 2,
    offset: -810,
    max: -630
}

// Lab1 image
const lab1Img = {
    src: './assets/lab1.svg',
    scale: 1.5,
    offset: -500,
    max: 0
}

const lab2Img = {
    src: './assets/lab2.svg',
    scale: 1.82,
    offset: -710,
    max: -410
}

const lab3Img = {
    src: './assets/lab3.svg',
    scale:1.7,
    offset: -640,
    max: -250
}

const exit = {
    src: './assets/exit2.svg',
    scale: 1.8,
    offset: -700,
    max: -380
}

// Introduction Text
const introText = {
    1: 'Awakening within the eerie confines of an abandoned laboratory, your memory blanketed in uncertainty.',
    2: 'Your mission: unravel the enigma shrouding your predicament and unearth the code essential for your liberation.',
    3: 'Tread cautiously, for a lethal gas leak inches closer, threatening to ensnare you within its toxic embrace.',
    4: 'Time ticks away as you delve into the mysteries lurking within these forsaken walls, your very survival hanging in the balance.'
}

let currentImg = menuImg;

// Variables
let delay = 50; // Load text delay
let speed = -1; // Transition speed of menu background
let x = 0;
let position = -1000;

// Conditionals
let atMainPage = true;
let atIntro = false;
let gameStart = false;
let atInstruction = false;
let initialInstructions = true;
let canPause = false;

// Render image function
function renderImg(targetImg) {
    const img = new Image();
    img.src = targetImg.src;
    let newWidth = img.width * targetImg.scale;
    let newHeight = img.height * targetImg.scale;
    ctx.drawImage(img, x, targetImg.offset, newWidth, newHeight);
}

// Load text letter by letter function
function loadText(text, element) {
    let index = 0; // Set index
    const interval = setInterval(() => {
        element.textContent += text[index];
        index++;

        if (index >= text.length) {
            clearInterval(interval);
        }
    }, delay);
}

// Function that loads intro text sequentially
function loadIntroTextSequentially(currentIndex) {
    // Check if game is at Intro
    if (atIntro) {
        // Get the length of the introText object by counting its keys
        const introTextLength = Object.keys(introText).length;

        // Check if the current index exceeds the length of the introText object
        if (currentIndex >= introTextLength + 1) {
            // Change scene
            setTimeout(() => {
                atInstruction = !atInstruction;
                atIntro = !atIntro;
                canPause = !canPause;
                startBtn.disabled = true;
            }, 5000);

            // If currentIndex is greater than or equal to the length, stop recursion
            return;
        }

        // Use setTimeout to delay execution of the loadText function
        setTimeout(() => {
            // Load text corresponding to the current index using the loadText function
            loadText(introText[currentIndex], introElement[currentIndex]);
            
            // Set a timout to let loadText() finish loading the text
            setTimeout(() => {
                // Call the function recursively for the next index
                loadIntroTextSequentially(currentIndex + 1); // Call the function recursively for the next index
            }, 5000);
        }, 2000);
    }
}

// Toggle pause function
function togglePause() {
    position = -position;
    intructionPage.style.zIndex = position;
}

// Animation Loop
let overlayOpacity = 0.8;
function animate() {
    requestAnimationFrame(animate); // Loop animation
    
    if (atMainPage) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (x > 0 || x < currentImg.max) {
            speed = -speed;
        }
        
        x += speed;
    } else if (atIntro) {
        if (overlayOpacity < 1) {
            overlay.style.backgroundColor = `rgba(0, 0, 0, ${overlayOpacity})`;
            overlayOpacity += 0.005;
        } else {
            x = 0;
            currentImg = lab1Img;
        }
    } else if (atInstruction) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (overlayOpacity > 0) {
            overlay.style.backgroundColor = `rgba(0, 0, 0, ${overlayOpacity})`;
            for (let key in introElement) {
                introElement[key].style.opacity = overlayOpacity;
            }
            
            overlayOpacity -= 0.01;
        } else if (initialInstructions) {
            togglePause();
            introContainer.style.zIndex = -100;
            initialInstructions = !initialInstructions;
        }
    }

    renderImg(currentImg);
}
animate(); // Start animation loop

// Event Listeners
startBtn.addEventListener('click', () => {
    atMainPage = !atMainPage;
    atIntro = !atIntro;
    loadIntroTextSequentially(1)
    skipBtn.disabled = false;
})

skipBtn.addEventListener('click', () => {
    atInstruction = !atInstruction;
    atIntro = !atIntro;
    canPause = !canPause;
    startBtn.disabled = true;
    skipBtn.disabled = true;
})

window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && x < 0) {
        x += 10;
    } else if (event.key === 'ArrowRight' && x > currentImg.max) {
        x -= 10;
    }
})

// Event listener for the Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && canPause) { // Check if the key code is equal to the keycode of the "Escape" key
        togglePause();
    }
});

document.getElementById('lab1').addEventListener('click', () => {
    x = 0;
    currentImg = lab1Img;
})
document.getElementById('lab2').addEventListener('click', () => {
    x = 0;
    currentImg = lab2Img;
})
document.getElementById('lab3').addEventListener('click', () => {
    x = 0;
    currentImg = lab3Img;
})
document.getElementById('exit').addEventListener('click', () => {
    x = 0;
    currentImg = exit;
})