// Shrek movie script for the gameee
const script1 = ""
const canvas = document.getElementById('canvas');
const userInput = document.getElementById('typing-area');

// Retrieving the 2D rendering context
const ctx = canvas.getContext('2d');

// Setting canvas size to full web page 
canvas.width = innerWidth;
canvas.height = (innerHeight * 0.8);

// Color Arrays
const redTheme = [
    '#9d0208',
    '#d00000',
    '#dc2f02',
    '#f48c06',
    '#f48c06'
];
const blueTheme = [
    '#6930c3',
    '#5e60ce',
    '#4ea8de',
    '#56cfe1',
    '#64dfdf'
]
const greenTheme = [
    '#004b23',
    '#007200',
    '#38b000',
    '#70e000',
    '#ccff33'
]

let x = new Ball(100,100,5,1,50,redTheme[1]);

// Animate function
function animate() {
    requestAnimationFrame(animate);

    // Clear canvas by redrawing background
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
    
    x.update();
}

// Event listener
window.addEventListener('resize', () => {
    // Setting canvas size to full web page 
    canvas.width = innerWidth;
    canvas.height = (innerHeight * 0.8);
})

window.onload = () => {
    x.draw();
    animate();
}

// userInput.addEventListener('input', () => {
//     if (typedWord === ball.word) {
//         // Typed word matches the word inside the ball, hide the ball
//         ball.y = -ball.radius; // Move the ball above the canvas
//         event.target.value = ''; // Clear the input field
//     }
// })