// Clock Widget
setInterval(() => {
  const now = new Date();
  document.getElementById('time-widget').textContent = now.toLocaleTimeString();
}, 1000);

// Window Management
function openWindow(id) {
  document.querySelectorAll('.window').forEach(w => w.classList.add('hide'));
  const target = document.getElementById(id);
  if (target) target.classList.remove('hide');
}

function closeWindow(id) {
  document.getElementById(id).classList.add('hide');
}

// Interactive Terminal Logic
const termInput = document.getElementById('terminal-input');
const termOutput = document.getElementById('terminal-output');

termInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = termInput.value.trim().toLowerCase();
    termInput.value = '';

    const p = document.createElement('p');
    p.className = 'term-text';
    p.innerHTML = `<span class="prompt">visitor@github:~$</span> ${cmd}`;
    termOutput.appendChild(p);

    let res = '';
    if (cmd === 'help') {
      res = 'Commands: <span class="cyan">about</span>, <span class="cyan">projects</span>, <span class="cyan">skills</span>, <span class="cyan">clear</span>';
    } else if (cmd === 'about') {
      res = 'Creative Web Developer building interactive frontend experiences.';
    } else if (cmd === 'projects') {
      res = '1. Pixel Art Studio | 2. Mastermind Quiz OS | 3. Hash Scanner';
    } else if (cmd === 'skills') {
      res = 'JavaScript (ES6+), HTML5, CSS3, Git, Node.js Basics';
    } else if (cmd === 'clear') {
      termOutput.innerHTML = '';
      return;
    } else if (cmd !== '') {
      res = `Command not recognized: '${cmd}'. Type <span class="cyan">'help'</span>.`;
    }

    if (res) {
      const resp = document.createElement('p');
      resp.className = 'term-text green';
      resp.innerHTML = res;
      termOutput.appendChild(resp);
    }
    
    termOutput.scrollTop = termOutput.scrollHeight;
  }
});

// Interactive Background Canvas Particles
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let particleCount = 80;
let mouse = { x: null, y: null, radius: 120 };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    // Mouse Interaction
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius) {
      this.x -= (dx / distance) * 3;
      this.y -= (dy / distance) * 3;
    }
  }

  draw() {
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw connecting lines
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        ctx.strokeStyle = `rgba(56, 189, 248, ${1 - dist / 100})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateParticles);
}

document.getElementById('particle-slider').addEventListener('input', (e) => {
  particleCount = parseInt(e.target.value);
  initParticles();
});

document.getElementById('explode-btn').addEventListener('click', () => {
  particles.forEach(p => {
    p.vx = (Math.random() - 0.5) * 12;
    p.vy = (Math.random() - 0.5) * 12;
  });
});

// Start Canvas
resizeCanvas();
animateParticles();

// Default Window open
openWindow('terminal-window');
