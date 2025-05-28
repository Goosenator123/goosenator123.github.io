import "../styles/index.css"
import GAMEMUSIC from "../assets/BACKGROUNDMUSIC.mp3";
import PEWPEW from "../assets/PEWPEW.mp3";
import TAKINGDMG from "../assets/TAKINGDAMAGE.mp3";
import POWERUP from "../assets/POWERUP.mp3";

// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to fill the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create Audio objects for sounds
const pewSound = new Audio(PEWPEW);
const powerupSound = new Audio(POWERUP);
const backgroundMusic = new Audio(GAMEMUSIC);
backgroundMusic.loop = true;
const takingDamageSound = new Audio(TAKINGDMG);

// Global game variables
let ship, asteroids = [], bullets = [], particles = [], powerUps = [];
let score = 0, scoreMultiplier = 1, gameOver = false;
let lastAsteroidSpawnTime = Date.now();

// Utility function for random numbers
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Helper function to compute distance between two points
function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Particle class for explosion, smoke, and bullet trails
class Particle {
  constructor(x, y, radius, color = 'white') {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    const angle = randomRange(0, Math.PI * 2);
    const speed = randomRange(1, 3);
    this.vel = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed
    };
    this.life = 0;
    this.maxLife = randomRange(30, 50);
  }
  
  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.life++;
  }
  
  draw() {
    ctx.save();
    const alpha = 1 - (this.life / this.maxLife);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Function to create an explosion of particles at (x, y)
function createExplosion(x, y, asteroidRadius) {
  const count = Math.floor(randomRange(8, 12)) + Math.floor(asteroidRadius / 10);
  for (let i = 0; i < count; i++) {
    const particleSize = randomRange(1, 3);
    particles.push(new Particle(x, y, particleSize));
  }
}

// PowerUp class definition (four types)
class PowerUp {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; // 'multi', 'bulletSpeed', 'penetration', or 'reloadSpeed'
    this.radius = 10;
    switch(this.type) {
      case 'multi':
        this.color = 'cyan';
        break;
      case 'bulletSpeed':
        this.color = 'purple';
        break;
      case 'penetration':
        this.color = 'magenta';
        break;
      case 'reloadSpeed':
        this.color = 'pink';
        break;
      default:
        this.color = 'white';
    }
    // Initially, power-ups remain stationary
    this.vel = { x: 0, y: 0 };
  }
  
  update() {
    // If the ship is within 100px, magnetize toward it
    if(distance(ship.x, ship.y, this.x, this.y) < 100) {
      let angle = Math.atan2(ship.y - this.y, ship.x - this.x);
      let magnetSpeed = 5;
      this.vel.x = Math.cos(angle) * magnetSpeed;
      this.vel.y = Math.sin(angle) * magnetSpeed;
    } else {
      this.vel.x = 0;
      this.vel.y = 0;
    }
    this.x += this.vel.x;
    this.y += this.vel.y;
  }
  
  draw() {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let text = '';
    switch(this.type) {
      case 'multi':
        text = 'M';
        break;
      case 'bulletSpeed':
        text = 'B';
        break;
      case 'penetration':
        text = 'P';
        break;
      case 'reloadSpeed':
        text = 'R';
        break;
    }
    ctx.fillText(text, this.x, this.y);
  }
}

// Ship class definition
class Ship {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.radius = 15;
    this.angle = 0;
    this.rotation = 0;
    this.thrusting = false;
    this.vel = { x: 0, y: 0 };
    this.friction = 0.99;
    this.acceleration = 0.15;
    this.maxSpeed = 5;
    // New property for bullet speed
    this.bulletSpeed = 5;
    // Power-up properties
    this.bulletCount = 1;
    this.bulletPenetration = 0;
    // Lower initial attack speed (fire rate in ms)
    this.fireRate = 500;
    this.lastShot = 0;
  }

  update() {
    this.angle += this.rotation;
    if (this.thrusting) {
      this.vel.x += Math.cos(this.angle) * this.acceleration;
      this.vel.y += Math.sin(this.angle) * this.acceleration;
    } else {
      this.vel.x *= this.friction;
      this.vel.y *= this.friction;
    }
    let speed = Math.sqrt(this.vel.x ** 2 + this.vel.y ** 2);
    if (speed > this.maxSpeed) {
      this.vel.x = (this.vel.x / speed) * this.maxSpeed;
      this.vel.y = (this.vel.y / speed) * this.maxSpeed;
    }
    this.x += this.vel.x;
    this.y += this.vel.y;
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = canvas.height;
  }

  draw() {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const angle = this.angle;
    const tipX = this.x + Math.cos(angle) * this.radius;
    const tipY = this.y + Math.sin(angle) * this.radius;
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(
      this.x + Math.cos(angle + Math.PI * 2 / 3) * this.radius,
      this.y + Math.sin(angle + Math.PI * 2 / 3) * this.radius
    );
    ctx.lineTo(
      this.x + Math.cos(angle + Math.PI * 4 / 3) * this.radius,
      this.y + Math.sin(angle + Math.PI * 4 / 3) * this.radius
    );
    ctx.closePath();
    ctx.stroke();
  
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(tipX, tipY, 3, 0, Math.PI * 2);
    ctx.fill();
  
    if (this.thrusting) {
      ctx.fillStyle = 'orange';
      ctx.beginPath();
      const flameLength = this.radius + 10 + Math.random() * 10;
      const flameTipX = this.x - Math.cos(angle) * flameLength;
      const flameTipY = this.y - Math.sin(angle) * flameLength;
      const baseLeftX = this.x + Math.cos(angle + Math.PI * 2 / 3) * (this.radius * 0.5);
      const baseLeftY = this.y + Math.sin(angle + Math.PI * 2 / 3) * (this.radius * 0.5);
      const baseRightX = this.x + Math.cos(angle + Math.PI * 4 / 3) * (this.radius * 0.5);
      const baseRightY = this.y + Math.sin(angle + Math.PI * 4 / 3) * (this.radius * 0.5);
      
      ctx.moveTo(baseLeftX, baseLeftY);
      ctx.lineTo(baseRightX, baseRightY);
      ctx.lineTo(flameTipX, flameTipY);
      ctx.closePath();
      ctx.fill();
    }
  }  
}

