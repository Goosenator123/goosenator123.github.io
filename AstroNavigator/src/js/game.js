// ================================ Imports ================================
import "../styles/game.css";
import SPACESHIP from "../assets/SPACESHIP.png";
import ASTEROID from "../assets/ASTEROID.png";
import GAMEMUSIC from "../assets/BACKGROUNDMUSIC.mp3";
import PEWPEW from "../assets/PEWPEW.mp3";
import TAKINGDMG from "../assets/TAKINGDAMAGE.mp3";
import POWERUP from "../assets/POWERUP.mp3";

// ============================ Canvas Variables ===========================
const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');

// Function to set the canvas size dynamically
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();

// ============================ Game Variables =============================
let rectangle;
const rectWidth = 60;
const rectHeight = 75;
let projectiles = [];
let particles = [];
let projectileSpeed = -5;
let elapsedTime = 0;
let isGameOver = false;
let upgradeInterval = 10000;
let animationId;
let miliseconds = 0;
let obstacleArray = [];
let lastUpgradeTime = Date.now();
let gamePaused = false;

const directionPressed = {
    'w': false,
    'a': false,
    's': false,
    'd': false,
};

const upgrades = [
    { description: '+20% Attack Speed', apply: (rect) => (rect.atkSpeed = Math.max(50, rect.atkSpeed * 0.8)) },
    { description: '+15% Attack Power', apply: (rect) => (rect.atk = Math.round(rect.atk * 1.15)) },
    { description: '+15 HP', apply: (rect) => {rect.hp += 15; rect.maxHp += 15; drawHPBar(rectangle)} },
    { description: '+20% Projectile Speed', apply: () => {projectileSpeed *= 1.2} },
    { description: '+1 Movement Speed', apply: (rect) => (rect.speed = (rect.speed || 5) + 1) },
];

// =========================== Music Variables ==============================
const bgMusic = new Audio(GAMEMUSIC);
bgMusic.loop = true;
const pewSound = new Audio(PEWPEW);
const takingDmg = new Audio(TAKINGDMG);
const powerUp = new Audio(POWERUP);

// =========================== Utility Functions ============================
function clearCanvas() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

function getRandomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkCollision(player, obstacle) {
    const distX = Math.abs(player.x + player.width / 2 - obstacle.x);
    const distY = Math.abs(player.y + player.height / 2 - obstacle.y);
    const distance = Math.sqrt(distX * distX + distY * distY);
    return distance < obstacle.radius + player.width / 2;
}

// ========================= Drawing Functions ==============================
function drawProgressBar() {
    if (gamePaused) return;

    const barWidth = canvas.width * 0.8;
    const barHeight = 30;
    const x = (canvas.width - barWidth) / 2;
    const y = 20;

    const currentTime = Date.now();
    const elapsedTimeSinceLastUpgrade = currentTime - lastUpgradeTime;
    const progressRatio = Math.min(elapsedTimeSinceLastUpgrade / upgradeInterval, 1);

    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = 'yellow';
    ctx.fillRect(x, y, barWidth * progressRatio, barHeight);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, barWidth, barHeight);
}

function drawHPBar(rectangle) {
    const barWidth = 400;
    const barHeight = 40;
    const x = 10;
    const y = canvas.height - 10 - barHeight;

    const hpRatio = Math.max(rectangle.hp / rectangle.maxHp, 0);

    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, barWidth * hpRatio, barHeight);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, barWidth, barHeight);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`HP: ${rectangle.hp}`, x + barWidth / 2, y + barHeight / 1.5);
}

function drawTime() {
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';

    // Define text and its position
    const text = `Time: ${miliseconds}ms`;
    const x = 100;
    const y = 40;

    // Measure the text width
    const textWidth = ctx.measureText(text).width;

    // Adjust the position if the text would go out of bounds
    const adjustedX = Math.min(x, canvas.width - textWidth - 10); // Keep 10px padding from the right edge
    const adjustedY = Math.min(y, canvas.height - 10); // Keep 10px padding from the bottom edge

    ctx.fillText(text, adjustedX, adjustedY);
}

// ========================= Classes and Entities ===========================
const spaceshipImage = new Image();
spaceshipImage.src = SPACESHIP;

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hp = 100;
        this.maxHp = 100;
        this.atk = 15;
        this.atkSpeed = 1000;
        this.lastProjectileTime = 0;
        this.speed = 2;
    }

    draw() {
        ctx.drawImage(spaceshipImage, this.x, this.y, this.width, this.height);
    }

    update() {
        if (directionPressed['a'] && this.x > 0) this.x -= this.speed;
        if (directionPressed['d'] && this.x + this.width < canvas.width) this.x += this.speed;
        if (directionPressed['w'] && this.y > 0) this.y -= this.speed;
        if (directionPressed['s'] && this.y + this.height < canvas.height) this.y += this.speed;

        if (Date.now() - this.lastProjectileTime > this.atkSpeed) {
            projectiles.push(new Projectile(this.x + this.width / 2, this.y));
            pewSound.play();
            this.lastProjectileTime = Date.now();
        }

        this.draw();
    }
}

class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 5;
        this.speed = projectileSpeed;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.y += this.speed;
        this.draw();
    }
}

const asteroidImage = new Image();
asteroidImage.src = ASTEROID;

class Obstacle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.hp = Math.ceil(radius);
        this.angle = 0;
        this.rotationSpeed = Math.random() * 0.05 + 0.02;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(asteroidImage, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
        ctx.restore();
    }

    update() {
        this.y += this.dy;
        this.x += this.dx;
        this.angle += this.rotationSpeed;
        if (this.angle > Math.PI * 2) this.angle -= Math.PI * 2;
        this.draw();
    }
}

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
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
        this.draw();
    }
}

