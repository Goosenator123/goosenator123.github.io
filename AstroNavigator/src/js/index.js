// ================================ Imports ================================
import "../styles/index.css";

// ========================== DOM Element References ========================
const startButton = document.getElementById('start-button');
const instructionsButton = document.getElementById('instructions-button');
const backButton = document.getElementById('back-button');
const instructions = document.getElementById('instruction-section');
const menuContainer = document.querySelector('.menu-container');
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

// ============================ Canvas Setup ================================
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();

window.addEventListener('resize', () => {
    setCanvasSize();
    initParticles(100); // Reinitialize particles on resize
});

// ========================== Particle System ===============================
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
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.y -= this.speed;
        if (this.y + this.size < 0) {
            this.y = canvas.height + this.size;
            this.x = Math.random() * canvas.width;
        }
        this.draw();
    }
}

let particles = [];

function initParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 1;
        const speed = Math.random() * 2 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y, size, speed));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => particle.update());
    requestAnimationFrame(animateParticles);
}

// Initialize particles and start animation
initParticles(100);
animateParticles();

// ============================ Event Handlers ==============================
startButton.addEventListener('click', () => {
    window.location.href = 'game.html';
});

let isShowingInstructions = false;

instructionsButton.addEventListener('click', () => {
    toggleInstructions();
});

backButton.addEventListener('click', () => {
    toggleInstructions();
});

function toggleInstructions() {
    if (isShowingInstructions) {
        instructions.classList.add('hidden');
        instructions.style.zIndex = -100;
    } else {
        instructions.classList.remove('hidden');
        instructions.style.zIndex = 100;
    }
    isShowingInstructions = !isShowingInstructions;
}
