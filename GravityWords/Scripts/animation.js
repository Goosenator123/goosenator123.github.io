// Retrieving references from HTML
const canvas = document.querySelector('canvas');
const title = document.getElementById('title');
const playButton = document.getElementById('play-button');
const difficulty = document.getElementById('difficulty');
const difficultyText = document.getElementById('difficulty-text');
const redRadio = document.getElementById('red');

// Retrieving the 2D rendering context
const ctx = canvas.getContext('2d');

// Setting canvas size to full web page 
canvas.width = innerWidth;
canvas.height = innerHeight;

// Declaring variables
let ballArray = [];
let chosenColor = 'red'; // Default color
let chosenText = 'shrek'; // Default text :)
let colorIndex = 0; // First color of colorArrays
let chosenDiff = '1'; // Normal Difficulty
let gravity = 0.3; // Setting acceleration speed the ball falls
let friction = 0.9; // Setting height lost after each bounce

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
    let radius = randomIntFromRange(10, 40);
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
    ballArray.push(new Ball(x, y, dx, dy, radius, color));
    
    setTimeout(createBall, 300); // Delay for 300ms between each ball creation

    // Starts clearing balls in ballArray after 30000ms
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

            // Cycle throught every index of color inside of the array
            colorIndex = (colorIndex + 1) % greenTheme.length;
        } else if (chosenColor === 'blue') {
            ball.color = blueTheme[colorIndex];

            // Cycle throught every possible color inside of the array
            colorIndex = (colorIndex + 1) % blueTheme.length;
        } else {
            ball.color = redTheme[colorIndex];

            // Cycle throught every possible color inside of the array
            colorIndex = (colorIndex + 1) % redTheme.length;
        }
    });
}

// Change title Colour depending on theme selected by the user
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
    // Make a loop
    requestAnimationFrame(animate);

    // Clear canvas to simulate movement
    clearCanvas();

    // Update the every balls in ballArray
    for (let i = 0; i < ballArray.length; i++) {
        ballArray[i].update(); // Update ball coordinates
    }
}

//! Event listener
// Execute upon page load
window.onload = () => {
    ballArray = []; // Clear array
    createBall(); // Start createBall() loop
    animate(); // Start animate() loop
}

// Resetting canvas size upon page resize
window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})

// Theme color selection
const colorChoices = ['red', 'blue', 'green']; // Array of possible color option

// Create addEventListerner for every colorChoices input radio
colorChoices.forEach(color => {
    document.getElementById(color).addEventListener('change', () => {
        chosenColor = color; // Change color depending on the radio changed
        ballUpdateColor(); // Update color of every ball
    });
});

// Text choice selection
const textChoices = ['shrek', 'bee', 'geneva', 'bible']; // Array of every text script

// Create addEventListner for every textChoices input radio
textChoices.forEach(choice => {
    document.getElementById(choice).addEventListener('change', () => {
        chosenText = choice; // Change selected text
    });
});

// Diffuculty selection
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

// Start game
playButton.addEventListener('click', () => {
    // Send info to localStorage
    localStorage.setItem('text', chosenText);
    localStorage.setItem('color', chosenColor);
    localStorage.setItem('diff', chosenDiff);

    // Redirect page
    window.location.href = './game.html';
});

// Testing functions
function check() {
    console.log('executed')
    document.getElementById("red").checked = true;
  }
check();