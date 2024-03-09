// Retrieving references from HTML
const canvas = document.getElementById('canvas');  // Reference to the canvas element
const userInput = document.getElementById('typing-area');  // Reference to the user input element
const cover = document.getElementById('cover');  // Reference to the cover element

// Retrieving the 2D rendering context
const ctx = canvas.getContext('2d');

// Setting canvas size
function setCanvasSize() {
    canvas.width = innerWidth;
    canvas.height = (innerHeight * 0.8);
}
setCanvasSize(); // Set canvas size initially

// Declaring variables
let condition = 1;  // Game condition variable
let gravity = 0.1; // Acceleration due to gravity
let friction = 0.65; // Friction coefficient
let points = 0; // Player points
let inputPosition = 90; // Default user input position
let difficulty;  // Difficulty level
let chosenTheme;  // Chosen theme color
let chosenText;  // Chosen text for word generation
let spawnRate = 0; // Ball spawn rate
let zPosition = 100; // Z-index position
let chosenWord = ''; // Random chosen word
let addPoints = 100;

// Ball Array
let ballArray = [];

// Color Arrays
const themes = {
    'red': ['#9d0208', '#d00000', '#e85d04', '#f48c06', '#ffba08'],
    'blue': ['#6930c3', '#5e60ce', '#4ea8de', '#56cfe1', '#64dfdf'],
    'green': ['#004b23', '#007200', '#38b000', '#70e000', '#ccff33']
};

// Text array
const texts = {
    'shrek': shrekMovie,
    'bee': beeMovie,
    'geneva': genevaConvention,
    'bible': holyBible
}

// Possible difficulty
const possibleDiff = {
    '0': 2000,
    '1': 1400,
    '2': 800
}

// Randomly generate word with the text the user chose
function generateWord() {
    // Setting random variables
    let radius = 100;
    let x = randomIntFromRange(radius, (canvas.width - radius));
    let y = 10;
    let dx = randomIntFromRange(-3, 3);
    let dy = 1;
    let color;
    
    // Setting color depending on theme chosen
    if (chosenTheme in themes) {
        const theme = themes[chosenTheme];
        color = theme[randomIntFromRange(0, (theme.length - 1))];
    }

    // Setting text depending on the one chosen
    getRandomWord(texts[chosenText]);

    // Insert ball in ballArray
    ballArray.push(new Ball(x, y, dx, dy, radius, color, chosenWord, true));
}

// Animate canvas
function animate() {
    // create loop
    requestAnimationFrame(animate);

    // Check if game is paused
    if (condition === 1) {
        // Clear canvas by redrawing background
        clearCanvas();

        // Update every ball in ballArray
        for (let i = 0; i < ballArray.length; i++) {
            ballArray[i].update(ballArray); // Update ball coordinates
        }
    }
}

// Set element behind other element with by changing their z-index
function putBack () {
    zPosition = -zPosition
    inputPosition = -inputPosition
    document.getElementById('instruction-section').style.zIndex = zPosition; // Set z-index to a value that places the element behind others
    cover.style.zIndex = zPosition;
    userInput.style.top = -inputPosition + '%';
}

// Get random word from string
function getRandomWord(sentence) {
    const words = sentence.split(/\s+/);  // Split sentence into words
    
    do {
        const randomIndex = Math.floor(Math.random() * words.length);  // Generate random index
        chosenWord = words[randomIndex];  // Set chosen word
    } while (chosenWord.length > 10);  // Ensure chosen word is not too long
}

//! Event listener
// Execute upon page load
window.onload = () => {
    // Reseting variables
    condition = -1;
    userInput.style.top = -inputPosition + '%';
    cover.style.zIndex = 100;

    // Retrieve user choices from localStorage
    chosenTheme = localStorage.getItem('color');
    difficulty = localStorage.getItem('diff');
    chosenText = localStorage.getItem('text');

    // Setting word spawn rate depending on difficulty
    spawnRate = possibleDiff[difficulty];
    
    // Start canvas animation
    animate();

    // Delete a word each time a word gets generated
    setInterval(() => {
        // Check if paused or there are at least 6 words on the screen
        if (condition === 1 && ballArray.length >= 6 ) {
            ballArray.shift();
        }
    }, spawnRate);

    // Start generating word
    setInterval(() => {
        // Check if paused
        if (condition === 1) {
            generateWord();
        }
    }, spawnRate);
}

// Resetting canvas size upon page resize
window.addEventListener('resize', () => {
    // Reset canvas size
    setCanvasSize();
})

// Submit word from input box if <Space> or <Enter> keys are pressed
document.addEventListener('keydown', function(event) {
    if (event.key === ' ' || event.key === 'Enter') {
        // Space or Enter key is pressed
        for (let i = 0; i < ballArray.length; i++) {
            if (userInput.value.trim() === ballArray[i].text) {
                ballArray.splice(i, 1);
                points += addPoints;
                localStorage.setItem('highscore', points);
            }
        }

        // Reset input value
        userInput.value = '';
    }
});

// Set elements to their respective place when <Esc> is pressed
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { // Check if the key code is equal to the keycode of the "Escape" key
        putBack();
        condition = -condition;
        userInput.focus(); // Make user select input element
    }
});

// Set elements to their respective place when button is pressed
document.getElementById('info-button').addEventListener('click', () => {
    putBack();
    condition = -condition;
    
});