// Asteroid class definition (splits only once)
class Asteroid {
  constructor(x, y, radius, canSplit = true) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.canSplit = canSplit;
    let dx = ship.x - this.x;
    let dy = ship.y - this.y;
    let baseAngle = Math.atan2(dy, dx);
    let angle = baseAngle + randomRange(-0.2, 0.2);
    let speed = randomRange(1.5, 2.5);
    this.vel = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed
    };
    this.offsets = [];
    const points = Math.floor(randomRange(7, 12));
    for (let i = 0; i < points; i++) {
      this.offsets.push(randomRange(-this.radius * 0.4, this.radius * 0.4));
    }
  }

  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = canvas.height;
  }

  draw() {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const points = this.offsets.length;
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const r = this.radius + this.offsets[i];
      const x = this.x + Math.cos(angle) * r;
      const y = this.y + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }
}

// Bullet class definition
class Bullet {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = ship.bulletSpeed;
    this.radius = 2;
    this.vel = {
      x: Math.cos(angle) * this.speed,
      y: Math.sin(angle) * this.speed
    };
    this.penetration = ship.bulletPenetration;
  }

  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;
    let trail = new Particle(this.x, this.y, randomRange(0.5, 1.5), 'white');
    trail.vel.x = 0;
    trail.vel.y = 0;
    trail.maxLife = 20;
    particles.push(trail);
  }

  draw() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Keyboard input handling
const keys = {};
document.addEventListener('keydown', function(e) {
  keys[e.key] = true;
  if (["ArrowLeft", "ArrowRight", "ArrowUp", " "].includes(e.key)) {
    e.preventDefault();
  }
});
document.addEventListener('keyup', function(e) {
  keys[e.key] = false;
});

// Function to spawn a single asteroid at a random edge
function spawnAsteroid() {
  let x, y;
  if (Math.random() < 0.5) {
    x = Math.random() < 0.5 ? 0 : canvas.width;
    y = randomRange(0, canvas.height);
  } else {
    x = randomRange(0, canvas.width);
    y = Math.random() < 0.5 ? 0 : canvas.height;
  }
  asteroids.push(new Asteroid(x, y, randomRange(30, 50)));
}

// Power-up drop chance when an asteroid is destroyed
function dropPowerUp(x, y) {
  if (Math.random() < 0.4) {
    let types = ['multi', 'bulletSpeed', 'penetration', 'reloadSpeed'];
    let type = types[Math.floor(randomRange(0, types.length))];
    powerUps.push(new PowerUp(x, y, type));
  }
}

// Initialize game state
function init() {
  ship = new Ship();
  ship.bulletCount = 1;
  ship.bulletPenetration = 0;
  ship.bulletSpeed = 5;
  
  bullets = [];
  asteroids = [];
  particles = [];
  powerUps = [];
  score = 0;
  scoreMultiplier = 1;
  gameOver = false;
  
  for (let i = 0; i < 3; i++) {
    spawnAsteroid();
  }
  lastAsteroidSpawnTime = Date.now();
}

