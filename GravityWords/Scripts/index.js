// Retrieving references from HTML
const canvas = document.querySelector('canvas');  // Canvas element
const difficultyInput = document.getElementById('difficulty-input');
const difficultyLabel = document.getElementById('difficulty-label');
const timeLabel = document.getElementById('time-label');
const timeInput = document.getElementById('time-input');

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
let chosenTime = 0; // Default time
let chosenDiff = '1'; // Default difficulty level
let gravity = (performance.now()/3000); // Acceleration due to gravity
let friction = 0.9; // Friction coefficient
let zPosition = 100; // Z-index position
let spawnRate = 100; // Set spawn rate for balls to (0.1s)

// Set Audio
let bgMusic = new Audio('./Assets/menuMusic.mp3'); // Set background music
bgMusic.volume = 0.2; // Set volume to 20% of its original volume
bgMusic.loop = true; // Make bgMusic loop

// Color Arrays
const themes = {
    'red': ['#6a040f', '#9d0208', '#e85d04', '#f48c06', '#faa307'],
    'blue': ['#03045e', '#0077b6', '#0096c7', '#00b4d8', '#ade8f4'],
    'green': ['#004b23', '#006400', '#008000', '#38b000', '#70e000']
};

// Possible difficulty depending on value
const possibleDiff = {
    '0': 'Easy',
    '1': 'Normal',
    '2': 'Hard'
};

// Possible time depending on value
const possibleTime = {
    '0': '1 minute',
    '1': '2 minute',
    '2': '3 minute',
    '3': '4 minute',
    '4': '5 minute'
}

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
}, 800);

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
    bgMusic.play();

    // Delete balls to prevent overload
    setInterval(() => {
        // Check if there are 69 balls generated
        if (ballArray.length >= 69) {
            ballArray.shift();
        }
    }, spawnRate);

    // Get chosen customisation if exist
    chosenColor = localStorage.getItem('color') || 'red';
    chosenText = localStorage.getItem('text') || 'shrek';
    chosenDiff = localStorage.getItem('diff') || '1';
    chosenTime = localStorage.getItem('time') || '2';

    // Check chosen customisation
    document.getElementById(chosenColor).checked = true;
    document.getElementById(chosenText).checked = true;
    document.getElementById('title').style.color = themes[chosenColor][themes[chosenColor].length - 1];
    difficultyInput.value = chosenDiff;
    difficultyLabel.textContent = possibleDiff[chosenDiff];
    timeLabel.textContent = possibleTime[chosenTime];
    timeInput.value = chosenTime;

    // Get array of score from local storage
    let storedScores = JSON.parse(localStorage.getItem('score')) || [];

    // Check if array isnt empty
    if (storedScores.length > 0) {
        // Get biggest score
        const biggestScore = Math.max(...storedScores);

        // Display biggest score
        document.getElementById('highscore').textContent = `${biggestScore} points`;
    } else {
        // Display 0 score
        document.getElementById('highscore').textContent = `0 points`;
    }

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
difficultyInput.addEventListener('input', (event) => {
    chosenDiff = event.target.value; // Set chosenDiff to the value chosen

    // Set text for difficulty
    difficultyLabel.textContent = possibleDiff[chosenDiff];
});

// Time selection
timeInput.addEventListener('input', (event) => {
    chosenTime = event.target.value; // Set chosenTim to the value chosen

    // Set text for time
    timeLabel.textContent = possibleTime[chosenTime];
})

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
    localStorage.setItem('time', chosenTime);

    // Redirect page
    window.location.href = './game.html';
});
