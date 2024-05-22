// Imports
import '../styles/index.css';
import background from '../assets/headerBg.svg';
import { clearObjectArray, bouncingCircles, circularMotion, collision, galacticLight, interactiveBouncingCircles, gravityCircles, realisticFireworks, sineWaves, staticCollision } from './animations.js';
import { updateMouseCoordinates } from './classes.js';

// HTML element
const backgroundElement = document.getElementById('background');
const canvas = document.getElementById('mainCanvas');

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

// Project list
const projects = [
    { title: 'BouncingCircles', function: bouncingCircles },
    { title: 'CircularMotion Version 1', function: circularMotion, version: 1 },
    { title: 'CircularMotion Version 2', function: circularMotion, version: 2 },
    { title: 'DynamicCollision', function: collision },
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
animate(); // Call animate function

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
                index++;
            }
            updateMouseCoordinates(canvas.width / 2, canvas.height / 2);
            break;

        case 'ArrowLeft':
            if (atMain && index > 0) {
                ctx.clearRect(0, 0, innerWidth, innerHeight);
                clearObjectArray();
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

// Event lsiterner for mouse movement
window.addEventListener('mousemove', (e) => {
    updateMouseCoordinates(e.x, e.y);
});