// Imports
import '../styles/index.css';
import background from '../assets/headerBg.svg';

// HTML element
const backgroundElement = document.getElementById('background');
const main = document.getElementById('main');

// Set background image using style.backgroundImage
backgroundElement.style.backgroundImage = `url(${background})`;

// // Project list
// const projects = [
//     { title: 'BouncingCircles' },
//     { title: 'CircularMotion' },
//     { title: 'DynamicCollision' },
//     { title: 'GalacticLight' },
//     { title: 'GravityCircles' },
//     { title: 'InteractiveBouncingCircles' },
//     { title: 'RealisticFireworks' },
//     { title: 'SineWaves' },
//     { title: 'StaticCollision' },
// ];

// // Create element for each project
// projects.forEach(project => {
//     const projectElement = document.createElement('div');
//     projectElement.classList.add('project');
//     projectElement.innerHTML = project.title;
//     main.appendChild(projectElement);
// });

// // Event listeners for each project
// const projectElements = document.querySelectorAll('.project');
// projectElements.forEach((projectElement, index) => {
//     projectElement.addEventListener('click', () => {
//         switch (index) {
//             case 0:
//                 console.log('yes')
//                 break;
//             case 1:
//                 // Code for handling the second project
//                 break;
//             case 2:
//                 // Code for handling the third project
//                 break;
//             // Add more cases for handling other projects
//             default:
//                 alert('Project not found!');
//         };
//     });
// });

// Event listener for arrow keys
let isScrolling = false; // Flag to prevent multiple key presses
window.addEventListener('keydown', (e) => {
    if (isScrolling) {
        return;
    }

    if (e.key === 'ArrowDown') {
        const mainSection = document.getElementById('main');
        mainSection.scrollIntoView({ behavior: 'smooth' });
        isScrolling = true;
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    } else if (e.key === 'ArrowUp') {
        const headerSection = document.getElementById('header');
        headerSection.scrollIntoView({ behavior: 'smooth' });
        isScrolling = true;
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    }
});