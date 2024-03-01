// Declaring variables
let gravity = 0.3;
let friction = 0.9;

// Ball Object
function Ball(x, y, dx, dy, radius, color, text='') {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
    this.text = text;
    this.bounce = 0;

    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.stroke();
        ctx.fill();
        ctx.font = '36px Arial';
        ctx.closePath();
        if (this.text !== '') {
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText(this.text, this.x, this.y + 12, this.radius * 2 - 20);
        }
    }

    this.update = () => {
        if ((this.y + this.radius + this.dy) > canvas.height) {
            this.dy = -this.dy * friction;
            this.bounce++;
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

function randomIntFromRange(min, max) {
    let x = Math.floor(Math.random() * (max - min + 1) + min)
    value = x
    console.log(value)
    return value
}