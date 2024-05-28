// Get canvas context and element
import { BouncingCircles, InteractiveBouncingCircles, CircularMotion, Collision, GalacticLight, GravityCircle, getDistance }  from './classes.js';

// Get canvas context and element
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Object Array to store different 2D elements
let objectArray = [];

// Function that updateObjectArray
function clearObjectArray() {
    objectArray = [];
}

// Function that updateObjectArray
function updateObjectArray(updatedArray) {
    objectArray = updatedArray;
}

// Function that update deltaTime for animations
let deltaTime = 0;
function updateDeltaTimeForAnimations(time) {
    deltaTime = time;
}

// Get random integer from a min and max value
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Function that clear screen
function clearScreen(opacity) {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
    ctx.fill();
    ctx.closePath();
}

// Function for bouncing circles
function bouncingCircles() {
    // Check if initialGeneration is true
    if (objectArray.length === 0) {
        let spawnCount = Math.min(canvas.width, canvas.height) / 10;
        // Create circles
        for (let i = 0; i < spawnCount; i++) {
            // Declaring variable
            let radius = Math.min(canvas.width, canvas.height) * 0.05; // Set radius
            let x = Math.random() * (canvas.width - radius * 2) + radius; // Set x coordinate
            let y = Math.random() * (canvas.height - radius * 2) + radius; // Set y coordinate
            let dx = Math.floor((Math.random() - 0.5) * 100) / 10; // Set x velocity
            let dy = Math.floor((Math.random() - 0.5) * 100) / 10; // Set y velocity
            let color = `hsl(${Math.random() * 360}, 50%, 50%)`; // Set color

            objectArray.push(new BouncingCircles(x, y, dx, dy, radius, color));
        }
    }

    // Animates the circles
    clearScreen(1);
    for (let i = 0; i < objectArray.length; i++) {
        objectArray[i].update();
    }
}

// Function for interactive bouncing circles
function interactiveBouncingCircles() {
    if (objectArray.length === 0) {
        let spawnCount = Math.max(canvas.width, canvas.height);
        // Create circles
        for (let i = 0; i < spawnCount; i++) {
            // Declaring variable
            let radius = Math.random() * 5 + 4; // Set radius
            let x = Math.random() * (innerWidth - radius * 2) + radius;
            let y = Math.random() * (innerHeight - radius * 2) + radius;
            let dx = Math.floor((Math.random() - 0.5) * 100) / 20;
            let dy = Math.floor((Math.random() - 0.5) * 100) / 20;
            let color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    
            objectArray.push(new InteractiveBouncingCircles(x, y, dx, dy, radius, color));
        }
    }

    // Clear canvas
    clearScreen(1);
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
    clearScreen(0.05);
    objectArray.forEach(particle => {
        particle.update();
    });
}

// Function for collision
function collision() {
    let spawnCount = Math.min(canvas.width, canvas.height) * 0.5;
    if (objectArray.length === 0) {
        // Create and insert particle into array
        for (let i = 0; i < spawnCount; i++) {

            // Set random variables
            let radius = Math.min(canvas.width, canvas.height) * 0.02;
            let color = `hsl(${Math.random() * 360}, 50%, 50%)`;
            let x = randomIntFromRange(radius, canvas.width - radius);
            let y = randomIntFromRange(radius, canvas.height - radius);
            let dx = randomIntFromRange(-3, 3);
            let dy = randomIntFromRange(-3, 3);

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
    clearScreen(1);
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
    clearScreen(opacity);

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
    radians += 0.003 * deltaTime;

    // Change bg color opacity depending on mouseDown
    if (mouseDown && opacity >= 0.03) {
        opacity -= 0.01 * deltaTime;
    } else if (!mouseDown && opacity < 1) {
        opacity += 0.005 * deltaTime;
    }
}

// Function for gravity circles
function gravityCircles() {
    if (objectArray.length === 0) {
        let spawnCount = Math.min(canvas.width, canvas.height) / 2.5;
        // Create and insert ball in array
        for (let i = 0; i < spawnCount; i++) {
            // Setting random variables
            let radius = randomIntFromRange(8, 30);
            let x = randomIntFromRange(radius, (canvas.width - radius))
            let y = randomIntFromRange(radius, ((canvas.height - radius) + 1))
            let dx = randomIntFromRange(-2, 2);
            let dy = randomIntFromRange(3, 5);
            let color = `hsl(${Math.random() * 360}, 50%, 50%)`;

            // Inserting gravityCircle Objects
            objectArray.push(new GravityCircle(x, y, dx, dy, radius, color));
        }
    }

    // Clear canvas
    clearScreen(1);

    // Move the ball Objects in ballArray
    for (let i = 0; i < objectArray.length; i++) {
        objectArray[i].update();
    }
}

// Function for realistic fireworks
function realisticFireworks() {
    // Clear canvas
    clearScreen(0.05);

    // Update particles
    objectArray.forEach((particle, index) => {
        // Check if particle is no longer visible
        if (particle.opacity > 0) {
            particle.update(); // Update
        } else {
            objectArray.splice(index, 1); // Erase particle from array
        }
    });
}

// Define properties of the wave
const wave = {
    length: 0.005, // Length of each wave cycle
    amplitude: 150, // Amplitude of the wave
    frequency: 0.015, // Frequency of the wave (speed of oscillation)
};

// Function for sine waves
let increment = wave.frequency; // Initialize the increment for the wa
function sineWaves() {
    // Clear the canvas
    clearScreen(0.05);

    // Begin drawing the wave
    ctx.beginPath();
    // Move the drawing cursor to the starting point of the wave (slightly off-screen to hide initial line)
    ctx.moveTo(-20, canvas.height / 2);

    // Draw the wave using a loop across the width of the canvas
    for (let i = 0; i < canvas.width; i += 0.1) {
        // Calculate the vertical position of each point on the wave using sine and cosine functions
        const waveHeight = canvas.height / 2 + Math.sin(i * wave.length + increment) * wave.amplitude * Math.cos((increment * 2) / 1.5);
        // Draw a line segment to the calculated point
        ctx.lineTo(i, waveHeight);
    }

    // Set the stroke color of the wave based on the current increment value
    const hue = Math.abs(360 * Math.sin(increment/10)); // Calculate hue for color variation
    ctx.strokeStyle = `hsl(${hue}, 50%, 50%)`; // Set stroke color
    ctx.lineWidth = 5; // Set the thickness of the lines
    ctx.stroke(); // Render the wave on the canvas
    ctx.closePath(); // Close the path to prepare for next drawing

    // Increase the increment value to animate the wave
    increment += wave.frequency * deltaTime; // Increment controls the speed of the wave animation
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
    updateObjectArray,
    bouncingCircles,
    circularMotion,
    collision,
    galacticLight,
    gravityCircles,
    interactiveBouncingCircles,
    realisticFireworks,
    sineWaves,
    updateDeltaTimeForAnimations
}