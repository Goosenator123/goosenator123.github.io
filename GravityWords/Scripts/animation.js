// Retrieving references from HTML
const canvas = document.querySelector('canvas');  // Canvas element
const title = document.getElementById('title');  // Title element
const playButton = document.getElementById('play-button');  // Play button element
const difficulty = document.getElementById('difficulty');  // Difficulty input element
const difficultyText = document.getElementById('difficulty-text');  // Difficulty text element
const redRadio = document.getElementById('red');  // Red radio button element
const infoSection = document.getElementById('info-section');  // Information section element
const settingButton = document.getElementById('setting-button');  // Setting button element

// Retrieving the 2D rendering context
const ctx = canvas.getContext('2d');

// Setting canvas size to full web page 
canvas.width = innerWidth;
canvas.height = innerHeight;

// Declaring variables
let ballArray = [];  // Array to store balls
let chosenColor = 'red'; // Default color
let chosenText = 'shrek'; // Default text
let colorIndex = 0; // Index for cycling through colors in theme arrays
let chosenDiff = '1'; // Default difficulty level
let gravity = 0.3; // Acceleration due to gravity
let friction = 0.9; // Friction coefficient
let zPosition = 100; // Z-index position

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

// Create and insert balls in ballArray
let timer;
function createBall() {
    // Setting random variables
    let radius = randomIntFromRange(20, 50);
    let x = randomIntFromRange(radius, (canvas.width - radius));
    let y = 10;
    let dx = randomIntFromRange(-10, 10);
    let dy = randomIntFromRange(5, 10);
    let color = '';

    // Setting color depending on theme
    if (chosenColor === 'red') {
        color = redTheme[randomIntFromRange(0, 4)];
    } else if (chosenColor === 'green') {
        color = greenTheme[randomIntFromRange(0, 4)];
    } else if (chosenColor === 'blue') {
        color = blueTheme[randomIntFromRange(0, 4)];
    }

    // Inserting ball Object
    ballArray.push(new Ball(x, y, dx, dy, radius, color, '', false, false));
    
    setTimeout(createBall, 300); // Delay for 300ms between each ball creation

    // Start clearing balls in ballArray after 30000ms
    if (!timer) {
        timer = setTimeout(() => {
            // Set an interval to remove the first ball every 300ms
            timer = setInterval(() => {
                if (ballArray.length > 0) {
                    ballArray.shift(); // Remove the first ball from the array
                } else {
                    clearInterval(timer); // Clear interval if array is empty
                }
            }, 300);
        }, 30000);
    }
}

// Change balls' color depending on theme selected by the user
function ballUpdateColor() {
    // Changing color for each ball in ballArray
    ballArray.forEach(ball => {
        if (chosenColor === 'green') {
            ball.color = greenTheme[colorIndex];
            colorIndex = (colorIndex + 1) % greenTheme.length; // Cycle through every index of color inside the array
        } else if (chosenColor === 'blue') {
            ball.color = blueTheme[colorIndex];
            colorIndex = (colorIndex + 1) % blueTheme.length; // Cycle through every possible color inside the array
        } else {
            ball.color = redTheme[colorIndex];
            colorIndex = (colorIndex + 1) % redTheme.length; // Cycle through every possible color inside the array
        }
    });
}

// Change title color depending on theme selected by the user
const titleColorChange = setInterval(() => {
    if (chosenColor === 'green') {
        title.style.color = greenTheme[colorIndex];
        colorIndex = (colorIndex + 1) % greenTheme.length;
    } else if (chosenColor === 'blue') {
        title.style.color = blueTheme[colorIndex];
        colorIndex = (colorIndex + 1) % blueTheme.length;
    } else {
        title.style.color = redTheme[colorIndex];
        colorIndex = (colorIndex + 1) % redTheme.length;
    }
}, 1000);

// Animate canvas
function animate() {
    // Loop animation
    requestAnimationFrame(animate);

    // Clear canvas
    clearCanvas();

    // Update balls in ballArray
    for (let i = 0; i < ballArray.length; i++) {
        ballArray[i].update(ballArray); // Update ball coordinates
    }
}

// Set element behind other element by changing their z-index
function putBack() {
    zPosition = -zPosition;
    infoSection.style.zIndex = zPosition; // Set z-index to a value that places the element behind others
}

//! Event listener
// Execute upon page load
window.onload = () => {
    ballArray = []; // Clear array
    createBall(); // Start createBall() loop
    animate(); // Start animate() loop
}

// Reset canvas size upon page resize
window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})

// Theme color selection
const colorChoices = ['red', 'blue', 'green']; // Array of possible color options

// Add event listener for every colorChoices input radio
colorChoices.forEach(color => {
    document.getElementById(color).addEventListener('change', () => {
        chosenColor = color; // Change color depending on the selected radio button
        ballUpdateColor(); // Update color of every ball
    });
});

// Text choice selection
const textChoices = ['shrek', 'bee', 'geneva', 'bible']; // Array of text script options

// Add event listener for every textChoices input radio
textChoices.forEach(choice => {
    document.getElementById(choice).addEventListener('change', () => {
        chosenText = choice; // Change selected text
    });
});

// Difficulty selection
difficulty.addEventListener('input', () => {
    chosenDiff = difficulty.value; // Set chosenDiff to the value of difficulty range input
    if (chosenDiff === '1') {
        difficultyText.textContent = 'Normal';
    } else if (chosenDiff === '2') {
        difficultyText.textContent = 'Hard';
    } else {
        difficultyText.textContent = 'Easy';
    }
});

// Set elements to their respective place when <Esc> is pressed
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { // Check if the key code is equal to the keycode of the "Escape" key
        putBack();
    }
});

// Set elements to their respective place when button is pressed
settingButton.addEventListener('click', () => {
    putBack();
})

// Start game
playButton.addEventListener('click', () => {
    // Send info to localStorage
    localStorage.setItem('text', chosenText);
    localStorage.setItem('color', chosenColor);
    localStorage.setItem('diff', chosenDiff);

    // Redirect page
    window.location.href = './game.html';
});

//! Testing functions
function check() {
    console.log('executed')
    document.getElementById("red").checked = true;
}
check(); // Execute the check function
