// Imports
import '../styles/index.css';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import importedBgMusic from '../assets/bgMusic.mp3';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.domElement.style.display = 'none'; // Hide canvas initially

// Pointer lock controls
const controls = new PointerLockControls(camera, renderer.domElement);

// Player
const player = { position: new THREE.Vector3(0, 1, 0), health: 100, score: 0 };
camera.position.set(0, 1, 0);
const moveSpeed = 0.1;
const playerSize = 0.5; // For collision detection
const keys = {};

// Background Music
const bgMusic = new Audio(importedBgMusic);
bgMusic.loop = true;
bgMusic.volume = 0.8;

// Add HP bar and score to DOM
const hud = document.createElement('div');
hud.id = 'hud';
hud.style.position = 'absolute';
hud.style.top = '10px';
hud.style.left = '10px';
hud.style.width = '500px';
hud.style.display = 'none'; // Initially invisible
hud.style.background = 'rgba(0,0,0,0.5)';
hud.style.borderRadius = '5px';
hud.style.padding = '10px';
hud.style.display = 'flex';
hud.style.flexDirection = 'column'; // Stack HP and score vertically
hud.style.gap = '10px'; // Space between HP bar and score
document.body.appendChild(hud);

const hpContainer = document.createElement('div');
hpContainer.style.display = 'flex';
hpContainer.style.alignItems = 'center';
hud.appendChild(hpContainer);

const hpLabel = document.createElement('span');
hpLabel.innerText = 'Points de vie:';
hpLabel.style.color = '#fff';
hpLabel.style.marginRight = '10px';
hpContainer.appendChild(hpLabel);

const hpBarContainer = document.createElement('div');
hpBarContainer.style.flexGrow = '1';
hpBarContainer.style.height = '20px';
hpBarContainer.style.background = '#555';
hpBarContainer.style.border = '1px solid #fff';
hpBarContainer.style.borderRadius = '3px';
hpContainer.appendChild(hpBarContainer);

const hpBar = document.createElement('div');
hpBar.style.height = '100%';
hpBar.style.width = '100%';
hpBar.style.background = '#0f0';
hpBar.style.borderRadius = '2px';
hpBarContainer.appendChild(hpBar);

const scoreDisplay = document.createElement('div');
scoreDisplay.id = 'scoreDisplay';
scoreDisplay.style.color = '#fff';
scoreDisplay.style.fontSize = '16px';
scoreDisplay.innerText = `Score: ${player.score}`;
hud.appendChild(scoreDisplay);

// Zombies
const zombies = [];
const baseZombieSpeed = 0.06;
const zombieTypes = ['normal', 'fast', 'tank'];

// Bullets
const bullets = [];
const bulletSpeed = 0.5;
const bulletLifetime = 2; // seconds
const bulletSize = 0.1; // For collision detection

// Walls
const walls = [];
const wallSize = { width: 5, height: 2, depth: 0.2 };
const boundaryWallSize = { width: 100, height: 2, depth: 0.2 }; // For boundary walls
const minWallDistance = 7;

// Floor
const floorGeometry = new THREE.PlaneGeometry(80, 80);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Lighting
scene.add(new THREE.AmbientLight(0x404040));
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

// Generate walls
function generateWalls() {
    const boundaryPositions = [
        { pos: [0, 1, 40], rot: 0 },
        { pos: [0, 1, -40], rot: 0 },
        { pos: [40, 1, 0], rot: Math.PI / 2 },
        { pos: [-40, 1, 0], rot: Math.PI / 2 }
    ];
    boundaryPositions.forEach(({ pos, rot }) => {
        const geometry = new THREE.BoxGeometry(boundaryWallSize.width, boundaryWallSize.height, boundaryWallSize.depth);
        const material = new THREE.MeshBasicMaterial({ color: 0x444444 });
        const wall = new THREE.Mesh(geometry, material);
        wall.position.set(pos[0], pos[1], pos[2]);
        wall.rotation.y = rot;
        scene.add(wall);
        walls.push(wall);
    });
    for (let i = 0; i < 200; i++) {
        let attempts = 0;
        let valid = false;
        let wall;
        while (!valid && attempts < 100) {
            const geometry = new THREE.BoxGeometry(wallSize.width, wallSize.height, wallSize.depth);
            const material = new THREE.MeshBasicMaterial({ color: 0x888888 });
            wall = new THREE.Mesh(geometry, material);
            wall.position.set((Math.random() - 0.5) * 90, 1, (Math.random() - 0.5) * 90);
            wall.rotation.y = Math.random() * Math.PI * 2;
            valid = walls.every(w => wall.position.distanceTo(w.position) >= minWallDistance);
            attempts++;
        }
        if (valid) {
            scene.add(wall);
            walls.push(wall);
        }
    }
}

