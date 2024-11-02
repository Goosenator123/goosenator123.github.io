//! ====== Imports ======
import '../styles/index.css';
import '../styles/setting.css';
import bgMusic from '../sound/backgroundMusic.mp3';
import gameOverSound from '../sound/gameOver.mp3';
import goalSound from '../sound/goalSound.mp3';
import { Ball, Obstacle, Paddle, clearCanvas, getRandomIntegerFromRange, getDistance } from './utility.js';

//! ====== Cached HTML Elements ======
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const colorButtons = document.getElementsByClassName('color-button');
const difficultyButtons = document.getElementsByClassName('difficulty-button');
const obstacleButtons = document.getElementsByClassName('obstacle-button');
const obstacleQuantityInput = document.getElementById('obstacle-quantity-input');
const playAgainstAiButton = document.getElementById('start-button');
const playAgainstPlayerButton = document.getElementById('start-button2');
const mainMenu = document.getElementById('main-menu');
const instructionSection = document.getElementById('instructions-section');
const gameOverSection = document.getElementById('game-over-section');
const restartButton = document.getElementById('restart-button');
const elementsToColor = {
    gameTitle: document.getElementById('game-title'),
    footerText: document.getElementById('footer-text'),
    settingIcon: document.getElementById('setting-icon'),
    settingTitle: document.getElementById('setting-title'),
    difficultyTitle: document.getElementById('difficulty-title'),
    colorTitle: document.getElementById('color-title'),
    obstacleTitle: document.getElementById('obstacle-title'),
}
const elementsWithBorder = {
    startButton: document.getElementById('start-button'),
    startButton2: document.getElementById('start-button2'),
    settingSection: document.getElementById('setting-section'),
    settingHeader: document.getElementById('setting-header'),
    difficultySection: document.getElementById('difficulty-section'),
    colorSection: document.getElementById('color-section'),
}

//! ====== Game State Variables ======
let playerPaddle, otherPaddle, ball, player2, timeOutId;
let points = { player1: 0, player2: 0 };
let playerInput = { up: false, down: false };
let otherPlayerInput = { up: false, down: false };
let isGameOn = false, isPaused = true, isGameOver = false;
let obstacles = [];
let colorIndex = 0;
let ballAcceleration = 1.0001;
let zIndex = 100;
let setColor, setDifficulty, obstacleState, maxObstacles;

// Difficulty settings
const difficultyObject = {
    'easy': { playerSpeed: 12, aiSpeed: 5, playerPaddleHeight: 200, aiPaddleHeight: 200 },
    'medium': { playerSpeed: 12, aiSpeed: 7.5, playerPaddleHeight: 150, aiPaddleHeight: 200 },
    'hard': { playerSpeed: 12, aiSpeed: 10, playerPaddleHeight: 100, aiPaddleHeight: 200 },
};

// Sound settings
const backgroundMusic = new Audio(bgMusic);
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

const gameOverMusic = new Audio(gameOverSound);
gameOverMusic.loop = true;
gameOverMusic.volume = 0.5;

const ballGoalSound = new Audio(goalSound);
ballGoalSound.volume = 0.5;

//! ====== Color Arrays ======
const colorObject = {
    'red': ['hsl(0, 100%, 20%)', 'hsl(0, 100%, 30%)', 'hsl(39, 100%, 50%)', 'hsl(40, 100%, 53%)', 'hsl(40, 100%, 60%)'],
    'blue': ['hsl(210, 100%, 20%)', 'hsl(210, 100%, 40%)', 'hsl(200, 100%, 40%)', 'hsl(194, 100%, 45%)', 'hsl(195, 100%, 85%)'],
    'green': ['hsl(160, 100%, 10%)', 'hsl(120, 100%, 20%)', 'hsl(120, 100%, 25%)', 'hsl(140, 100%, 40%)', 'hsl(120, 100%, 50%)']
};

//! ====== Utility Functions ======
// Initialize canvas size
function setCanvasSize() {
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.85;
}

// Draw dotted line in the center of the canvas
function drawDottedLine() {
    const middleX = canvas.width / 2;
    ctx.beginPath();
    ctx.setLineDash([50, 50]);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 10;
    ctx.moveTo(middleX, 30);
    ctx.lineTo(middleX, canvas.height);
    ctx.stroke();
}

