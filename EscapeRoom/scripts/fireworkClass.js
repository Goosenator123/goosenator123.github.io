// Particle Class
class Particle {
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
        this.velocity.x *= friction;
        this.velocity.y += gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.opacity -= 0.005; // Fade out effect
    }
}