// =========================== Initialization ===============================
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

function setRectangle() {
    const x = canvas.width / 2 - rectWidth;
    const y = canvas.height - rectHeight - 50;
    rectangle = new Rectangle(x, y, rectWidth, rectHeight);
}

// ============================== Game Loop ==================================
function animate(timestamp) {
    if (isGameOver) {
        localStorage.setItem('survivalTime', (elapsedTime / 1000).toFixed(2));
        window.location.href = 'gameOver.html';
        return;
    }
    const deltaTime = timestamp - elapsedTime;
    elapsedTime += deltaTime;

    clearCanvas();

    particles.forEach((particle) => particle.update());
    rectangle.update();

    projectiles.forEach((p, index) => {
        p.update();
        if (p.y < 0) projectiles.splice(index, 1);
    });

    obstacleArray.forEach((obstacle, i) => {
        obstacle.update();
        if (checkCollision(rectangle, obstacle)) {
            rectangle.hp -= 10;
            takingDmg.play();
            obstacleArray.splice(i, 1);
            if (rectangle.hp <= 0) isGameOver = true;
        } else {
            projectiles.forEach((projectile, j) => {
                if (
                    projectile.x > obstacle.x - obstacle.radius &&
                    projectile.x < obstacle.x + obstacle.radius &&
                    projectile.y > obstacle.y - obstacle.radius &&
                    projectile.y < obstacle.y + obstacle.radius
                ) {
                    obstacle.hp -= rectangle.atk;
                    projectiles.splice(j, 1);
                    if (obstacle.hp <= 0) obstacleArray.splice(i, 1);
                }
            });
        }
    });

    drawHPBar(rectangle);
    drawProgressBar();

    drawTime();


    animationId = requestAnimationFrame(animate);
}

// ============================ Game Start/Setup ============================
function startGame() {
    setInterval(() => {
        if (!gamePaused) miliseconds += 1;
    }, 10);
    setInterval(() => {
        if (!gamePaused) createObstacle();
    }, 100);
    startUpgradeTimer();
    setRectangle();
    initParticles(100);
    animate(0);
}

function startUpgradeTimer() {
    lastUpgradeTime = Date.now();
    setTimeout(() => {
        upgradeInterval += 2000;
        displayUpgrades();
        lastUpgradeTime = Date.now();
    }, upgradeInterval);
}

function createObstacle() {
    const y = -10;
    const dy = 3;

    const baseRadius = 20;
    const maxRadius = 100;
    const radiusGrowthFactor = 0.003;
    const radius = Math.min(baseRadius + miliseconds / 100 * radiusGrowthFactor * maxRadius, maxRadius);

    const x = getRandomIntFromRange(0, canvas.width);
    const dx = getRandomIntFromRange(-0.2, 0.2);
    obstacleArray.push(new Obstacle(x, y, dx, dy, radius));
}

// ============================ Upgrade System ==============================
function displayUpgrades() {
    cancelAnimationFrame(animationId);
    gamePaused = true;

    const selectedUpgrades = [];
    while (selectedUpgrades.length < 3) {
        const randomUpgrade = upgrades[Math.floor(Math.random() * upgrades.length)];
        if (!selectedUpgrades.includes(randomUpgrade)) selectedUpgrades.push(randomUpgrade);
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const boxWidth = 400;
    const boxHeight = 200;
    const spacing = 50;
    const startX = (canvas.width - (3 * boxWidth + 2 * spacing)) / 2;
    const startY = canvas.height / 2 - boxHeight / 2;

    selectedUpgrades.forEach((upgrade, index) => {
        const x = startX + index * (boxWidth + spacing);
        ctx.fillStyle = 'black';
        ctx.fillRect(x, startY, boxWidth, boxHeight);
        ctx.strokeStyle = "#0074ff";
        ctx.strokeRect(x, startY, boxWidth, boxHeight);

        ctx.fillStyle = '#00d4ff';
        ctx.textAlign = 'center';
        
        ctx.font = 'bold 24px Arial';
        ctx.fillText(upgrade.description, x + boxWidth / 2, startY + boxHeight / 2 - 20);
        
        ctx.font = '24px Arial';
        ctx.fillText(`Press ${index + 1}`, x + boxWidth / 2, startY + boxHeight / 2 + 20);
    });

    const upgradeHandler = (event) => {
        if (['1', '2', '3'].includes(event.key)) {
            const choice = parseInt(event.key) - 1;
            selectedUpgrades[choice].apply(rectangle);
            window.removeEventListener('keydown', upgradeHandler);
            powerUp.play();
            startUpgradeTimer();
            requestAnimationFrame(animate);
            gamePaused = false;
        }
    };

    window.addEventListener('keydown', upgradeHandler);
}

// ============================== Event Listeners ===========================
window.onload = () => {
    startGame();
};

let initialPlayMusic = true;
window.addEventListener('keydown', () => {
    if (initialPlayMusic)  bgMusic.play();
    initialPlayMusic = false;
})

window.addEventListener('keydown', (event) => {
    if (['w', 'a', 's', 'd'].includes(event.key)) directionPressed[event.key] = true;
});

window.addEventListener('keyup', (event) => {
    if (['w', 'a', 's', 'd'].includes(event.key)) directionPressed[event.key] = false;
});

window.addEventListener('resize', () => {
    setCanvasSize();
    setRectangle();
});