// Apply color to various elements
function applyColorToElements(color) {
    const colorValue = colorObject[color][colorIndex % colorObject[color].length];

    for (const element in elementsToColor) {
        elementsToColor[element].style.color = colorValue;
    }

    for (const element in elementsWithBorder) {
        elementsWithBorder[element].style.borderColor = colorValue;
    }
    colorIndex++;
}

// Retrieve stored game settings
function getStoredSettings() {
    const storedSettings = JSON.parse(localStorage.getItem("pongSettings"));
    obstacleState = storedSettings.obstacleState;
    maxObstacles = storedSettings.obstacleNumber;
    setColor = storedSettings.color;
    setDifficulty = storedSettings.difficulty;
}

// Generalized function to update paddle position
function updatePaddle(targetPaddle, input, speed) {
    const paddleDy = input.up ? -speed : input.down ? speed : 0;
    targetPaddle.update(paddleDy, isGameOn);
}

// Update user paddle
function updateUserPaddle(targetPaddle) {
    updatePaddle(targetPaddle, playerInput, 10);
}

// Update other player paddle
function updateOtherPlayerPaddle(targetPaddle) {
    updatePaddle(targetPaddle, otherPlayerInput, 10);
}

// Update AI paddle to follow the ball
function updateAiPaddle(targetPaddle) {
    const aiSpeed = difficultyObject[setDifficulty].aiSpeed;
    const paddleDy = targetPaddle.y + targetPaddle.height / 2 < ball.y ? aiSpeed : targetPaddle.y + targetPaddle.height / 2 > ball.y ? -aiSpeed : 0;
    targetPaddle.update(paddleDy, isGameOn);
}

// Check if a goal has been scored
function checkGoal() {
    if (!isGameOn) return;

    if (ball.x < 0 || ball.x > canvas.width) restartRound(ball.x > canvas.width);
}

// Restart round with score update
function restartRound(playerWin1) {
    playerWin1 ? points.player1++ : points.player2++;
    if (points.player1 >= 10 || points.player2 >= 10) {
        gameOver(points.player1 >= 10 ? 'Player 1' : player2);
        return;
    }
    ballGoalSound.play();
    document.getElementById('player1-score').textContent = points.player1;
    document.getElementById('player2-score').textContent = points.player2;
    setBall();
    setObstacle();
}

// Game over function
function gameOver(winner) {
    isGameOn = false;
    isPaused = isGameOver = true;
    gameOverSection.style.zIndex = 1;
    document.getElementById('winner-text').textContent = `${winner} wins!`;
    backgroundMusic.pause();
    gameOverMusic.play();
}

// Initialize ball properties
function setBall() {
    const ballRadius = 20;

    // Set ball speed based on difficulty
    const ballDx = getRandomSpeed(-12, 12, 10);
    const ballDy = getRandomSpeed(-8, 8, 6);

    // If timeout is already set, clear it
    if (timeOutId) clearTimeout(timeOutId);

    // Set ball to center of canvas
    ball = new Ball(canvas.width / 2, canvas.height / 2, ballRadius, 0, 0, colorObject[setColor]);

    // Launch ball after 1 second
    timeOutId = setTimeout(() => ball = new Ball(canvas.width / 2, canvas.height / 2, ballRadius, ballDx, ballDy, colorObject[setColor]), 1000);
}

// Helper function to get a random speed value
function getRandomSpeed(min, max, threshold) {
    let speed;
    do {
        speed = getRandomIntegerFromRange(min, max);
    } while (Math.abs(speed) < threshold);
    return speed;
}

// Initialize paddle properties
function setPaddle() {
    const paddleWidth = 30;
    const playerPaddleHeight = difficultyObject[setDifficulty].playerPaddleHeight;
    const aiPaddleHeight = difficultyObject[setDifficulty].aiPaddleHeight;
    const playerX = 60;
    const otherPlayerX = canvas.width - paddleWidth - 60;
    const playerY = canvas.height / 2 - playerPaddleHeight / 2;
    const aiPlayerY = canvas.height / 2 - aiPaddleHeight / 2;

    playerPaddle = new Paddle(playerX, playerY, paddleWidth, playerPaddleHeight);

    // Set other paddle based on player2 type
    const otherPaddleHeight = player2 === 'Player 2' ? playerPaddleHeight : aiPaddleHeight;
    const otherPaddleY = player2 === 'Player 2' ? playerY : aiPlayerY;
    otherPaddle = new Paddle(otherPlayerX, otherPaddleY, paddleWidth, otherPaddleHeight);
}

