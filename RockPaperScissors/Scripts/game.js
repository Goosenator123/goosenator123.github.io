// Declaring variables
// const playerItems = document.getElementsByClassName('player-choice'); // Get all player choices
// const computerItems = document.getElementsByClassName('computer-choice'); // Get all computer choices
const playerRock = document.getElementById('player-rock');
const playerPaper = document.getElementById('player-paper');
const playerScissors = document.getElementById('player-scissors');
const computerRock = document.getElementById('computer-rock');
const computerPaper = document.getElementById('computer-paper');
const computerScissors = document.getElementById('computer-scissors');
const playerHp = document.getElementById('player-hp-bar');
const computerHp = document.getElementById('computer-hp-bar');

let isClickable = true; // Flag to track if selections are clickable
let playerChoice;
let computerChoice;
let outcome;
let difficulty;
let choice;
let bgMusic = new Audio('./audio/bgRain.mp3');
let dmgAudio = new Audio('./audio/undertale-dmg.mp3');
let winAudio = new Audio('./audio/8bitSuccess.mp3');
let tieAudio = new Audio('./audio/bell.wav');
bgMusic.loop = true;
[dmgAudio, winAudio, tieAudio].forEach(audio => audio.volume = 0.3);

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

function moveBack(choice) {
    choice.style.transform = 'none'; // Remove the translation
    isClickable = true; // Re-enable selections
}
 
function computerChoose() {
    let options = [computerRock, computerRock, computerRock, computerRock, computerPaper, computerPaper, computerPaper, computerScissors, computerScissors, computerScissors];
    let choiceIndex = Math.floor(Math.random() * 10);
    choice = options[choiceIndex];

    switch (choice) {
        case computerRock:
            moveForward(computerRock, 'computer');
            computerChoice = 'rock'
            break;
        case computerPaper:
            moveForward(computerPaper, 'computer');
            computerChoice = 'paper'
            break;
        case computerScissors:
            moveForward(computerScissors, 'computer');
            computerChoice = 'scissors'
            break;
    }
}

function determineWinner() {

    switch (playerChoice) {
        case 'rock':
            switch (computerChoice) {
                case 'rock':
                    outcome = 'tie';
                    break;
                case 'paper':
                    outcome = 'lost';
                    break;
                case 'scissors':
                    outcome = 'win';
                    break;
            }
            break;
        case 'paper':
            switch (computerChoice) {
                case 'rock':
                    outcome = 'win';
                    break;
                case 'paper':
                    outcome = 'tie';
                    break;
                case 'scissors':
                    outcome = 'lost';
                    break;
            }
            break;
        case 'scissors':
            switch (computerChoice) {
                case 'rock':
                    outcome = 'lost';
                    break;
                case 'paper':
                    outcome = 'win';
                    break;
                case 'scissors':
                    outcome = 'tie';
                    break;
            }
            break;
    }

    if (outcome === 'win') {
        winAudio.currentTime = 0;
        winAudio.play();
    } else if (outcome === 'tie') {
        tieAudio.currentTime = 0;
        tieAudio.play();
    } else if (outcome === 'lost') {
        dmgAudio.currentTime = 0;
        dmgAudio.play();
    }
}

function handlePlayerChoice(choiceOption, choiceName) {
    if (isClickable) {
        playerChoice = choiceName;
        moveForward(choiceOption, 'player');
        computerChoose();

        setTimeout(() => {
            moveBack(choiceOption);
            moveBack(choice);
            console.log(outcome);
            determineWinner();
        }, 1000);
    }
}

playerRock.addEventListener('click', () => handlePlayerChoice(playerRock, 'rock'));
playerPaper.addEventListener('click', () => handlePlayerChoice(playerPaper, 'paper'));
playerScissors.addEventListener('click', () => handlePlayerChoice(playerScissors, 'scissors'));

window.onload = () => {
    bgMusic.play();
};