// Collision detection
function checkCollision(position, size, movement) {
    const min = new THREE.Vector3(position.x - size, position.y - size, position.z - size);
    const max = new THREE.Vector3(position.x + size, position.y + size, position.z + size);
    walls.forEach(wall => {
        const box = new THREE.Box3().setFromObject(wall);
        if (
            min.x < box.max.x && max.x > box.min.x &&
            min.y < box.max.y && max.y > box.min.y &&
            min.z < box.max.z && max.z > box.min.z
        ) {
            const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(wall.quaternion).normalize();
            const dot = movement.dot(normal);
            movement.sub(normal.multiplyScalar(dot));
        }
    });
    return movement;
}
function checkBulletCollision(bullet) {
    const min = new THREE.Vector3(bullet.position.x - bulletSize, bullet.position.y - bulletSize, bullet.position.z - bulletSize);
    const max = new THREE.Vector3(bullet.position.x + bulletSize, bullet.position.y + bulletSize, bullet.position.z + bulletSize);
    for (const wall of walls) {
        const box = new THREE.Box3().setFromObject(wall);
        if (
            min.x < box.max.x && max.x > box.min.x &&
            min.y < box.max.y && max.y > box.min.y &&
            min.z < box.max.z && max.z > box.min.z
        ) return true;
    }
    return false;
}

// Shooting
document.addEventListener('click', () => {
    if (controls.isLocked) {
        const geo = new THREE.SphereGeometry(0.1, 8, 8);
        const mat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const b = new THREE.Mesh(geo, mat);
        b.position.copy(camera.position);
        b.direction = new THREE.Vector3();
        camera.getWorldDirection(b.direction);
        b.time = 0;
        scene.add(b);
        bullets.push(b);
    }
});

// Input
window.addEventListener('keydown', e => keys[e.code] = true);
window.addEventListener('keyup', e => keys[e.code] = false);

// Spawn zombies with variety
function spawnZombie() {
    const type = zombieTypes[Math.floor(Math.random() * zombieTypes.length)];
    let color = 0x00ff00;
    let health = 6;
    let speed = baseZombieSpeed;

    // Determine color, health, and speed based on type
    if (type === 'fast') {
        color = 0xff0000;  // Red
        health = 3;
        speed *= 1.3;
    } else if (type === 'tank') {
        color = 0x006400;  // Dark green
        health = 10;
        speed *= 0.6;
    }

    // All zombies use same size and scale
    const geo = new THREE.BoxGeometry(1, 2, 1);
    const mat = new THREE.MeshBasicMaterial({ color });
    const z = new THREE.Mesh(geo, mat);
    z.scale.set(1, 1, 1);        // Uniform scale
    z.size = 0.5;                // Uniform collision size
    z.health = health;
    z.speed = speed;

    const angle = Math.random() * Math.PI * 2;
    const radius = 20;
    z.position.set(
        Math.cos(angle) * radius,
        1, // Fixed height
        Math.sin(angle) * radius
    );

    scene.add(z);
    zombies.push(z);
}

