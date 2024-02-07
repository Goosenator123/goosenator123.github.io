// Declaring variables
const playerItems = document.getElementsByClassName('player-choice'); // Get all player choices
const computerItems = document.getElementsByClassName('computer-choice'); // Get all computer choices
let isClickable = true; // Flag to track if selections are clickable
let playerChoice;
let computerChoice;

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

    // Reset the transformation after 1 second
    setTimeout(() => {
        choice.style.transform = 'none'; // Remove the translation
        isClickable = true; // Re-enable selections
    }, 1000);
}

function computerChoose() {
    let choice = ['rock', 'rock', 'rock', 'rock', 'paper', 'paper', 'paper', 'scissors', 'scissors', 'scissors'];
    let choiceIndex = Math.floor(Math.random() * 10)
    let computerChoice = choice[choiceIndex];
    console.log(choiceIndex, computerChoice);
}

// Loop through each player and computer choice element and add click event listeners
Array.from(playerItems).forEach(element => {
    element.addEventListener('click', () => {
        if (isClickable) { // Check if selections are clickable
            moveForward(element, 'player'); // Call the moveForward function with the clicked element
        }
        computerChoose();
    });
});

Array.from(computerItems).forEach(element => {
    element.addEventListener('click', () => {
        if (isClickable) {
            moveForward(element, 'computer');
        }
    })
});