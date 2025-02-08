// -------------------------------
// Dynamically load dat.GUI from CDN
// -------------------------------
function loadScript(url, callback) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  script.onload = callback;
  document.head.appendChild(script);
}
  
// -------------------------------
// Intro Page & Sound Effects
// -------------------------------
const intro = document.getElementById("intro");
const startButton = document.getElementById("startButton");
import backgroundMusicAudio from "../assets/bgMusic.mp3";
const backgroundMusic = new Audio(backgroundMusicAudio);
backgroundMusic.loop = true;
  
startButton.addEventListener("click", function () {
  intro.style.display = "none";
  backgroundMusic.volume = 0.5;
  backgroundMusic.play();
});
  
// -------------------------------
// Canvas Configuration
// -------------------------------
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
  
function setCanvasSize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
setCanvasSize();
window.addEventListener("resize", setCanvasSize);
  
// -------------------------------
// Control Object for dat.GUI and Other Settings
// -------------------------------
const controls = {
  waveAmplitude: 100,
  waveFrequency: 0.01,
  gravity: 0.5,
  wind: 0,
  // Updated clearBalls: Trigger explosion for each ball then clear after a short delay.
  clearBalls: function () {
    balls.forEach((ball) => createExplosion(ball));
    setTimeout(() => {
      balls = [];
    }, 100);
  },
  spawnBall: function () {
    balls.push(new Ball(Math.random() * canvas.width));
  },
};
  
// -------------------------------
// Dynamic Wave Background
// -------------------------------
const wave = {
  length: 0.005, // Wave length
  amplitude: controls.waveAmplitude,
  frequency: controls.waveFrequency,
};
  
let increment = wave.frequency;
  
// getWaveY returns the current y-value of the wave at a given x.
function getWaveY(x) {
  return (
    canvas.height / 1.5 +
    Math.sin(x * wave.length + increment) * wave.amplitude * Math.cos(increment)
  );
}
  
function clearScreen() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
  
function drawWave() {
    ctx.beginPath();
    const startY =
      canvas.height / 1.5 +
      Math.sin(0 * wave.length + increment) * wave.amplitude * Math.cos(increment);
    ctx.moveTo(0, startY);
    for (let i = 0; i < canvas.width; i += 0.5) {
      const waveHeight =
        canvas.height / 1.5 +
        Math.sin(i * wave.length + increment) * wave.amplitude * Math.cos(increment);
      ctx.lineTo(i, waveHeight);
    }
    // Connect the end of the wave to the bottom-right corner.
    ctx.lineTo(canvas.width, canvas.height);
    // Draw a line along the bottom of the canvas to the bottom-left corner.
    ctx.lineTo(0, canvas.height);
    // Close the path back to the starting point.
    ctx.closePath();
    
    // Use fillStyle to fill the closed section.
    const hue = Math.abs(200 * Math.sin(increment));
    ctx.fillStyle = `hsl(${hue}, 50%, 50%)`;
    ctx.fill();
    
    // (Optional: If you still want an outline, you could call ctx.stroke() here.)
    
    // Update increment once per frame.
    increment += wave.frequency;
  }
  
  
// -------------------------------
// Ball Class – Floats on the wave with a gentle spring/damper effect
// and a trail that gradually gets smaller.
// -------------------------------
class Ball {
  constructor(x) {
    this.x = x;
    this.radius = 25 + Math.random() * 20; // Larger balls on average.
    this.y = -this.radius - Math.random() * 100;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = 0;
    this.color = this.getRandomColor();
    this.onWave = false;
    this.trail = [];
    this.trailMax = 10;
    this.mass = Math.PI * (this.radius ** 2); // Mass proportional to area.
  }
  getRandomColor() {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FFD433"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    // Constrain horizontal motion.
    if (this.x - this.radius < 0) {
      this.x = this.radius;
      this.vx *= -1;
    } else if (this.x + this.radius > canvas.width) {
      this.x = canvas.width - this.radius;
      this.vx *= -1;
    }
    const waveY = getWaveY(this.x);
    const targetY = waveY - this.radius;
    
    if (this.y + this.radius <= waveY) {
      // Falling phase.
      this.vy += controls.gravity;
      this.vx += controls.wind;
      this.x += this.vx;
      this.y += this.vy;
    } else {
      // On-wave phase: use a spring-damper for smooth floating.
      const springConstant = 0.05;
      const damping = 0.9;
      const displacement = targetY - this.y;
      const force = displacement * springConstant;
      this.vy = (this.vy + force) * damping;
      this.y += this.vy;
  
      // Horizontal motion: follow the wave slope.
      const delta = 1;
      const y1 = getWaveY(this.x);
      const y2 = getWaveY(this.x + delta);
      const slope = (y2 - y1) / delta;
      const theta = Math.atan(slope);
      const ax = controls.gravity * Math.sin(theta);
      this.vx += ax + controls.wind;
      this.x += this.vx;
      this.vx *= 0.995;
  
      if (this.y + this.radius < getWaveY(this.x) - 1) {
        this.onWave = false;
      }
    }
  
    // Update trail.
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > this.trailMax) {
      this.trail.shift();
    }
  }
  draw() {
    // Draw the trail with gradually smaller circles.
    for (let i = 0; i < this.trail.length; i++) {
      const pos = this.trail[i];
      const alpha = ((i + 1) / this.trail.length) * 0.6;
      const trailRadius = this.radius * ((i + 1) / this.trail.length);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, trailRadius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
    // Draw the ball.
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  isClicked(mx, my) {
    const dx = mx - this.x;
    const dy = my - this.y;
    return dx * dx + dy * dy <= this.radius * this.radius;
  }
}
  
// -------------------------------
// Particle Class for Explosion Effects
// -------------------------------
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = 3 + Math.random() * 3;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 1;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.color = color;
    this.alpha = 1;
    this.friction = 0.98;
    this.gravity = 0.2;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.alpha -= 0.02;
    if (this.alpha < 0) this.alpha = 0;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
  isDead() {
    return this.alpha <= 0;
  }
}
  
