// Import
import { resolveCollision } from "./resolveCollision";

// Get canvas context and element
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Mouse coordinates
let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

// Set deltaTime
let deltaTime = 1;

// Function that updateObjectArray
function updateMouseCoordinates(x, y) {
    mouse.x = x;
    mouse.y = y;
}

// Function that update deltaTime
function updateDeltaTimeForClasses(time) {
    deltaTime = time;
}

// Random interger generating function
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Get the distance between 2 objects
function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    // Return the distance between the 2 objects using Pythagorean Formula
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// BouncingCircles Object
class BouncingCircles {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        // Drawing a circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        // Check if circle hit the side of the screen
        if (this.x > (canvas.width - this.radius) || this.x < (0 + this.radius)) {
            this.dx = -this.dx;
        }

        if (this.y > (canvas.height - this.radius) || this.y < (0 + this.radius)) {
            this.dy = -this.dy;
        }

        // Modify x coordinate
        this.x += this.dx * deltaTime;
        this.y += this.dy * deltaTime;

        // Call Circle.draw() function;
        this.draw();
    }
}

// InteractiveBouncingCircle Object
class InteractiveBouncingCircles {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.initialRadius = radius;
        this.color = color;
    }

    draw() {
        // Drawing a circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        // Check if circle hit the side of the screen
        if (this.x > (innerWidth - this.radius) || this.x < (0 + this.radius)) {
            this.dx = -this.dx;
        }

        if (this.y > (innerHeight - this.radius) || this.y < (0 + this.radius)) {
            this.dy = -this.dy;
        }

        // Modify x coordinate
        this.x += this.dx * deltaTime;
        this.y += this.dy * deltaTime;

        // Interaction with the position of users mouse
        let distance = 40; // Set distance
        let maxRadius = this.initialRadius * 5 + 10;

        if (mouse.x - this.x < distance && mouse.x - this.x > -distance && mouse.y - this.y < distance && mouse.y - this.y > -distance) {
            if (this.radius < maxRadius) {
                this.radius += 3;
            }
        } else if (this.radius > this.initialRadius) {
            this.radius -= 3;
        }

        // Call Circle.draw() function;
        this.draw();
    }
}

// CircularMotion class with different versions
class CircularMotion { // Particle Class
    constructor(x, y, size, color, version) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.radians = Math.random() * Math.PI * 2; // Set random radians (starting point)
        this.velocity = 0.03; // Rate of change for the radians
        this.lastMouse = {
            x: x,
            y: y
        };
        this.version = version;

        if (version === 1) {
            //! Version 1
            this.distanceFromCenter = randomIntFromRange(100, 400); // Set random distance from center
        } else if (this.version === 2) {
            //! Version 2
            this.distanceFromCenter = {
                x: randomIntFromRange(100, 400),
                y: randomIntFromRange(100, 400)
            }
        }
    }

    update() {
        const lastPoint = {
            x: this.x,
            y: this.y
        };

        // Move points over time
        this.radians += this.velocity * deltaTime; // Increase radians value over time

        // Gradually 
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.03;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.03;

        // Circular Motion
        if (this.version === 1) {
            //! Version 1
            this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
            this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
            this.draw(lastPoint);
        } else if (this.version === 2) {
            //! Version 2
            this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter.x;
            this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter.y;
            this.draw(lastPoint);
        }
    }

    draw(lastPoint) {
        //! Trail with lines
        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineWidth = this.size;
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();

        //! Trail with circles
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

// Collision class
class Collision {
    constructor(x, y, radius, color, dx, dy) {
        this.x = x;
        this.y = y;
        this.velocity = {
            x: dx,
            y: dy
        }
        this.radius = radius;
        this.color = color;
        this.mass = this.radius ** 2 * Math.PI; // Mass proportional to Particle area
        this.opacity = 0.2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
        ctx.closePath()
    }

    update(objectArray) {
        this.draw();

        // Cycle through every particle
        for (let i = 0; i < objectArray.length; i++) {
            // Do not detect collision with itself
            if (this === objectArray[i]) continue;

            // Check collision
            if (getDistance(this.x, this.y, objectArray[i].x, objectArray[i].y) < (this.radius + objectArray[i].radius)) {
                // Resolve collision
                resolveCollision(this, objectArray[i]);
            }
        }

        // Check for mouse collision
        if (getDistance(this.x, this.y, mouse.x, mouse.y) < 120 && this.opacity <= 0.7) {
            this.opacity += 0.05;
        } else if (this.opacity > 0.2) {
            this.opacity -= 0.05;
            this.opacity = Math.max(0.2, this.opacity); // Make sure this.opacity doesnt go below 0.2
        }

        // Reset x velocity if touching border
        if ((this.x + this.radius) > canvas.width || (this.x - this.radius) < 0) {
            this.velocity.x = -this.velocity.x;
        }

        // Reset y velocity if touching border
        if ((this.y + this.radius) > canvas.height || (this.y - this.radius) < 0) {
            this.velocity.y = -this.velocity.y;
        }

        // Move Particle based on velocity
        this.x += this.velocity.x * deltaTime;
        this.y += this.velocity.y * deltaTime;
    }
}

// GalacticLight class
class GalacticLight {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.draw();
    }
}

// GravityCircle Object
const circleGravity = 0.8;
const circleFriction = 0.99;
class GravityCircle {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if ((this.y + this.radius + this.dy) > canvas.height) {
            this.dy = -this.dy * circleFriction;
        } else {
            this.dy += circleGravity;
        }

        if ((this.x + this.radius) > canvas.width || (this.x - this.radius) < 0) {
            this.dx = -this.dx;
        }

        this.x += this.dx * deltaTime;
        this.y += this.dy * deltaTime;
        this.draw();
    }
}

// Firework Class
const fireworkGravity = 0.03;
const fireworkFriction = 0.99;
class Firework {
    constructor(x, y, radius, color, velocity, opacity) {
        this.x = x,
        this.y = y,
        this.radius = radius,
        this.color = color,
        this.velocity = velocity,
        this.opacity = opacity
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    update() {
        this.draw();
        this.velocity.x *= fireworkFriction;
        this.velocity.y += fireworkGravity;
        this.x += this.velocity.x * deltaTime;
        this.y += this.velocity.y * deltaTime;
        this.opacity -= 0.005; // Fade out effect
    }
}

export {
    BouncingCircles,
    InteractiveBouncingCircles,
    CircularMotion,
    Collision,
    GalacticLight,
    GravityCircle,
    Firework,
    updateMouseCoordinates,
    getDistance,
    updateDeltaTimeForClasses,
} // Export classes