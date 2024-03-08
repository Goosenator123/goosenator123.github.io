// Retrieving references from HTML
const canvas = document.getElementById('canvas');  // Canvas element
const userInput = document.getElementById('typing-area');  // User input element
const cover = document.getElementById('cover');  // Cover element
const infoButton = document.getElementById('info-button');  // Information button element
const infoSection = document.getElementById('instruction-section');  // Information section element
const infoIcon = document.getElementById('info-icon');  // Information icon element

// Retrieving the 2D rendering context
const ctx = canvas.getContext('2d');

// Setting canvas size to full web page 
canvas.width = innerWidth;
canvas.height = (innerHeight * 0.8);

// Declaring variables
let condition = 1;  // Game condition variable
let gravity = 0.1; // Acceleration due to gravity
let friction = 0.65; // Friction coefficient
let points = 0; // Player points
let inputPosition = 90; // Default user input position
let difficulty;  // Difficulty level
let theme;  // Theme color
let chosenText;  // Chosen text for word generation
let spawnRate = 0; // Ball spawn rate
let deleteInterval = 0; // Ball delete rate
let zPosition = 100; // Z-index position
let chosenWord = ''; // Random chosen word

// Ball Array
let ballArray = [];

// Color Arrays
const redTheme = [
    '#9d0208',
    '#d00000',
    '#e85d04',
    '#f48c06',
    '#ffba08'
];
const blueTheme = [
    '#6930c3',
    '#5e60ce',
    '#4ea8de',
    '#56cfe1',
    '#64dfdf'
];
const greenTheme = [
    '#004b23',
    '#007200',
    '#38b000',
    '#70e000',
    '#ccff33'
];

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
    if (theme === 'red') {
        color = redTheme[randomIntFromRange(0, 4)];
    } else if (theme === 'green') {
        color = greenTheme[randomIntFromRange(0, 4)];
    } else if (theme === 'blue') {
        color = blueTheme[randomIntFromRange(0, 4)];
    }

    // Setting text depending on the one chosen
    if (chosenText === 'shrek') {
        getRandomWord(shrekMovie);
    } else if (chosenText === 'bee') {
        getRandomWord(beeMovie);
    } else if (chosenText === 'geneva') {
        getRandomWord(genevaConvention);
    } else if (chosenText === 'bible') {
        getRandomWord(holyBible);
    }

    // Insert ball in ballArray
    ballArray.push(new Ball(x, y, dx, dy, radius, color, chosenWord, true, true, deleteInterval));
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
    infoSection.style.zIndex = zPosition; // Set z-index to a value that places the element behind others
    userInput.style.top = -inputPosition + '%';
    cover.style.zIndex = zPosition;
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
    theme = localStorage.getItem('color');
    difficulty = localStorage.getItem('diff');
    chosenText = localStorage.getItem('text');

    // Setting word spawn rate depending on difficulty
    if (difficulty === '0') {
        spawnRate = 2000;
        deleteInterval = 10000;
    } else if (difficulty === '1') {
        spawnRate = 1400;
        deleteInterval = 7000;
    } else {
        spawnRate = 800;
        deleteInterval = 4000;
    }
    
    // Start canvas animation
    animate();

    // Start generating word
    setInterval(() => {
        if (condition === 1) {
            generateWord();
        }
    }, spawnRate);
}

// Resetting canvas size upon page resize
window.addEventListener('resize', () => {
    // Setting canvas size to full web page 
    canvas.width = innerWidth;
    canvas.height = (innerHeight * 0.8);
})

// Submit word from input box if <Space> or <Enter> keys are pressed
document.addEventListener('keydown', function(event) {
    if (event.key === ' ' || event.key === 'Enter') {
        // Space or Enter key is pressed
        for (let i = 0; i < ballArray.length; i++) {
            if (userInput.value.trim() === ballArray[i].text) {
                ballArray.splice(i, 1);
                points += 10;
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
infoButton.addEventListener('click', () => {
    putBack();
    condition = -condition;
});