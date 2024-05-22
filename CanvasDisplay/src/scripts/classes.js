// Get canvas context and element
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Mouse coordinates
let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

// Function that updateObjectArray
function updateMouseCoordinates(x, y) {
    mouse.x = x;
    mouse.y = y;
}

// Random interger generating function
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// BouncingCircles class
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
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.stroke();
        ctx.fill();
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
        this.x += this.dx;
        this.y += this.dy;

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
        this.radians += this.velocity; // Increase radians value over time

        // Gradually 
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.1;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.1;

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
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();

    }
}

export {
    BouncingCircles,
    CircularMotion,
    updateMouseCoordinates,
} // Export classes