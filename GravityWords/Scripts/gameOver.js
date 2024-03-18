// Cached DOM References
const canvas = document.getElementById('canvas');
const scoreElement = document.getElementById('score');
const difficultyElement = document.getElementById('difficulty');
const timerElement = document.getElementById('timer');
const menuButton = document.getElementById('menu');
const tryAgainButton = document.getElementById('try-again');
const title = document.getElementById('title');

// Retrieving the 2D rendering context
const ctx = canvas.getContext('2d');

// Setting canvas size
function setCanvasSize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
setCanvasSize(); // Set canvas size initially

// Default values
let chosenColor = localStorage.getItem('color') || 'red';
let chosenDiff = localStorage.getItem('diff') ?? '2';
let chosenTime = localStorage.getItem('time') ?? '4';
let colorIndex = 0;
let ballArray = [];
let spawnRate = 100;
let gravity = 0.3;
let friction = 0.9; 

// Set audio
let gameOverSound = new Audio('./Assets/gameOverSound.wav'); // Set game over sound
gameOverSound.play(); // Play sound

// Theme colors
const themes = {
    'red': ['#6a040f', '#9d0208', '#e85d04', '#f48c06', '#faa307'],
    'blue': ['#03045e', '#0077b6', '#0096c7', '#00b4d8', '#ade8f4'],
    'green': ['#004b23', '#006400', '#008000', '#38b000', '#70e000']
};

// Difficulty levels
const possibleDiff = {
    '0': 'Easy',
    '1': 'Normal',
    '2': 'Hard'
};

// Time options
const possibleTime = {
    '0': '1 minute',
    '1': '2 minute',
    '2': '3 minute',
    '3': '4 minute',
    '4': '5 minute'
}

// Change title color depending on theme selected by the user
const titleColorChange = setInterval(() => {
    if (chosenColor in themes) {
        const theme = themes[chosenColor];
        document.getElementById('title').style.color = theme[colorIndex % theme.length];
        colorIndex++;
    }
}, 800);

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

// Display latest score
const storedScores = JSON.parse(localStorage.getItem('score')) || [];
const latestScore = storedScores.length > 0 ? storedScores[storedScores.length - 1] : 0;
scoreElement.textContent = `${latestScore} points`;

// Display chosen customizations
difficultyElement.textContent = possibleDiff[chosenDiff];
timerElement.textContent = possibleTime[chosenTime];

// Event listeners
window.onload = () => {
    createBall();
    animate();
}

menuButton.addEventListener('click', () => {
    window.location.href = './index.html';
});

tryAgainButton.addEventListener('click', () => {
    window.location.href = './game.html'
});
