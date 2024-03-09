// Retrieving references from HTML
const canvas = document.querySelector('canvas');  // Canvas element

// Retrieving the 2D rendering context
const ctx = canvas.getContext('2d');

// Set canvas size to full web page
function setCanvasSize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
setCanvasSize(); // Set canvas size initially

// Declaring variables
let ballArray = [];  // Array to store balls
let chosenColor = ''; // Default color
let chosenText = ''; // Default text
let colorIndex = 0; // Index for cycling through colors in theme arrays
let chosenDiff = '1'; // Default difficulty level
let gravity = 0.3; // Acceleration due to gravity
let friction = 0.9; // Friction coefficient
let zPosition = 100; // Z-index position
let spawnRate = 300; // Set spawn rate for balls to (0.3s)

// Color Arrays
const themes = {
    'red': ['#9d0208', '#d00000', '#e85d04', '#f48c06', '#ffba08'],
    'blue': ['#6930c3', '#5e60ce', '#4ea8de', '#56cfe1', '#64dfdf'],
    'green': ['#004b23', '#007200', '#38b000', '#70e000', '#ccff33']
};

// Possible difficulty depending on value
const possibleDiff = {
    '0': 'Easy',
    '1': 'Normal',
    '2': 'Hard'
};

// Create and insert balls in ballArray
function createBall() {
    // Setting random variables
    let radius = randomIntFromRange(20, 50);
    let x = randomIntFromRange(radius, (canvas.width - radius));
    let y = 10;
    let dx = randomIntFromRange(-10, 10);
    let dy = randomIntFromRange(5, 10);
    let color = '';

    // Setting color depending on theme
    if (chosenColor in themes) {
        const theme = themes[chosenColor];
        color = theme[randomIntFromRange(0, theme.length - 1)];
    }

    // Inserting ball Object
    ballArray.push(new Ball(x, y, dx, dy, radius, color, '', false));
    
    setTimeout(createBall, spawnRate); // Delay for 300ms between each ball creation
}

// Change balls' color depending on theme selected by the user
function ballUpdateColor() {
    // Changing color for each ball in ballArray
    if (chosenColor in themes) {
        const theme = themes[chosenColor];
        ballArray.forEach(ball => {
            ball.color = theme[colorIndex % theme.length];
            colorIndex++;
        });
    }
}

// Change title color depending on theme selected by the user
const titleColorChange = setInterval(() => {
    if (chosenColor in themes) {
        const theme = themes[chosenColor];
        document.getElementById('title').style.color = theme[colorIndex % theme.length];
        colorIndex++;
    }
}, 1000);

// Animate canvas
function animate() {
    // Loop animation
    requestAnimationFrame(animate);

    // Clear canvas
    clearCanvas();

    // Update balls in ballArray
    ballArray.forEach(ball => ball.update(ballArray));
}

// Set element behind other element by changing their z-index
function putBack() {
    zPosition = -zPosition;
    document.getElementById('info-section').style.zIndex = zPosition; // Set z-index to a value that places the element behind others
}

//! Event listener
// Execute upon page load
window.onload = () => {
    ballArray = []; // Clear all balls in array

    // Delete balls to prevent overload
    setInterval(() => {
        // Check if there are 30 generated
        if (ballArray.length >= 30) {
            ballArray.shift();
        }
    }, spawnRate);

    // Get chosen customisation if exist
    chosenColor = localStorage.getItem('color') || 'red';
    chosenText = localStorage.getItem('text') || 'shrek';
    chosenDiff = localStorage.getItem('diff') || '1';

    // Check chosen customisation
    document.getElementById(chosenColor).checked = true;
    document.getElementById(chosenText).checked = true;
    document.getElementById('difficulty').value = chosenDiff;
    document.getElementById('difficulty-text').textContent = possibleDiff[chosenDiff];

    createBall(); // Start createBall() loop
    animate(); // Start animate() loop
}

// Reset canvas size upon page resize
window.addEventListener('resize', () => {
    setCanvasSize();
})

// Theme color selection
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('change', (event) => {
        chosenColor = event.target.value;
        ballUpdateColor(); // Update color of every ball
    });
});

// Text choice selection
document.querySelectorAll('.text-option').forEach(option => {
    option.addEventListener('change', (event) => {
        chosenText = event.target.value;
    })
})

// Difficulty selection
document.getElementById('difficulty').addEventListener('input', () => {
    chosenDiff = difficulty.value; // Set chosenDiff to the value of difficulty range input

    // Set text for difficulty
    document.getElementById('difficulty-text').textContent = possibleDiff[chosenDiff];
});

// Set elements to their respective place when <Esc> is pressed
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { // Check if the key code is equal to the keycode of the "Escape" key
        putBack();
    }
});

// Set elements to their respective place when button is pressed
document.getElementById('setting-button').addEventListener('click', () => {
    putBack();
})

// Event listener for play button
document.getElementById('play-button').addEventListener('click', () => {
    // Send info to localStorage
    localStorage.setItem('text', chosenText);
    localStorage.setItem('color', chosenColor);
    localStorage.setItem('diff', chosenDiff);

    // Redirect page
    window.location.href = './game.html';
});
