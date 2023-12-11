// Get references to HTML elements
const guess = document.getElementById("guess");
const hp_bar = document.getElementById("hp-bar");
const hp_label = document.getElementById("hp-label");
const hp_container = document.getElementById("hp-bar-container");
const hint = document.getElementById("hint");
const submit = document.getElementById("submit");
const menu = document.getElementById("menu");
const restart = document.getElementById("try-again");
const highScore = document.getElementById("highscore");
const score = document.getElementById("score");
const gameOverScore = document.getElementById("game-over-score");

// Get difficulty buttons' references
const easyMode = document.getElementById("easy");
const normalMode = document.getElementById("normal");
const hardMode = document.getElementById("hard");

// Set global values
let dmg = 0; // Set dmg
let hp = 100; // Set hp
let targetHp = 100; // Set target hp
let submitCooldown = false; // Set submitCooldown to avoid submit spam
let answer = 0; // Set answer
let points = 0; // Set points
let targetPoints = 0; // Set points' target
let addPoints = 0; // Set points to add
let toAdd = 0; // Set points that will be added gradually per interval

// Audio
let bgMusic = new Audio("./audio/prayerInC.mp3"); // Set background audio
let dmgSound = new Audio("./audio/undertale-dmg.mp3");
let correctSound = new Audio("./audio/8bitSuccess.mp3");
let deadSound = new Audio("./audio/gameOver.mp3")
bgMusic.loop = true;
deadSound.loop = true;
bgMusic.volume = 0.3;
dmgSound.volume = 0.6;


//! Functions ------------------------------------------

// Changing windows arrow functions
const startGame = () => {
    document.body.classList.toggle('start-game');
}

const stopGame = () => {
    document.body.classList.toggle('end-game');
}

// Decrease HP function
function decreaseHp() {
    // Set local variables
    targetHp -= dmg;
    dmgSound.currentTime = 0;
    dmgSound.play();

    // Decrease hp gradually with setInterval() function
    const decreaseLabel = setInterval(() => {

        // Check if hp is at targetHp
        if (hp != targetHp) {     

            // Check if hp is below 0
            if (hp > 0) {

                // Increase hp value
                hp -= 1;

                // Decrease hp_bar and hp_label gradually
                hp_label.textContent = `${hp}%`;
                hp_bar.style.width = `${hp}%`;
                hp_bar.style.backgroundColor = `hsl(${hp}, 83%, 50%)`
                hp_container.style.border = `5px solid hsl(${hp}, 100%, 40%)`;
                hp_container.style.borderLeft = `5px solid hsl(${hp}, 100%, 31%)`;
                // changeHpColor(hp);
            }    
        } else {
            clearInterval(decreaseLabel) // Stops the interval if hp is at targetHp
        }
    }, 20);

    // Check if dead
    checkDead();
}

// // Change HP color function
// function changeHpColor(hp) {
//     switch (true) {
//         case hp <= 25:
//             hp_bar.style.backgroundColor = "red";
//             break;

//         case hp <= 50:
//             hp_bar.style.backgroundColor = "orange";
//             break;

//         case hp <= 75:
//             hp_bar.style.backgroundColor = "yellow";
//             break;
//     }
// }

// When dead function
function checkDead() {

    // Check if targetHp is below 0
    if (targetHp <= 0) {

        // Execute after a given time
        setTimeout(() => {
            // hint.textContent = "You're Dead!";
            // hint.style.color = "red";
            bgMusic.pause(); // Stop the bgMusic

            // Execute after a given time
            setTimeout(() => {
                gameOverScore.textContent = `${points}`;
                storeScore(); // Store score in local storage
                resetPoints(); // Reset score
                stopGame(); // Display gameOver screen
                reset(); // Reset all values
                deadSound.currentTime = 0; // Set gameOver music to the beginning
                deadSound.play(); // Play game over music
            }, 100);
        }, 500);
    }
}

// checkAnswer function
function checkAnswer() {
    // Get guess input from HTML
    const guessInput = document.getElementById("guess");

    // Get guess value from HTML
    const guess = guessInput.value;

    // Reset guessInput value to reset HTML guess input
    const resetGuess = () => {
        guessInput.value = "";
    }

    // Check if valid input
    if (guess < 1 || guess > 100 || guess === "") {
        hint.textContent = "The number is from 1 to 100!";
        hint.style.color = "yellow";
        resetGuess();
        // console.log("invalid");
    } else {

        // Check if guess is above right answer
        if (guess > answer) {
            hint.textContent = "Lower";
            hint.style.color = "aqua";
            decreaseHp();
            resetGuess();
            // return true;
            // console.log("lower");
        
        // Check if guess is below right answer
        } else if (guess < answer) {
            hint.textContent = "Higher";
            hint.style.color = "orange";
            decreaseHp();
            resetGuess();
            // return true;
            // console.log("higher");

        // Execute if guess is corret
        } else {
            hint.textContent = "Correct!";
            hint.style.color = "greenyellow";
            correctSound.currentTime = 0; // Set correctSound to the beginning
            correctSound.play(); // Play correctSound
            setAnswer(); // Change answer

            // Set targetPoints
            targetPoints += addPoints;

            // Increase  gradually score with setInterval() function
            const setPoints = setInterval(() => {

                // Check if points equal targetPoints
                if (points != targetPoints) {
                    // Increase poitns value
                    points += toAdd;

                    // Increase score gradually
                    score.textContent = `${points}`;
                } else {
                    clearInterval(setPoints); // Stop interval if poitns is at targetPoints
                }

            }, 0.1);

            // Execute after a given time
            setTimeout(() => {
                reset(); // Reset hp bar
            }, 600);
            // return false;
        }
    }
}

