// Get canvas context and element
import { BouncingCircles, CircularMotion, Collision, GalacticLight, getDistance }  from './classes.js';

// Get canvas context and element
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Object Array to store different 2D elements
let objectArray = [];

// Function that updateObjectArray
function clearObjectArray() {
    objectArray = [];
}

// Get random integer from a min and max value
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
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
function collision() {
    let spawnCount = canvas.width * canvas.height / ((canvas.width + canvas.height) * 20);
    if (objectArray.length === 0) {
        // Create and insert particle into array
        for (let i = 0; i < spawnCount; i++) {

            // Set random variables
            let radius = 50;
            let color = `hsl(${Math.random() * 360}, 50%, 50%)`;
            let x = randomIntFromRange(radius, canvas.width - radius);
            let y = randomIntFromRange(radius, canvas.height - radius);
            let dx = randomIntFromRange(-5, 5);
            let dy = randomIntFromRange(-5, 5);

            // Make sure it's not the first particle
            if (i !== 0) {
                // Check for collisions with existing particle
                for (let j = 0; j < objectArray.length; j++) {
                    // Execute if (x, y) coordinates are too close 
                    if (getDistance(x, y, objectArray[j].x, objectArray[j].y) < (radius + objectArray[j].radius + 2)) {
                        // Reassign x, y coordinates
                        x = randomIntFromRange(radius, canvas.width - radius);
                        y = randomIntFromRange(radius, canvas.height - radius);

                        // Reset for loop to recheck if new coordinates are far enough
                        j = -1;
                    }
                }
            }

            // Insert particle object into array if no collision
            objectArray.push(new Collision(x, y, radius, color, dx, dy));
        }
    }

    // Animate the collision
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    objectArray.forEach(particle => {
        particle.update(objectArray);
    })
}

// Function for galactic light
let opacity = 1; // Set opacity
let radians = 0 // Set radian value
function galacticLight() {
    let spawnCount = canvas.width * canvas.height / 500;
    let margin = canvas.width * canvas.height / canvas.width;

    if (objectArray.length === 0) {
        for (let i = 0; i < spawnCount; i++) {
            const canvasWidth = canvas.width + margin;
            const canvasHeight = canvas.height + margin;
            const x = Math.random() * canvasWidth - canvasWidth / 2;
            const y = Math.random() * canvasHeight - canvasHeight / 2;
            const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
            const radius = 2 * Math.random();
    
            objectArray.push(new GalacticLight(x, y, radius, color));
        }
    }

    // Clear the canvas
    ctx.beginPath();
    ctx.fillStyle = `rgba(10, 10, 10, ${opacity}`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath

    // Save the current transformation state
    ctx.save();

    // Translate the canvas origin to the center of the canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Rotate the canvas by the specified radians
    ctx.rotate(radians);

    // Iterate over each light and update its position or properties
    objectArray.forEach(light => {
        light.update(); // Update each light after each loop
    });

    // Restore the previously saved transformation state
    ctx.restore();

    // Increment the radians value to rotate the canvas gradually
    radians += 0.003;

    // Change bg color opacity depending on mouseDown
    if (mouseDown && opacity >= 0.03) {
        opacity -= 0.01;
    } else if (!mouseDown && opacity < 1) {
        opacity += 0.005;
    }
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

let mouseDown = false;
window.addEventListener('mousedown', () => {
    mouseDown = true;
})

window.addEventListener('mouseup', () => {
    mouseDown = false;
})

// Export functions
export {
    clearObjectArray,
    bouncingCircles,
    circularMotion,
    collision,
    galacticLight,
    gravityCircles,
    interactiveBouncingCircles,
    realisticFireworks,
    sineWaves,
    staticCollision,
}