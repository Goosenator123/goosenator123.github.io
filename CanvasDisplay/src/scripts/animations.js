// Get canvas context and element
import { BouncingCircles, CircularMotion }  from './classes.js';

// Get canvas context and element
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Object Array to store different 2D elements
let objectArray = [];

// Function that updateObjectArray
function clearObjectArray() {
    objectArray = [];
}

// Function that clear screen
function clearScreen() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fill();
    ctx.closePath();
}

// Function for bouncing circles
function bouncingCircles() {
    // Check if initialGeneration is true
    if (objectArray.length === 0) {

        // Create circles
        for (let i = 0; i < 100; i++) {
            // Declaring variable
            let radius = 50; // Set radius
            let x = Math.random() * (canvas.width - radius * 2) + radius; // Set x coordinate
            let y = Math.random() * (canvas.height - radius * 2) + radius; // Set y coordinate
            let dx = Math.floor((Math.random() - 0.5) * 100) / 10; // Set x velocity
            let dy = Math.floor((Math.random() - 0.5) * 100) / 10; // Set y velocity
            let color = `hsl(${Math.random() * 360}, 50%, 50%)`; // Set color

            objectArray.push(new BouncingCircles(x, y, dx, dy, radius, color));
        }
    }

    // Animates the circles
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < objectArray.length; i++) {
        objectArray[i].update();
    }
}

// Function for circular motion version 1
function circularMotion(version) {
    if (objectArray.length === 0) {
        // Create particle
        for (let i = 0; i < 200; i ++) {
            let size = (Math.random() * 10) + 5; // Set size
            let color = `hsl(${Math.random() * 360}, 50%, 50%)`; // Set color

            objectArray.push(new CircularMotion(canvas.width / 2, canvas.height / 2, size, color, version));
        }
    }

    // Animate the circular motion
    clearScreen();
    objectArray.forEach(particle => {
        particle.update();
    });
}

// Function for dynamic collision
function dynamicCollision() {

}

// Function for galactic light
function galacticLight() {

}

// Function for gravity circles
function gravityCircles() {

}

// Function for interactive bouncing circles
function interactiveBouncingCircles() {

}

// Function for realistic fireworks
function realisticFireworks() {

}

// Function for sine waves
function sineWaves() {

}

// Function for static collision
function staticCollision() {

}

// Export functions
export {
    clearObjectArray,
    bouncingCircles,
    circularMotion,
    dynamicCollision,
    galacticLight,
    gravityCircles,
    interactiveBouncingCircles,
    realisticFireworks,
    sineWaves,
    staticCollision,
}