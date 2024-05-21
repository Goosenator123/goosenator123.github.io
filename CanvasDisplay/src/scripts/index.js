// Imports
import '../styles/index.css';
import background from '../assets/headerBg.svg';
import { updateObjectArray, bouncingCircles, circularMotion, dynamicCollision, galacticLight, interactiveBouncingCircles, gravityCircles, realisticFireworks, sineWaves, staticCollision } from './animations.js';

// HTML element
const backgroundElement = document.getElementById('background');
const canvas = document.getElementById('mainCanvas');

// Get canvas context
const ctx = canvas.getContext('2d');

// Function to set the size of the canvas to match the window size
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize(); // Call the function to set the initial canvas size

// Set background image using style.backgroundImage
backgroundElement.style.backgroundImage = `url(${background})`;

// Variables
let atMain = false;
let index = 0;

// Project list
const projects = [
    { title: 'BouncingCircles', function: bouncingCircles },
    { title: 'CircularMotion', function: circularMotion },
    { title: 'DynamicCollision', function: dynamicCollision },
    { title: 'GalacticLight', function: galacticLight },
    { title: 'GravityCircles', function: gravityCircles },
    { title: 'InteractiveBouncingCircles', function: interactiveBouncingCircles },
    { title: 'RealisticFireworks', function: realisticFireworks },
    { title: 'SineWaves', function: sineWaves },
    { title: 'StaticCollision', function: staticCollision },
];

// Animate function
function animate() {
    // Make a loop
    requestAnimationFrame(animate);

    if (!atMain) {
        // Clear canvas
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        return;
    }
    
    // Check if at project index for each project in projects array
    projects.forEach((project, projectIndex) => {
        if (index === projectIndex) {
            const displayTitle = document.getElementById('displayTitle');
            displayTitle.textContent = project.title;
            project.function();
        }
    });
}
animate(); // Call animate function

// Event listener for arrow keys
let isScrolling = false; // Flag to prevent multiple key presses
window.addEventListener('keydown', (e) => {
    if (isScrolling) {
        return;
    }

    // Execute code based on key pressed
    switch (e.key) {
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
                updateObjectArray();
                index++;
            }
            break;
        case 'ArrowLeft':
            if (atMain && index > 0) {
                ctx.clearRect(0, 0, innerWidth, innerHeight);
                updateObjectArray();
                index--;
            }
            break;
    }
});

// Event listener for resize
window.addEventListener('resize', () => {
    const headerSection = document.getElementById('header');
    headerSection.scrollIntoView({ behavior: 'smooth' });
    setCanvasSize();
    atMain = false;
});