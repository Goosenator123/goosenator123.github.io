// Imports
import '../styles/index.css';
import background from '../assets/headerBg.svg';
import { clearObjectArray, updateObjectArray, bouncingCircles, circularMotion, collision, galacticLight, interactiveBouncingCircles, gravityCircles, realisticFireworks, sineWaves, updateDeltaTimeForAnimations } from './animations.js';
import { updateMouseCoordinates, Firework, updateDeltaTimeForClasses } from './classes.js';

// HTML element
const backgroundElement = document.getElementById('background');
const canvas = document.getElementById('mainCanvas');
const headerButton = document.getElementById('headerButton');
const mainButton = document.getElementById('mainButton');
const leftRighButton = ['leftButton', 'rightButton'];

// Get canvas context
const ctx = canvas.getContext('2d');

// Function to set the size of the canvas to match the window size
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateMouseCoordinates(canvas.width / 2, canvas.height / 2); // Set mouse coordinates to the center of the canvas
    clearObjectArray(); // Clear updateObjectArray function
}
setCanvasSize(); // Call the function to set the initial canvas size

// Set background image using style.backgroundImage
backgroundElement.style.backgroundImage = `url(${background})`;

// Variables
let atMain = false;
let index = 0;
let clickCooldown = 0;

// Project list
const projects = [
    { title: 'BouncingCircles', function: bouncingCircles },
    { title: 'InteractiveBouncingCircles', function: interactiveBouncingCircles },
    { title: 'CircularMotion Version 1', function: circularMotion, version: 1 },
    { title: 'CircularMotion Version 2', function: circularMotion, version: 2 },
    { title: 'DynamicCollision', function: collision },
    { title: 'GalacticLight', function: galacticLight },
    { title: 'GravityCircles', function: gravityCircles },
    { title: 'RealisticFireworks', function: realisticFireworks },
    { title: 'SineWaves', function: sineWaves },
];

// Animate function
let lastTime = 0;
function animate(timestamp) {
    // Make a loop
    requestAnimationFrame(animate);
    if (clickCooldown > 0) clickCooldown--;

    // Calculate deltaTime
    const deltaTime = (timestamp - lastTime) / 16;
    updateDeltaTimeForClasses(deltaTime);
    updateDeltaTimeForAnimations(deltaTime);
    lastTime = timestamp;

    // Check if at project index for each project in projects array
    projects.forEach((project, projectIndex) => {
        if (index === projectIndex) {
            const displayTitle = document.getElementById('displayTitle');
            displayTitle.textContent = project.title;
            const projectVersion = project.version ? project.version : 0;

            // Check if project doesnt have a version
            if (projectVersion === 0) {
                project.function(); // Call project function without version
                return;
            }

            project.function(project.version); // Call project function with their version
        }
    });
}
animate(1); // Call animate function

// Event listener for arrow keys
let isScrolling = false; // Flag to prevent multiple key presses
window.addEventListener('keydown', (e) => {
    if (isScrolling) {
        return;
    }

    // Execute code based on key pressed
    switch (e.key) {
        default: // Default case (always update mouse coordinates to the center of the canvas)
            updateMouseCoordinates(canvas.width / 2, canvas.height / 2);

        case 'ArrowDown':
            const mainSection = document.getElementById('main');
            mainSection.scrollIntoView({ behavior: 'smooth' });
            isScrolling = true;
            setTimeout(() => {
                isScrolling = false;
                atMain = true;
            }, 1000);
            break;

        case 'ArrowUp':
            const headerSection = document.getElementById('header');
            headerSection.scrollIntoView({ behavior: 'smooth' });
            isScrolling = true;
            setTimeout(() => {
                isScrolling = false;
                atMain = false;
            }, 1000);
            break;

        case 'ArrowRight':
            if (atMain && index < projects.length - 1) {
                ctx.clearRect(0, 0, innerWidth, innerHeight);
                clearObjectArray();
                fireworkArray = [];
                index++;
            }
            updateMouseCoordinates(canvas.width / 2, canvas.height / 2);
            break;

        case 'ArrowLeft':
            if (atMain && index > 0) {
                ctx.clearRect(0, 0, innerWidth, innerHeight);
                clearObjectArray();
                fireworkArray = [];
                index--;
            }
            break;
    }
});

// Event listener for resize
window.addEventListener('resize', () => {
    setCanvasSize();
});

// Event listener for mouse movement
window.addEventListener('mousemove', (event) => {
    updateMouseCoordinates(event.x, event.y);
});

// Event listener for mouse click
let fireworkArray = [];
window.addEventListener('click', (event) => {
    if (projects[index].title !== 'RealisticFireworks' || clickCooldown > 0) return;

    // Update mouse coordinates
    updateMouseCoordinates(event.x, event.y);

    // Set variables
    const particleCount = 2000;
    const angleIncrement = (Math.PI * 2) / particleCount;
    const power = 15;

    // Generate particles
    for (let i = 0; i < particleCount; i++) {
        // Set random color
        let color = `hsl(${Math.random() * 360}, 50%, 50%)`;

        // Assign particle properties
        fireworkArray.push(new Firework(event.x, event.y, 5, color, { 
            x: Math.cos(angleIncrement * i) * Math.random() * power, 
            y: Math.sin(angleIncrement * i) * Math.random() * power
        }, Math.random()));
    }

    // Update objectArray
    updateObjectArray(fireworkArray);
    clickCooldown = 30;
});

// Event listener for header button click
headerButton.addEventListener('click', () => {
    const mainSection = document.getElementById('main');
    mainSection.scrollIntoView({ behavior: 'smooth' });
    atMain = true;
});

// Event listener for main button click
mainButton.addEventListener('click', () => {
    const headerSection = document.getElementById('header');
    headerSection.scrollIntoView({ behavior: 'smooth' });
    atMain = false;
});

// Event listener for left and right button click
leftRighButton.forEach((button) => {
    const element = document.getElementById(button);
    element.addEventListener('click', () => {
        if (button === 'rightButton' && index < projects.length - 1) {
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            clearObjectArray();
            fireworkArray = [];
            index++;
        } else if (button === 'leftButton' && index > 0) {
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            clearObjectArray();
            fireworkArray = [];
            index--;
        }
    });
});