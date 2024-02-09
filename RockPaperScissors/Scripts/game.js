// Declaring variables
const playerRock = document.getElementById('player-rock');
const playerPaper = document.getElementById('player-paper');
const playerScissors = document.getElementById('player-scissors');
const computerRock = document.getElementById('computer-rock');
const computerPaper = document.getElementById('computer-paper');
const computerScissors = document.getElementById('computer-scissors');
const playerHp = document.getElementById('player-hp-bar');
const computerHp = document.getElementById('computer-hp-bar');
const score = document.getElementById('score');

// Define an array of player choices and their corresponding names
const playerChoices = [
    { element: playerRock, choice: 'rock' },
    { element: playerPaper, choice: 'paper' },
    { element: playerScissors, choice: 'scissors' }
];

// Flag to track if selections are clickable
let isClickable = true;

// Variables to store game state
let playerChoice; // Current choice of the player
let computerChoice; // Current choice of the computer
let outcome; // Result of the game
let choice; // Temporary variable for animation
let computerLostHp = 0; // Amount of health lost by the computer
let playerLostHp = 0; // Amount of health lost by the player
let points = 0; // Points accumulated by the player
let targetPoints = 0; // Target point for the game
let addScore = 0; // Points gained per victory
let gameDiff = localStorage.getItem('diff'); // Difficulty level of the game
let hp = 0; // Variable to store hit points
let minusHp = 2; // Variable to subtract from hit points
let addTarget = 0; // Value to add to the target points

// Array of audio file paths
const audioFiles = ['./audio/bgRain.mp3', './audio/undertale-dmg.mp3', './audio/8bitSuccess.mp3', './audio/bell.wav'];

// Array to store Audio objects
let audios = [];

// Function to load audio files and create Audio objects
function loadAudios() {
    audios = audioFiles.map(file => {
        const audio = new Audio(file);
        audio.volume = 0.3; // Set initial volume
        return audio;
    });
}

// Function to play audio by index
function playAudio(index) {
    if (index >= 0 && index < audios.length) {
        audios[index].currentTime = 0; // Rewind audio to start
        audios[index].play(); // Play audio
    }
}

// Function to animate the player's choice
function moveForward(choice, who) {
    // Calculate the horizontal offset for the animation
    let x1 = document.getElementById('player-choice-container').offsetWidth * 0.35; // For player choice
    let x2 = document.getElementById('computer-choice-container').offsetWidth * -0.35; // For computer choice

    isClickable = false; // Disable further selections temporarily

    // Apply the translation animation to the chosen element
    if (who === 'player') {
        choice.style.transform = `translate(${x1}px)`; // For player
    } else if (who === 'computer') {
        choice.style.transform = `translate(${x2}px)`; // For computer
    }
}

// Function to reset the animation
function moveBack(choice) {
    choice.style.transform = 'none'; // Remove the translation
    setTimeout(() => {
        isClickable = true; // Re-enable selections
    }, 300);
}
 
function computerChoose() {
    let options = [];
    let executeComputerChoice = () => {
        moveForward(choice, 'computer');
        switch (choice) {
            case computerRock:
                computerChoice = 'rock';
                break;
            case computerPaper:
                computerChoice = 'paper';
                break;
            case computerScissors:
                computerChoice = 'scissors';
                break;
        }
    }

    if (gameDiff === 'normal') {
        options = [computerRock, computerRock, computerRock, computerRock, computerPaper, computerPaper, computerPaper, computerScissors, computerScissors, computerScissors];
    } else if (gameDiff === 'easy') {
        switch (playerChoice) {
            case 'rock':
                options = [computerScissors, computerScissors, computerScissors, computerScissors, computerScissors, computerRock, computerRock, computerRock, computerPaper, computerPaper];
                break;
            case 'scissors':
                options = [computerPaper, computerPaper, computerPaper, computerPaper, computerPaper, computerScissors, computerScissors, computerScissors, computerRock, computerRock];
                break;
            case 'paper':
                options = [computerRock, computerRock, computerRock, computerRock, computerRock, computerScissors, computerScissors, computerPaper, computerPaper, computerPaper];
                break;
        }
    } else if (gameDiff === 'impossible') {
        if (computerLostHp === 80) {
            switch (playerChoice) {
                case 'rock':
                    choice = computerPaper;
                    break;
                case 'scissors':
                    choice = computerRock;
                    break;
                case 'paper':
                    choice = computerScissors;
                    break;
            }
        } else {
            switch (playerChoice) {
                case 'rock':
                    choice = computerScissors;
                    break;
                case 'scissors':
                    choice = computerPaper;
                    break;
                case 'paper':
                    choice = computerRock;
                    break;
            }
        }
    }

    choice = gameDiff !== 'impossible' ? options[Math.floor(Math.random() * 10)]: choice;
    executeComputerChoice();
}

