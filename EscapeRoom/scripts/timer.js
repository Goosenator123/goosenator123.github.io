const timerContainer = document.getElementById('timer-section');
const timer = document.getElementById('time');
const highscore = document.getElementById('highscore');
const completionTime = document.getElementById('completion-time');

let time = 0;

function updateTime() {
    let minute = Math.floor(time / 60); // Get minute
    let second = time % 60; // Get second
    let secondString = second < 10 ? `0${second}` : second; // Turn second into 2 digits if it's below 10
    timer.textContent = `${minute}:${secondString}`; // Show
}

function saveTime() {
    // Get array of existing scores
    let storedTime = JSON.parse(localStorage.getItem('Time')) || [];

    // Store new score in the array
    storedTime.push(time);

    // Set score array back to local storage with the help of JSON.stringify
    localStorage.setItem('Time', JSON.stringify(storedTime));
}

function displayHighscore() {
    // Display shortest time
    const storedTime = JSON.parse(localStorage.getItem('Time')) || []; // Get array of time or initialize as empty array
    const shortestTime = storedTime.length > 0 ? Math.min(...storedTime) : 'Never Completed'; // Get the shortest time or set it as never completed
    let minute = Math.floor(shortestTime / 60); // Get minute
    let second = shortestTime % 60; // Get second
    let secondString = second < 10 ? `0${second}` : second; // Turn second into 2 digits if it's below 10
    highscore.textContent = `${minute}:${secondString}`; // Show
}

function displayCompletionTime() {
    // Display latest Time
    const storedTime = JSON.parse(localStorage.getItem('Time')) || [];
    const latestTime = storedTime.length > 0 ? storedTime[storedTime.length - 1] : 0;
    let minute = Math.floor(latestTime / 60); // Get minute
    let second = latestTime % 60; // Get second
    let secondString = second < 10 ? `0${second}` : second; // Turn second into 2 digits if it's below 10
    completionTime.textContent = `${minute}:${secondString}`; // Show
}