// Initialize obstacle properties
function setObstacle() {
    obstacles = [];
    const obstacleRadius = 30;
    const horizontalPadding = 300;
    const verticalPadding = 200;

    while (obstacles.length < maxObstacles && obstacleState === 'on') {
        const obstacleColor = colorObject[setColor][getRandomIntegerFromRange(0, colorObject[setColor].length - 1)];
        const x = getRandomIntegerFromRange(obstacleRadius + horizontalPadding, canvas.width - obstacleRadius - horizontalPadding);
        const y = getRandomIntegerFromRange(obstacleRadius + verticalPadding, canvas.height - obstacleRadius - verticalPadding);
        const dy = getRandomIntegerFromRange(-3, 3);

        if (!obstacles.some(obstacle => getDistance({ x, y }, obstacle) < obstacleRadius * 2) && dy !== 0) {
            obstacles.push(new Obstacle(x, y, obstacleRadius, dy, obstacleColor));
        }
    }
}

//! ====== Event Listeners ======
// General function to handle button clicks
function setupButtonListeners(buttons, setValue) {
    for (const button of buttons) {
        button.addEventListener('click', () => {
            setValue(button.value);
            startGame();
        });
    }
}

// Set up color, difficulty, and obstacle state buttons
setupButtonListeners(colorButtons, (value) => setColor = value);
setupButtonListeners(difficultyButtons, (value) => setDifficulty = value);
setupButtonListeners(obstacleButtons, (value) => obstacleState = value);

// Change obstacle quantity based on input value
obstacleQuantityInput.addEventListener('input', ({ target: { value } }) => {
    maxObstacles = Number(value) + 1;
    if (obstacleState === 'on') startGame();
});

// Function to start the game with the specified player type
function startGameWithPlayerType(type) {
    mainMenu.style.zIndex = -1;
    instructionSection.style.zIndex = 1;
    isGameOn = true;
    isGameOver = false;
    player2 = type;
    localStorage.setItem('isGameOn', isGameOn);
    backgroundMusic.play();
    startGame();
}

// Start game on button clicks
playAgainstAiButton.addEventListener('click', () => startGameWithPlayerType('AI'));
playAgainstPlayerButton.addEventListener('click', () => startGameWithPlayerType('Player 2'));

// Restart game on button click
restartButton.addEventListener('click', () => location.reload());

// Resize canvas on window resize
window.addEventListener('resize', () => {
    setCanvasSize();
    startGame();
});

// Paddle movement on key press
window.addEventListener('keydown', (event) => {
    if (isGameOn) {
        if (event.key === 'w' || event.key === 's') {
            playerInput[event.key === 'w' ? 'up' : 'down'] = true;
        } 
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            otherPlayerInput[event.key === 'ArrowUp' ? 'up' : 'down'] = true;
        }
    }
});

window.addEventListener('keyup', (event) => {
    if (isGameOn) {
        if (event.key === 'w' || event.key === 's') {
            playerInput[event.key === 'w' ? 'up' : 'down'] = false;
        }
         if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            otherPlayerInput[event.key === 'ArrowUp' ? 'up' : 'down'] = false;
        }
    }
});

// Pause/Unpause game on 'Escape' key press
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isGameOn) {
        zIndex = -zIndex;
        instructionSection.style.zIndex = zIndex;
        isPaused = !isPaused;
    }
});

//! ====== Game Functions ======
function animate() {
    clearCanvas();
    if (isGameOver) return;
    drawDottedLine();

    if (!isPaused) {
        ball.update(playerPaddle, otherPaddle, obstacles, ballAcceleration);
        obstacles.forEach(obstacle => obstacle.update());
        updateUserPaddle(playerPaddle);

        // Update the other paddle based on player2 type
        if (player2 === 'AI') updateAiPaddle(otherPaddle);
        else if (player2 === 'Player 2') updateOtherPlayerPaddle(otherPaddle);
    } else if (!isGameOn) {
        obstacles.forEach(obstacle => obstacle.update());
        for (const paddle of [playerPaddle, otherPaddle]) paddle.update(0, isGameOn);
    }

    checkGoal();
    requestAnimationFrame(animate);
}

function startGame() {
    setCanvasSize();
    setPaddle();
    setBall();
    setObstacle();
}

function main() {
    setTimeout(() => {
        getStoredSettings();
        startGame();
        requestAnimationFrame(animate);
        localStorage.setItem('isGameOn', isGameOn);
    }, 100);
}

//! ====== Initialization ======
setInterval(() => applyColorToElements(setColor), 1000);
main();