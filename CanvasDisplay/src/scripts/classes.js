// Get canvas context and element
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

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

export default BouncingCircles;