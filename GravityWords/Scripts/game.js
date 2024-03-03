// Retrieving references from HTML
const canvas = document.getElementById('canvas');
const userInput = document.getElementById('typing-area');
const cover = document.getElementById('cover');
const infoButton = document.getElementById('info-button');
const infoSection = document.getElementById('instruction-section');
const infoIcon = document.getElementById('info-icon');

// Retrieving the 2D rendering context
const ctx = canvas.getContext('2d');

// Setting canvas size to full web page 
canvas.width = innerWidth;
canvas.height = (innerHeight * 0.8);

// Declaring variables
let condition = 1;
let bounces = 2;
let gravity = 0.1; // Setting acceleration speed the ball falls
let friction = 0.65; // Setting height lost after each bounce
let points = 0; // Set points
let inputPosition = 90; // Set defauly user input position
let difficulty;
let theme;
let chosenText;
let spawnRate = 0; // Set ball spawn rate
let zPosition = 100; // Set z-index
let chosenWord = ''; // Set random chosen word to be none

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
    let radius = 80;
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
        // Choose random word from the shrek movie script
        getRandomWord(shrekMovie);
    } else if (chosenText === 'bee') {
        // Choose random word from the bee movie script
        getRandomWord(beeMovie);
    } else if (chosenText === 'geneva') {
        // Choose random word from the geneva convention
        getRandomWord(genevaConvention);
    } else if (chosenText === 'bible') {
        // Choose random word from the Holy Bible Babyyyy
        getRandomWord(holyBible);
    }

    // Insert ball in ballArray
    ballArray.push(new Ball(x, y, dx, dy, radius, color, chosenWord));
}

// Function that checks if the ball bounced
function checkBounce(ball) {
    if ((ball.bounce) === bounces) {
        ballArray.shift();
    }
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
            checkBounce(ballArray[i]); // Check if ball need to be deleted
            ballArray[i].update(); // Update ball coordinates
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
    console.log(userInput.style.zIndex)
}

// Get random word from string
function getRandomWord(sentence) {
    // Split the sentence into an array of words
    const words = sentence.split(/\s+/);
    
    do {
        // Generate a random index
        const randomIndex = Math.floor(Math.random() * words.length);
        chosenWord = words[randomIndex];
    } while (chosenWord.length > 10);
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
        spawnRate = 2400;
    } else if (difficulty === '1') {
        spawnRate = 1600;
    } else {
        spawnRate = 800;
    }
    
    // Start canvas animation
    animate();

    // Start generating word
    setInterval(() => {
        if (condition === 1) {
            console.log(chosenText)
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
    infoIcon.classList.toggle('spin-animation');
    condition = -condition;
});