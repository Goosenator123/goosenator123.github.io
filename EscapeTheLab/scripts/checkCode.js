// Combination Lock Object
const combinationLock = {
    // The combination of the lock
    combination: 6983,
    // Indicates whether the lock is currently locked or not
    locked: true,
    // An array representing the wheels of the combination lock
    wheels: [0, 0, 0, 0],
    // Method to increment the value of a wheel of the lock
    increment: function(wheel) {
        // If the value of the wheel is 9, reset it to 0
        if (this.wheels[wheel] === 9) {
            this.wheels[wheel] = 0;
        } else {
            // Otherwise, increment the value of the wheel by 1
            this.wheels[wheel]++;
        }
    },
    // Method to decrement the value of a wheel of the lock
    decrement: function(wheel) {
        // If the value of the wheel is 0, set it to 9
        if (this.wheels[wheel] === 0) {
            this.wheels[wheel] = 9;
        } else {
            // Otherwise, decrement the value of the wheel by 1
            this.wheels[wheel]--;
        }
    },
    // Method to check if the lock is opened
    check: function() {
        // Join the values of the wheels and convert them to an integer
        const currentCombination = parseInt(this.wheels.join(''));
        // If the current combination matches the preset combination, unlock the lock
        if (this.combination === currentCombination) {
            this.locked = false;
        } else {
            // Otherwise, keep the lock locked
            this.locked = true;
        }
    }
}

// Event listeners for increment buttons
const increments = document.getElementsByClassName('increment');

// Loop through all increment buttons
for (var i = 0; i < increments.length; i++) {
    increments[i].addEventListener('click', function(){
        // Get the wheel index from the 'index' attribute of the button
        let wheelIndex = parseInt(this.getAttribute('index'));
        // Increment the corresponding wheel of the combination lock
        combinationLock.increment(wheelIndex);
        // Update the value displayed in the UI for the corresponding wheel
        document.querySelectorAll('.digit')[wheelIndex].value = combinationLock.wheels[wheelIndex];
        // Check the lock status after the increment
        checkLock();
    });
}

// Event listeners for decrement buttons
const decrements = document.getElementsByClassName('decrement');

// Loop through all decrement buttons
for (var i = 0; i < decrements.length; i++) {
    decrements[i].addEventListener('click', function(){
        // Get the wheel index from the 'index' attribute of the button
        let wheelIndex = parseInt(this.getAttribute('index'));
        // Decrement the corresponding wheel of the combination lock
        combinationLock.decrement(wheelIndex);
        // Update the value displayed in the UI for the corresponding wheel
        document.querySelectorAll('.digit')[wheelIndex].value = combinationLock.wheels[wheelIndex];
        // Check the lock status after the decrement
        checkLock();
    });
}

// Function that checks the lock status and updates the UI accordingly
function checkLock() {
    // Check the lock status
    combinationLock.check();
    
    // If the lock is unlocked
    if (combinationLock.locked === false) {
        // Move lock elements off screen to simulate unlocking
        lockElement.forEach(element => {
            element.style.transform = 'translate(0%, -50%)';
        });
        // Move unlock elements off screen to simulate unlocking
        unlockElement.forEach(element => {
            element.style.transform = 'translate(0%, -100%)';
        });

        saveTime(); // Save completion time
        displayCompletionTime(); // Display completion time
        atGame = false; // Set game state
        playPauseAudio('gameBg', false); // Stop game music
        playPauseAudio('success', true, 0.6); // Play success sound effect

        setTimeout(() => {
            // Update game status flags
            atEnd = true;
        }, 500);
    } else { // If the lock is still locked
        // Reset lock elements to their original position
        lockElement.forEach(element => {
            element.style.transform = 'translate(0%, 0%)';
        });
        // Reset unlock elements to their original position
        unlockElement.forEach(element => {
            element.style.transform = 'translate(0%, 0%)';
        });
    }
}