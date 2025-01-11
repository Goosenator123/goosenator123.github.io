// ================================ Imports ================================
import "../styles/gameOver.css";
import GAMEOVERMUSIC from "../assets/GAMEOVER.mp3";

// ============================ Music Variables ============================
const gameOverMusic = new Audio(GAMEOVERMUSIC);
gameOverMusic.loop = true;

// ======================== Retrieve Survival Time ==========================
const survivalTime = localStorage.getItem('survivalTime') || '0.00';
document.getElementById('survival-time').textContent = survivalTime;

// ======================== Redirect to Menu ================================
document.getElementById('menu-button').addEventListener('click', () => {
    window.location.href = 'index.html';
});

// ========================== Canvas Variables ==============================
const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// =========================== Particle Effect ==============================
const particlesArray = [];
const numberOfParticles = 100;

class Particle {
    constructor(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.shadowColor = '#0074ff';
        ctx.shadowBlur = 15;
        ctx.fill();
    }

    update() {
        this.y -= this.speed;
        if (this.y < 0 - this.size) {
            this.y = canvas.height + this.size;
            this.x = Math.random() * canvas.width;
        }
    }
}

function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 3 + 1; // Random size between 1 and 4
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speed = Math.random() * 2 + 1; // Random speed between 1 and 3
        particlesArray.push(new Particle(x, y, size, speed));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

// =========================== Initialization ===============================
initParticles();
animateParticles();

// ========================= Window Resize Handling =========================
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray.length = 0; // Clear existing particles
    initParticles(); // Reinitialize particles
});

let initialPlayMusic = true;
window.addEventListener('keyup', () => {
    if (initialPlayMusic) gameOverMusic.play();
    initialPlayMusic = false;
})