// Game loop
let isGameRunning = false;
let zombieSpawnInterval = null;
function animate() {
    if (!isGameRunning) return;
    requestAnimationFrame(animate);
    // Player movement
    const dir = new THREE.Vector3();
    const fwd = new THREE.Vector3();
    const rt = new THREE.Vector3();
    camera.getWorldDirection(fwd);
    fwd.y = 0;
    fwd.normalize();
    rt.copy(fwd).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    if (keys['KeyW']) dir.add(fwd);
    if (keys['KeyS']) dir.sub(fwd);
    if (keys['KeyA']) dir.add(rt);
    if (keys['KeyD']) dir.sub(rt);
    if (dir.length()) {
        dir.normalize().multiplyScalar(moveSpeed);
        const adj = checkCollision(camera.position, playerSize, dir);
        controls.getObject().position.add(adj);
    }
    // Bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        b.position.addScaledVector(b.direction, bulletSpeed);
        b.time += 1 / 60;

        if (checkBulletCollision(b) || b.time > bulletLifetime) {
            scene.remove(b);
            bullets.splice(i, 1);
            continue;
        }

        let hit = false;
        for (let j = zombies.length - 1; j >= 0; j--) {
            const z = zombies[j];
            const zombieBox = new THREE.Box3().setFromObject(z); // <-- key change
            if (zombieBox.containsPoint(b.position)) {           // <-- key change
                z.health--;
                if (z.health <= 0) {
                    scene.remove(z);
                    zombies.splice(j, 1);
                    player.score += 10;
                    scoreDisplay.innerText = `Score: ${player.score}`;
                }
                scene.remove(b);
                bullets.splice(i, 1);
                hit = true;
                break;
            }
        }
        if (hit) continue;
    }

    // Zombies
    zombies.forEach(z => {
        const directionToPlayer = camera.position.clone().sub(z.position);
        const distanceToPlayer = directionToPlayer.length();

        // 👇 Make the zombie face the player
        z.lookAt(camera.position.x, z.position.y, camera.position.z);

        const minDistance = playerSize + z.size + 0.1;

        if (distanceToPlayer > minDistance) {
            const moveVector = directionToPlayer.normalize().multiplyScalar(z.speed);
            const adjustedMove = checkCollision(z.position, z.size, moveVector);
            z.position.add(adjustedMove);
        }

        if (distanceToPlayer < z.size + playerSize + 0.2) {
            player.health--;
            if (player.health <= 0) {
                isGameRunning = false;
                clearInterval(zombieSpawnInterval);
                document.getElementById('finalScore').innerText = `Score Final: ${player.score}`;
                document.getElementById('gameOver').classList.remove('hidden');
                hud.style.display = 'none';
                document.getElementById('crosshair').classList.add('hidden');
                renderer.domElement.style.display = 'none';
                controls.unlock();
                bgMusic.pause();
            }
        }
    });

    // Update HP bar
    const hpPct = Math.max(0, player.health) / 100;
    hpBar.style.width = `${hpPct * 100}%`;
    hpBar.style.background = `rgb(${(1 - hpPct) * 255},${hpPct * 255},0)`;
    // Update score display only
    document.getElementById('info').innerText = `Score: ${player.score}`;
    renderer.render(scene, camera);
}

// Start game
document.getElementById('playButton').addEventListener('click', () => {
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('crosshair').classList.remove('hidden');
    hud.style.display = 'flex'; // Show HUD
    renderer.domElement.style.display = 'block';
    player.health = 100; player.score = 0;
    zombies.forEach(z => scene.remove(z)); zombies.length = 0;
    bullets.forEach(b => scene.remove(b)); bullets.length = 0;
    walls.forEach(w => scene.remove(w)); walls.length = 0;
    camera.position.set(0, 1, 0);
    generateWalls();
    isGameRunning = true;
    controls.lock();
    animate();
    zombieSpawnInterval = setInterval(spawnZombie, 2500);
    bgMusic.currentTime = 0;
    bgMusic.play();
});

// Return to menu
document.getElementById('backToMenu').addEventListener('click', () => {
    document.getElementById('gameOver').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');
    hud.style.display = 'none'; // Hide HUD
    player.health = 100; player.score = 0;
    zombies.forEach(z => scene.remove(z)); zombies.length = 0;
    bullets.forEach(b => scene.remove(b)); bullets.length = 0;
    walls.forEach(w => scene.remove(w)); walls.length = 0;
    camera.position.set(0, 1, 0);
});

window.onload = () => {
  // Ensure all UI elements are hidden at load
  hud.style.display = 'none';
  const crosshair = document.getElementById('crosshair');
  const info = document.getElementById('info');
  const gameOver = document.getElementById('gameOver');

  if (crosshair) crosshair.classList.add('hidden');
  if (info) info.classList.add('hidden');
  if (gameOver) gameOver.classList.add('hidden');

  // Also reset score display just in case
  scoreDisplay.innerText = `Score: 0`;
};