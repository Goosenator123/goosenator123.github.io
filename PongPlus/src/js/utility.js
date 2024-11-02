import bounceSound from '../sound/bounceSound.mp3';

// Set sound
const ballBounceSound = new Audio(bounceSound);
ballBounceSound.volume = 1;

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

//! ====== Ball Class ======
class Ball {
    constructor(x, y, radius, dx = 0, dy = 0, colorArray = []) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = 'white';
        this.dx = dx;
        this.dy = dy;
        this.colorArray = colorArray;
        this.trailArray = [];
        this.maxTrailLength = 10;
    }

    drawTrail() {
        for (let i = 0; i < this.trailArray.length; i++) {
            const trail = this.trailArray[i];
            const trailRatio = (1 - (i / this.trailArray.length));
            ctx.beginPath();
            ctx.arc(trail.x, trail.y, this.radius * trailRatio, 0, Math.PI * 2, false);
            ctx.fillStyle = `rgba(255, 255, 255, ${trailRatio})`;
            ctx.fill();
            ctx.closePath();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'white';
        ctx.setLineDash([]); // Reset to solid line
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        this.drawTrail();
    }

    playBounceSound() {
        ballBounceSound.currentTime = 0;
        ballBounceSound.play();
    }

    // Helper function to handle collisions
    handleEdgeCollision(edge, axis) {
        if (axis === 'x') {
            this.dx *= -1; // Reverse horizontal direction
            changeColor(this.colorArray[getRandomIntegerFromRange(0, this.colorArray.length - 1)], edge);
        } else {
            this.dy *= -1; // Reverse vertical direction
            changeColor(this.colorArray[getRandomIntegerFromRange(0, this.colorArray.length - 1)], edge);
        }
        this.playBounceSound();
    }

    // Update ball position
    update(playerPaddle, aiPaddle, obstacles, acceleration) {
        // Add current position to trail array
        this.trailArray.unshift({ x: this.x, y: this.y });

        // Remove oldest trail position if trail array is too long
        if (this.trailArray.length > this.maxTrailLength) {
            this.trailArray.pop();
        }

        // Check for edge collisions
        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius; // Adjust position to the bottom edge
            this.handleEdgeCollision('bottom', 'y');
        } else if (this.y - this.radius < 0) {
            this.y = this.radius; // Adjust position to the top edge
            this.handleEdgeCollision('top', 'y');
        }

        // Check if the ball is colliding with the left and right of a paddle
        if (checkHorizontalCollision(this, playerPaddle) || checkHorizontalCollision(this, aiPaddle)) {
            this.dx *= -1; // Reverse horizontal direction
            this.playBounceSound();
        }

        // Check if the ball is colliding with the top and bottom of a paddle
        if (checkVerticalCollision(this, playerPaddle) || checkVerticalCollision(this, aiPaddle)) {
            this.dy *= -1; // Reverse vertical direction
            this.playBounceSound();
        }

        // Check if the ball is colliding with an obstacle
        for (const obstacle of obstacles) {
            if (getDistance(this, obstacle) < this.radius + obstacle.radius) {
                resolveObstacleCollision(this, obstacle);
            }
        }

        // Accelerate the ball
        this.dx = this.dx * acceleration;
        this.dy = this.dy * acceleration;

        // Change ball position and draw
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

//! ====== Color Change Functions ======
let intervalIds = { top: null, bottom: null };
const targetBorder = document.getElementById('game-canvas');

async function changeColor(hslString, border) {
    if (!hslString) return;

    // Use a regular expression to match the HSL values
    const regex = /hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/;
    const match = hslString.match(regex);
    let lightness = parseInt(match[3]);

    // Helper function to change border color
    const changeBorderColor = (borderSide) => {
        if (intervalIds[borderSide]) clearInterval(intervalIds[borderSide]);
        targetBorder.style[`border${capitalizeFirstLetter(borderSide)}Color`] = hslString;

        intervalIds[borderSide] = setInterval(() => {
            if (lightness < 100) {
                lightness += 1;
                const newHslString = `hsl(${match[1]}, ${match[2]}%, ${lightness}%)`;
                targetBorder.style[`border${capitalizeFirstLetter(borderSide)}Color`] = newHslString;
            } else {
                clearInterval(intervalIds[borderSide]);
            }
        }, 10);
    };

    switch (border) {
        case 'top':
            changeBorderColor('top');
            break;
        case 'bottom':
            changeBorderColor('bottom');
            break;
    }
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//! ====== Collision Detection Functions ======
function checkHorizontalCollision(ball, paddle) {
    const withinVerticalBounds = ball.y > paddle.y && ball.y < paddle.y + paddle.height;
    const horizontalCollision = ball.x + ball.radius > paddle.x && ball.x - ball.radius < paddle.x + paddle.width;

    if (withinVerticalBounds && horizontalCollision) {
        // Adjust ball's position to avoid clipping into the paddle
        if (ball.x < paddle.x) {
            ball.x = paddle.x - ball.radius; // Left side of paddle
        } else {
            ball.x = paddle.x + paddle.width + ball.radius; // Right side of paddle
        }
        return true;
    }
    return false;
}

function checkVerticalCollision(ball, paddle) {
    const withinHorizontalBounds = ball.x > paddle.x && ball.x < paddle.x + paddle.width;
    const verticalCollision = ball.y + ball.radius > paddle.y && ball.y - ball.radius < paddle.y + paddle.height;

    if (withinHorizontalBounds && verticalCollision) {
        // Adjust ball's position to avoid clipping into the paddle
        if (ball.y < paddle.y) {
            ball.y = paddle.y - ball.radius; // Above paddle
        } else {
            ball.y = paddle.y + paddle.height + ball.radius; // Below paddle
        }
        return true;
    }
    return false;
}

function resolveObstacleCollision(ball, obstacle) {
    // Calculate velocity differences and position differences
    const xVelocityDiff = ball.dx;
    const yVelocityDiff = ball.dy - obstacle.dy;
    const xPositionDiff = obstacle.x - ball.x;
    const yPositionDiff = obstacle.y - ball.y;

    // Check if the ball is moving towards the obstacle
    if (xVelocityDiff * xPositionDiff + yVelocityDiff * yPositionDiff >= 0) {
        // Calculate angle between the ball and obstacle
        const angle = Math.atan2((obstacle.y - ball.y), (obstacle.x - ball.x));

        // Velocity before collision
        const u1 = rotateVector(ball, -angle);

        // Solve collision (ball bounce off the obstacle with the same speed)
        const v1 = { dx: -u1.dx, dy: u1.dy };

        // Velocity after collision
        const finalV1 = rotateVector(v1, angle);

        // Update ball velocity
        ball.dx = finalV1.dx;
        ball.dy = finalV1.dy;

        ball.playBounceSound();
    }
}

//! ====== Utility Functions ======
function rotateVector(object, angle) {
    return {
        dx: (Math.cos(angle) * object.dx) - (Math.sin(angle) * object.dy),
        dy: (Math.sin(angle) * object.dx) + (Math.cos(angle) * object.dy)
    }
}

// Get distance function
function getDistance(object1, object2) {
    const dx = object2.x - object1.x;
    const dy = object2.y - object1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function clearCanvas() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

function getRandomIntegerFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//! ====== Paddle Class ======
class Paddle {
    constructor(x, y, width, height, color = 'white') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(value, isGameOn) {
        if (this.y + value >= 0 && this.y + this.height + value <= canvas.height && isGameOn) {
            this.y += value;
        }
        this.draw();
    }
}

//! ====== Obstacle Class ======
class Obstacle {
    constructor(x, y, radius, dy, color = 'white') {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dy = dy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) this.dy *= -1;
        this.y += this.dy;
        this.draw();
    }
}

// Export the classes and functions
export { Ball, Paddle, Obstacle, clearCanvas, getRandomIntegerFromRange, getDistance };