let balls = [];
let particles = [];
  
// -------------------------------
// User Interactions
// -------------------------------
canvas.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  const x = e.clientX;
  const ball = new Ball(x);
  balls.push(ball);
});
  
canvas.addEventListener("click", function (e) {
  const clickedX = e.clientX;
  const clickedY = e.clientY;
  for (let i = balls.length - 1; i >= 0; i--) {
    if (balls[i].isClicked(clickedX, clickedY)) {
      createExplosion(balls[i]);
      balls.splice(i, 1);
      break;
    }
  }
});
  
function createExplosion(ball) {
  const numParticles = 20 + Math.floor(Math.random() * 10);
  for (let i = 0; i < numParticles; i++) {
    const particle = new Particle(ball.x, ball.y, ball.color);
    particles.push(particle);
  }
}
  
// -------------------------------
// Simple Collision Handling Between Balls using Realistic Collision Resolution
// -------------------------------
function getDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}
  
function rotate(velocity, angle) {
  return {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };
}
  
function resolveCollision(ball, otherBall) {
  const xVelocityDiff = ball.vx - otherBall.vx;
  const yVelocityDiff = ball.vy - otherBall.vy;
  const xDist = otherBall.x - ball.x;
  const yDist = otherBall.y - ball.y;
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    const angle = -Math.atan2(otherBall.y - ball.y, otherBall.x - ball.x);
    const m1 = ball.mass;
    const m2 = otherBall.mass;
    const u1 = rotate({ x: ball.vx, y: ball.vy }, angle);
    const u2 = rotate({ x: otherBall.vx, y: otherBall.vy }, angle);
    const v1 = {
      x: (u1.x * (m1 - m2) + 2 * m2 * u2.x) / (m1 + m2),
      y: u1.y
    };
    const v2 = {
      x: (u2.x * (m2 - m1) + 2 * m1 * u1.x) / (m1 + m2),
      y: u2.y
    };
    const finalV1 = rotate(v1, -angle);
    const finalV2 = rotate(v2, -angle);
    ball.vx = finalV1.x;
    ball.vy = finalV1.y;
    otherBall.vx = finalV2.x;
    otherBall.vy = finalV2.y;
  }
}
  
function handleCollisions() {
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const ballA = balls[i];
      const ballB = balls[j];
      if (getDistance(ballA.x, ballA.y, ballB.x, ballB.y) < ballA.radius + ballB.radius) {
        resolveCollision(ballA, ballB);
      }
    }
  }
}
  
// -------------------------------
// Main Animation Loop
// -------------------------------
function animate() {
  requestAnimationFrame(animate);
  clearScreen();
  drawWave();
  for (let ball of balls) {
    ball.update();
  }
  handleCollisions();
  for (let ball of balls) {
    ball.draw();
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}
animate();
  
// -------------------------------
// dat.GUI Controls
// -------------------------------
loadScript("https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.9/dat.gui.min.js", function () {
  const gui = new dat.GUI();
  gui.add(controls, "waveAmplitude", 50, 300).onChange((value) => {
    wave.amplitude = value;
  });
  gui.add(controls, "waveFrequency", 0.001, 0.05).onChange((value) => {
    wave.frequency = value;
  });
  gui.add(controls, "gravity", 0.1, 2);
  gui.add(controls, "wind", -0.2, 0.2);
  gui.add(controls, "spawnBall").name("Spawn Ball");
  gui.add(controls, "clearBalls").name("Clear Balls");
});
