// Retrieving references to the canvas element and color radio inputs
const canvas = document.querySelector('canvas');
const redChoice = document.getElementById('red');
const blueChoice = document.getElementById('blue');
const greenChoice = document.getElementById('green');
const title = document.getElementById('title');

// Retrieving the 2D rendering context
const ctx = canvas.getContext('2d');

// Setting canvas size to full web page 
canvas.width = innerWidth;
canvas.height = innerHeight;

// Declaring variables
let gravity = 0.3;
let friction = 0.9;
let ball;
let ballArray = [];
let animation1;
let ballSpawn = true;
let setColour = 'red';
let colorIndex = 0;

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

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Ball Object
function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = dy;

    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    this.update = () => {
        if ((this.y + this.radius + this.dy) > canvas.height) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }

        if ((this.x + this.radius) > canvas.width || (this.x - this.radius) < 0) {
            this.dx = -this.dx;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

// Implementation
function init() {
    ballArray = []; // Clear array
    ballSpawn = true;
}

// Create and insert ball in array
let timer;
function createBall() {
    if (ballSpawn) {
        // Setting random variables
        let radius = randomIntFromRange(10, 40);
        let x = randomIntFromRange(radius, (canvas.width - radius));
        let y = 10;
        let dx = randomIntFromRange(-10, 10);
        let dy = randomIntFromRange(5, 10);
        let color = '';

        // Setting color depending on theme
        if (setColour === 'red') {
            color = redTheme[randomIntFromRange(1, 5)];
        } else if (setColour === 'green') {
            color = greenTheme[randomIntFromRange(1, 5)];
        } else if (setColour === 'blue') {
            color = blueTheme[randomIntFromRange(1, 5)];
        }

        // Inserting ball Object
        ballArray.push(new Ball(x, y, dx, dy, radius, color));
        
        setTimeout(createBall, 300); // Delay for 1 second between each ball creation

        // Clear the timer after 60 seconds
        if (!timer) {
            timer = setTimeout(() => {
                // Set an interval to remove the first ball every second
                timer = setInterval(() => {
                    if (ballArray.length > 0) {
                        ballArray.shift(); // Remove the first ball from the array
                    } else {
                        clearInterval(timer);
                    }
                }, 300);
            }, 30000);
        }
    }
}

// Change balls' color depending on theme
function updateBalls() {
    ballArray.forEach(ball => {
        if (setColour === 'green') {
            ball.color = greenTheme[colorIndex];
            colorIndex = (colorIndex + 1) % greenTheme.length;
        } else if (setColour === 'blue') {
            ball.color = blueTheme[colorIndex];
            colorIndex = (colorIndex + 1) % blueTheme.length;
        } else {
            ball.color = redTheme[colorIndex];
            colorIndex = (colorIndex + 1) % redTheme.length;
        }
    });
}

// Change title Colour depending on theme
const titleColorChange = setInterval(() => {
    if (setColour === 'green') {
        title.style.color = greenTheme[colorIndex];
        colorIndex = (colorIndex + 1) % greenTheme.length;
    } else if (setColour === 'blue') {
        title.style.color = blueTheme[colorIndex];
        colorIndex = (colorIndex + 1) % blueTheme.length;
    } else {
        title.style.color = redTheme[colorIndex];
        colorIndex = (colorIndex + 1) % redTheme.length;
    }
}, 1000)


function animate() {
    if (animation1) {
        // Make a loop
        requestAnimationFrame(animate);
    
        // Clear canvas
        ctx.clearRect(0, 0, innerWidth, innerHeight);
    
        // Move the ball Objects in ballArray
        for (let i = 0; i < ballArray.length; i++) {
            ballArray[i].update();
        }
    }
}

// Event listener
window.addEventListener('resize', () => {
    // Setting canvas size to full web page 
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})

window.onload = () => {
    animation1 = true; // Set intro animation on
    init(); // Load balls
    createBall();
    animate();
}

// Change color depending on theme selected
redChoice.addEventListener('change', () => {
    setColour = 'red';
    updateBalls();
});

blueChoice.addEventListener('change', () => {
    setColour = 'blue';
    updateBalls();
});

greenChoice.addEventListener('change', () => {
    setColour = 'green';
    updateBalls();
});