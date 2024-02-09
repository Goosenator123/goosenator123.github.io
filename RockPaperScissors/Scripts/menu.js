const easy = document.getElementById('easy'); // Easy difficulty
const normal = document.getElementById('normal'); // Normal difficulty
const impossible = document.getElementById('impossible'); // Hard difficulty
let gameDiff = ''; // Game difficulty
const highscore = document.getElementById('highscore'); // Highscore

// Define an array of game's difficulties
const possibleDiff = [
    { element: easy, choice: 'easy' },
    { element: normal, choice: 'normal' },
    { element: impossible, choice: 'impossible' }
]

// Display Highest score obtained
function displayHighScore() {
    // Retrieve score from local storage / else create empty array
    const storedScores = JSON.parse(localStorage.getItem('score')) || [];

    // Check if array retrieved is empty or not
    if (storedScores.length > 0) {
        // Find highest score with Math.max(...)
        const biggestScore = Math.max(...storedScores);

        // Display highest score in designated element
        highscore.textContent = `${biggestScore} pts`;
    } else {
        // Display score of 0 when no score stored
        highscore.textContent = `0 pts`;
    }
}

// Attach event listeners to each difficulty element
possibleDiff.forEach(({ element, choice }) => {
    element.addEventListener('click', () => {
        gameDiff = choice;
        localStorage.setItem('diff', gameDiff);
        console.log(gameDiff);
        window.location.href = './game.html';
    })
})

// Execute when page is loaded
window.onload = () => {
    displayHighScore();
}