// Storing score in local storage function
function storeScore() {
    // Get score
    let userScore = targetPoints;

    // Check if local storage already has values / else create an array
    let storedScores = JSON.parse(localStorage.getItem("score")) || [];

    // Add the new value to the array
    storedScores.push(Number(userScore));

    // Store the updated array in local storage
    localStorage.setItem('score', JSON.stringify(storedScores));
}

// Display Highest score obtained
function displayHighScore() {
    // Retrieve score from local storage / else create empty array
    const storedScores = JSON.parse(localStorage.getItem('score')) || [];

    // Check if array retrieved is empty or not
    if (storedScores.length > 0) {
        // Find highest score with Math.max(...)
        const biggestScore = Math.max(...storedScores);

        // Display highest score in designated element
        highScore.textContent = `${biggestScore} points`;
    } else {
        // Display score of 0 when no score stored
        highScore.textContent = `0 points`;
    }
}

// Submit answer functions
function submitAnswer() {
    // Check if user is dead or submitCooldown is on
    if (!submitCooldown && targetHp > 0) {
        checkAnswer(); // Check Answer
        submitCooldown = true; // Set submitCooldown

        // Execute after a given time
        setTimeout(() => {
            submitCooldown = false; // Reset submitCooldown
        }, 350);
        // console.log(targetHp);
    }
}

function submitAnswerWithEnter(event) {
    // Check if keypressed is enter key (keycode = 13)
    if (event.keyCode === 13) {
        submitAnswer();
    }
}

// Set answer function
function setAnswer() {
    // Set random full number from 1 to 100
    let number = Math.round(Math.random() * 100);

    // Reset number until it is not 0 or 100
    while (number === 0 || number === 100) {
        number = Math.round(Math.random() * 100);
    }

    // Assign random number to answer
    answer = number;
}

// Reset varaible function
function reset() {
    // Clear input
    const guess = document.getElementById("guess");
    guess.value = ""; 

    hp = 100; // Reset hp
    targetHp = 100; // Reset targetHp
    submitCooldown = false; // Reset cooldown for submit button
    hint.textContent = ""; // Reset hint
    hp_bar.style.width = "100%"; // Reset hp_bar
    hp_label.textContent = "100%"; // Reset hp_label
    hp_bar.style.backgroundColor = `hsl(${hp}, 83%, 50%)`
    hp_container.style.border = `5px solid hsl(${hp}, 100%, 40%)`;
    hp_container.style.borderLeft = `5px solid hsl(${hp}, 100%, 31%)`;
}

// Reset score funciton
function resetPoints() {
    points = 0; // Reset points
    targetPoints = 0; // Reset points' target
    score.textContent = "0"; // Reset score
}

//! Events
// Execute when page is loaded
window.onload = displayHighScore();

// Submit events
submit.addEventListener('click', submitAnswer);
guess.addEventListener("keydown", submitAnswerWithEnter);

// 

// Game Over buttons' events
menu.addEventListener('click', () => {
    displayHighScore(); // Display highScore in menu
    deadSound.pause(); // Pause gameOver muscic

    // Return to menu
    stopGame();
    startGame();
});

restart.addEventListener('click', () => {
    deadSound.pause(); // Pause gameOver muscic
    bgMusic.currentTime = 0.3; // Set bgMusic to beginning
    bgMusic.play(); // Start bgMusic
    setAnswer(); // Set new answer

    // Start new game
    stopGame();
})

// Setting difficulty events
easyMode.addEventListener('click', () => {
    bgMusic.currentTime = 0.3; // Set bgMusic to beginning
    dmg = 10; // Set easy mode dmg
    addPoints = 100; // Set easy mode points
    toAdd = 1; // Set poitns added per tick
    bgMusic.play(); // Play bgMusic
    startGame(); // Start game
    setAnswer(); // Set answer
})

normalMode.addEventListener('click', () => {
    bgMusic.currentTime = 0.3; // Set bgMusic to beginning
    dmg = 13; // Set normal mode dmg
    addPoints = 200; // Set normal mode points
    toAdd = 2; // Set poitns added per tick
    bgMusic.play(); // Play bgMusic
    startGame(); // Start game
    setAnswer(); // Set answer
})

hardMode.addEventListener('click', () => {
    bgMusic.currentTime = 0.3; // Set bgMusic to beginning
    dmg = 17; // Set hard mode dmg
    addPoints = 400; // Set hard mode points
    toAdd = 4; // Set poitns added per tick
    bgMusic.play(); // Play bgMusic
    startGame(); // Start game
    setAnswer(); // Set answer
})
