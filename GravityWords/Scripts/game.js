// Retrieving references from HTML
const canvas = document.getElementById('canvas');  // Reference to the canvas element
const userInput = document.getElementById('typing-area');  // Reference to the user input element
const cover = document.getElementById('cover');  // Reference to the cover element
const timerBar = document.getElementById('timer-bar'); // Reference to the timer bar element

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
let addPoints = 100; // Points added per word typed
let targetPoints = 0;

// Set Audio
let bgMusic = new Audio('./Assets/gameMusic.mp3'); // Set background music
let correctSound = new Audio('./Assets/goodWord.mp3'); // Set sound for correct words
let penalitySound = new Audio('./Assets/penality.mp3'); // Set penality sound
bgMusic.volume = 0.2; // Set volume to 20%
correctSound.volume = 0.5; // Set volume to 50%
penalitySound.volume = 0.5; // Set volume to 50%
bgMusic.loop = true; // Loops bgMusic

// Ball Array
let ballArray = [];

// Color Arrays
const themes = {
    'red': ['#6a040f', '#9d0208', '#e85d04', '#f48c06', '#faa307'],
    'blue': ['#03045e', '#0077b6', '#0096c7', '#00b4d8', '#ade8f4'],
    'green': ['#004b23', '#006400', '#008000', '#38b000', '#70e000']
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

// Possible time depending on value
const possibleTime = {
    '0': 60,
    '1': 120,
    '2': 180,
    '3': 240,
    '4': 300
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

// Function to handle actions when pausing or unpausing
function togglePause() {
    putBack();
    condition = -condition;

    // Check if pause or unpaused
    if (condition === 1) {
        bgMusic.play(); // Play bgMusic when user unpauses
        userInput.focus(); // Make user select input element
    } else {
        bgMusic.pause(); // Pause music when user pauses
        userInput.blur(); // Make user unselect input element
    }
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
    let initialTimer = possibleTime[localStorage.getItem('time') || '2'];
    let timer = initialTimer;

    // Setting word spawn rate depending on difficulty
    spawnRate = possibleDiff[difficulty];

    // Update timer display and progress bar
    const updateTimer = () => {
        let minute = Math.floor(timer / 60); // Get minute
        let second = timer % 60; // Get second
        let secondString = second < 10 ? `0${second}` : second; // Turn second into 2 digits if it's below 10
        document.getElementById('time').textContent = `${minute}:${secondString}`; // Show
        let barLength = (timer / initialTimer) * 100;
        timerBar.style.width = `${barLength}%`;
        timerBar.style.backgroundColor = `hsl(${barLength}, 100%, 41%)`;
    };
    updateTimer(); // Set timer initially

    // Start canvas animation
    animate();

    // Generate word and delete word
    setInterval(() => {
        // Check if paused or there are at least 6 words on the screen
        if (condition === 1 && ballArray.length >= 6 ) {
            timer -= 3; // Penality
            penalitySound.currentTime = 0; // Set sound effect to beginning
            penalitySound.play(); // Play sound
            ballArray.shift(); // Remove word
        }

        // Check if paused
        if (condition === 1) {
            //  Generating word
            generateWord();
        }
    }, spawnRate);

    // Change time per second
    setInterval(() => {
        // Update timer
        if (condition === 1 && timer > 0) {
            timer -= 1; // Reduce timer by 1
            updateTimer();

            // Handle game over scenario
        } else if (timer <= 0) {
            // Get array of existing scores
            let storedScores = JSON.parse(localStorage.getItem('score')) || [];

            // Store new score in the array
            storedScores.push(points);

            // Set score array back to local storage with the help of JSON.stringify
            localStorage.setItem('score', JSON.stringify(storedScores));

            // Redirect if timer hits 0
            window.location.href = './gameOver.html';
        }
    }, 1000); // Per second
}

// Resetting canvas size upon page resize
window.addEventListener('resize', () => {
    // Reset canvas size
    setCanvasSize();
})

// Submit word from input box if <Space> or <Enter> keys are pressed
document.addEventListener('keydown', function(event) {
    // Space or Enter key is pressed
    if (event.key === ' ' || event.key === 'Enter') {
        // Cycle through all the words inside array
        for (let i = 0; i < ballArray.length; i++) {
            // Check if submitted word is inside array
            if (userInput.value.trim() === ballArray[i].text) {
                // Delete the word
                ballArray.splice(i, 1);

                // Play sound effect
                correctSound.currentTime = 0; // Set sound effect to beginning
                correctSound.play(); // Play the sound

                // Add points
                points += addPoints;

                // Show score over an interval
                const setPoints = setInterval(() => {
                    // Check if target reached the point earned
                    if (targetPoints !== points) {
                        // Add 1 to target
                        targetPoints += 1;

                        // Show score
                        document.getElementById('score').textContent = `${targetPoints} points`;
                    } else {
                        // Clear interval if target reached point earned
                        clearInterval(setPoints);
                    }
                }, 1);
            }
        }

        // Reset input value
        userInput.value = '';
    }
});

// Event listener for the Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { // Check if the key code is equal to the keycode of the "Escape" key
        togglePause();
    }
});

// Event listeners for resume buttons
const resumeButtons = ['info-button', 'resume-button'];
resumeButtons.forEach(id => {
    document.getElementById(id).addEventListener('click', togglePause); // Pause/unpause game
});


// Return to menu when button is pressed
document.getElementById('menu-button').addEventListener('click', () => {
    window.location.href = './index.html'
});