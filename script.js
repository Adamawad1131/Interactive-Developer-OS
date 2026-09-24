// Clock
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

// Terminal Logic with Custom Adam Awad Message
const termInput = document.getElementById('terminal-input');
const termOutput = document.getElementById('terminal-output');

termInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = termInput.value.trim().toLowerCase();
    termInput.value = '';

    const p = document.createElement('p');
    p.className = 'term-text';
    p.innerHTML = `<span class="prompt">adam@cyber-os:~$</span> ${cmd}`;
    termOutput.appendChild(p);

    let res = '';
    if (cmd === 'about') {
      res = 'Adam awad the developer of the app is very happy to be a customer in our web os';
    } else if (cmd === 'help') {
      res = 'Commands: <span class="cyan">about</span>, <span class="cyan">clear</span>';
    } else if (cmd === 'clear') {
      termOutput.innerHTML = '';
      return;
    } else if (cmd !== '') {
      res = `Command not recognized: '${cmd}'. Type <span class="cyan">'about'</span> or <span class="cyan">'help'</span>.`;
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

// Pixel Studio App Logic
const pixelGrid = document.getElementById('pixel-grid');
const pixelColor = document.getElementById('pixel-color');
const eraserBtn = document.getElementById('eraser-btn');
let isEraser = false;
let isDrawing = false;

function buildPixelGrid() {
  pixelGrid.innerHTML = '';
  for (let i = 0; i < 144; i++) {
    const cell = document.createElement('div');
    cell.classList.add('pixel-cell');
    cell.addEventListener('mousedown', () => { isDrawing = true; paintCell(cell); });
    cell.addEventListener('mouseenter', () => { if (isDrawing) paintCell(cell); });
    cell.addEventListener('mouseup', () => { isDrawing = false; });
    pixelGrid.appendChild(cell);
  }
}

window.addEventListener('mouseup', () => { isDrawing = false; });

function paintCell(cell) {
  cell.style.backgroundColor = isEraser ? '#ffffff' : pixelColor.value;
}

function toggleEraser() {
  isEraser = !isEraser;
  eraserBtn.classList.toggle('active', isEraser);
  eraserBtn.textContent = isEraser ? 'Eraser: ON' : 'Eraser: OFF';
}

function clearPixelGrid() {
  document.querySelectorAll('.pixel-cell').forEach(c => c.style.backgroundColor = '#ffffff');
}

function exportPixelArt() {
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = 240;
  exportCanvas.height = 240;
  const ctx = exportCanvas.getContext('2d');

  document.querySelectorAll('.pixel-cell').forEach((cell, idx) => {
    const x = (idx % 12) * 20;
    const y = Math.floor(idx / 12) * 20;
    ctx.fillStyle = cell.style.backgroundColor || '#ffffff';
    ctx.fillRect(x, y, 20, 20);
  });

  const link = document.createElement('a');
  link.download = 'adam-pixel-art.png';
  link.href = exportCanvas.toDataURL();
  link.click();
}

buildPixelGrid();

// Background Canvas Animation
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particles = Array.from({ length: 60 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 1.5,
    vy: (Math.random() - 0.5) * 1.5
  }));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}

resizeCanvas();
animate();
window.addEventListener('resize', resizeCanvas);

// Open Terminal by default
openWindow('terminal-window');