// Function to determine the winner of the game
function determineWinner() {
    if (playerChoice === computerChoice) {
        outcome = 'tie';
        playAudio(3); // Play tie sound
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        computerLostHp += 20;
        outcome = 'win';
        playAudio(2); // Play win sound
        computerHp.style.height = `${computerLostHp}%`;
    } else {
        playerLostHp += 20;
        outcome = 'lost';
        playAudio(1); // Play loss sound
        playerHp.style.height = `${playerLostHp}%`;
    }
}

// Function to handle the player's choice and initiate the game logic
function handlePlayerChoice(choiceOption, choiceName) {
    if (isClickable) {
        playerChoice = choiceName;
        moveForward(choiceOption, 'player');
        computerChoose();
        setTimeout(() => {
            moveBack(choiceOption);
            moveBack(choice);
            determineWinner();
            checkVictor();
        }, 300);
    }
}

// Function that checks if the player or the computer is the victor
function checkVictor() {
    setTimeout(() => {
        if (playerLostHp === 100) {
            storeScore();
            // Get all elements on the page
            const allElements = document.querySelectorAll('*');

            // Loop through each element and disable pointer events
            allElements.forEach(element => {
                element.style.pointerEvents = 'none';
            });

            setTimeout(() => {
                window.location.href = './index.html';
            }, 1000);
        } else if (computerLostHp === 100) {
            reset();
            setPoint();
            storeScore();
        }
    }, 300)
}

// Function that determines the game difficulty
function determineDiff() {
    if (gameDiff === 'easy') {
        addTarget = 100;
        addScore = 2;
        targetPoints = 0;
    } else if (gameDiff === 'normal') {
        addTarget = 200;
        addScore = 4;
        targetPoints = 0;
    } else if (gameDiff === 'impossible') {
        // The values below are purely for joke
        addTarget = 999999999999999;
        addScore = 999;
        targetPoints = 0;
    }
}

// Function to set the points
function setPoint() {
    targetPoints += addTarget;
    let interval = setInterval(() => {
        if (points !== targetPoints) {
            points += addScore;
            score.textContent = `${points} pts`;
        } else {
            clearInterval(interval);
        }
    }, 10);
}

// Function to reset the game
function reset() {
    playerChoice = null;
    computerChoice = null;
    outcome = null;
    choice = null;
    computerLostHp = 0;
    playerLostHp = 0;
    playerHp.style.height = `0%`;
    computerHp.style.height = `0%`;
}

// Function to store the score in local storage
function storeScore() {
    // Check if local storage already has values / else create an array
    let storedScores = JSON.parse(localStorage.getItem("score")) || [];

    // Add the new value to the array
    storedScores.push(Number(targetPoints));

    // Store the updated array in local storage
    localStorage.setItem('score', JSON.stringify(storedScores));
}

// Attach event listeners to each player choice element
playerChoices.forEach(({ element, choice }) => {
    element.addEventListener('click', () => handlePlayerChoice(element, choice));
});

// Function to initialize the game
function initializeGame() {
    loadAudios();
    const bgMusic = new Audio(audioFiles[0]);
    bgMusic.loop = true;
    bgMusic.play();
    reset();
    score.textContent = `0 pts`;
    points = 0;
    determineDiff();
}

// Initialize game upon page load
window.onload = initializeGame();