// Update game objects
function update() {
  if (gameOver) return;
  
  // Ship rotation and thrust control
  if (keys['ArrowLeft']) {
    ship.rotation = -0.07;
  } else if (keys['ArrowRight']) {
    ship.rotation = 0.07;
  } else {
    ship.rotation = 0;
  }
  ship.thrusting = keys['ArrowUp'];
  ship.update();
  
  // Update power-ups and check for pickup
  for (let i = powerUps.length - 1; i >= 0; i--) {
    let pu = powerUps[i];
    pu.update();
    if (distance(ship.x, ship.y, pu.x, pu.y) < ship.radius + pu.radius) {
      switch(pu.type) {
        case 'multi':
          ship.bulletCount++;
          break;
        case 'bulletSpeed':
          ship.bulletSpeed = Math.min(ship.bulletSpeed + 2, 12);
          break;
        case 'penetration':
          ship.bulletPenetration++;
          break;
        case 'reloadSpeed':
          ship.fireRate = Math.max(ship.fireRate - 50, 100);
          break;
      }
      powerupSound.currentTime = 0;
      powerupSound.play();
      powerUps.splice(i, 1);
    }
  }
  
  // Spawn an orange smoke particle trail when thrusting
  if (ship.thrusting) {
    const rearX = ship.x - Math.cos(ship.angle) * ship.radius;
    const rearY = ship.y - Math.sin(ship.angle) * ship.radius;
    let smoke = new Particle(rearX, rearY, randomRange(1, 2), 'orange');
    smoke.vel.x = randomRange(-0.5, 0.5);
    smoke.vel.y = randomRange(-0.5, 0.5);
    particles.push(smoke);
  }
  
  // Shooting bullets with cooldown
  if (keys[' ']) {
    const now = Date.now();
    if (now - ship.lastShot > ship.fireRate) {
      let baseAngle = ship.angle;
      let spread = 0.1;
      let count = ship.bulletCount;
      for (let i = 0; i < count; i++) {
        let offset = (i - (count - 1) / 2) * spread;
        let bullet = new Bullet(
          ship.x + Math.cos(ship.angle) * ship.radius,
          ship.y + Math.sin(ship.angle) * ship.radius,
          ship.angle + offset
        );
        bullet.penetration = ship.bulletPenetration;
        bullets.push(bullet);
      }
      ship.lastShot = now;
      pewSound.currentTime = 0;
      pewSound.play();
    }
  }
  
  // Update bullets and remove off-screen ones
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    if (
      bullets[i].x < 0 || bullets[i].x > canvas.width ||
      bullets[i].y < 0 || bullets[i].y > canvas.height
    ) {
      bullets.splice(i, 1);
    }
  }
  
  // Update asteroids
  asteroids.forEach(asteroid => asteroid.update());
  
  // Dynamic asteroid spawn: adjust interval as score increases
  let nowTime = Date.now();
  let spawnInterval = Math.min(1500 / ((score / 100) + 1), 1500);
  if (nowTime - lastAsteroidSpawnTime > spawnInterval) {
    spawnAsteroid();
    lastAsteroidSpawnTime = nowTime;
  }
  
  // Collision detection: Bullets vs. Asteroids
  for (let i = asteroids.length - 1; i >= 0; i--) {
    const a = asteroids[i];
    for (let j = bullets.length - 1; j >= 0; j--) {
      const b = bullets[j];
      if (distance(a.x, a.y, b.x, b.y) < a.radius) {
        if (b.penetration > 0) {
          b.penetration--;
        } else {
          bullets.splice(j, 1);
        }
        createExplosion(a.x, a.y, a.radius);
        dropPowerUp(a.x, a.y);
        // Play TAKINGDAMAGE sound when an asteroid is destroyed
        takingDamageSound.currentTime = 0;
        takingDamageSound.play();
        if (a.radius > 20 && a.canSplit) {
          let newRadius = a.radius / 2;
          let frag1 = new Asteroid(a.x, a.y, newRadius, false);
          let frag2 = new Asteroid(a.x, a.y, newRadius, false);
          let baseAngle = Math.atan2(a.vel.y, a.vel.x);
          let angle1 = baseAngle + randomRange(-0.5, 0.5);
          let angle2 = baseAngle + randomRange(-0.5, 0.5);
          let speed = Math.sqrt(a.vel.x ** 2 + a.vel.y ** 2);
          frag1.vel = { x: Math.cos(angle1) * speed, y: Math.sin(angle1) * speed };
          frag2.vel = { x: Math.cos(angle2) * speed, y: Math.sin(angle2) * speed };
          asteroids.push(frag1, frag2);
        }
        asteroids.splice(i, 1);
        score += 10 * scoreMultiplier;
        break;
      }
    }
  }
  
  // Collision detection: Ship vs. Asteroids
  for (let i = 0; i < asteroids.length; i++) {
    const a = asteroids[i];
    if (distance(ship.x, ship.y, a.x, a.y) < ship.radius + a.radius) {
      gameOver = true;
    }
  }
  
  // Update particles; remove expired ones
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    if (particles[i].life > particles[i].maxLife) {
      particles.splice(i, 1);
    }
  }
}

// Draw game objects and HUD
function draw() {
  // Overlay a semi-transparent black rectangle
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ship.draw();
  bullets.forEach(bullet => bullet.draw());
  asteroids.forEach(asteroid => asteroid.draw());
  particles.forEach(particle => particle.draw());
  powerUps.forEach(pu => pu.draw());
  
  // Draw HUD fixed at the top left of the screen
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + Math.floor(score), 20, 20);
  
  if (gameOver) {
    document.getElementById('gameOverMenu').style.zIndex = 2;
  } else {
    document.getElementById('gameOverMenu').style.zIndex = "none";
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// When the Start button is clicked, hide the menu, start background music, and start the game.
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
    backgroundMusic.play();
    init();
    loop();
});

// When the Restart button is clicked, reload the page.
const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', () => {
    window.location.reload();
});
