# Typographic Disintegration Tool — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page HTML tool where users type text and watch it continuously disintegrate character-by-character into particles on a canvas.

**Architecture:** Single `index.html` with inline CSS and JS. Text renders on an offscreen canvas per character; pixel data drives particle positions. `requestAnimationFrame` loop cycles between disintegration and recomposition. jsPDF handles PDF export.

**Tech Stack:** HTML5 Canvas API, vanilla JS, jsPDF (CDN).

---

### Task 1: HTML Shell + CSS Layout

**File:** Create `index.html`

- [ ] **Step 1: Write the HTML structure**

```html
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Effetto Pixel — Disintegration Tool</title>
<style>
  /* styles here */
</style>
</head>
<body>
<div id="app">
  <div class="controls-top">
    <input type="text" id="textInput" value="Effetto Pixel" autofocus>
  </div>
  <div class="canvas-wrapper">
    <canvas id="mainCanvas"></canvas>
  </div>
  <div class="controls-bottom">
    <div class="control-group">
      <label>Velocità</label>
      <input type="range" id="speedSlider" min="1" max="8" value="3" step="0.5">
      <span id="speedValue">3</span>
    </div>
    <div class="control-group">
      <label>Direzione</label>
      <div class="dir-buttons">
        <button data-dir="up">▲</button>
        <button data-dir="left">◄</button>
        <button data-dir="down" class="active">▼</button>
        <button data-dir="right">►</button>
      </div>
    </div>
    <div class="control-group">
      <button id="exportPng">⬇ PNG</button>
      <button id="exportPdf">⬇ PDF</button>
    </div>
  </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script>
  /* all JS here */
</script>
</body>
</html>
```

- [ ] **Step 2: Write CSS**

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: #1a1a2e;
  color: #eee;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#app {
  width: 800px;
  max-width: 95vw;
  background: #16213e;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}
.controls-top { margin-bottom: 16px; }
#textInput {
  width: 100%;
  padding: 12px 16px;
  font-size: 18px;
  border: 2px solid #0f3460;
  border-radius: 8px;
  background: #0f3460;
  color: #fff;
  outline: none;
  transition: border-color 0.2s;
}
#textInput:focus { border-color: #e94560; }
.canvas-wrapper {
  background: #0f3460;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}
#mainCanvas {
  display: block;
  width: 100%;
  height: auto;
  background: #0f3460;
}
.controls-bottom {
  display: flex;
  gap: 24px;
  align-items: flex-end;
  flex-wrap: wrap;
}
.control-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 140px;
}
.control-group label { font-size: 13px; color: #aaa; text-transform: uppercase; letter-spacing: 1px; }
input[type="range"] {
  width: 100%;
  accent-color: #e94560;
}
#speedValue { font-size: 14px; color: #e94560; font-weight: bold; }
.dir-buttons { display: flex; gap: 4px; }
.dir-buttons button {
  width: 40px; height: 40px;
  border: 2px solid #0f3460;
  border-radius: 8px;
  background: #0f3460;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.15s;
}
.dir-buttons button:hover { background: #1a1a4e; }
.dir-buttons button.active { border-color: #e94560; background: #1a1a3e; }
button#exportPng, button#exportPdf {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: #e94560;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.15s;
}
button#exportPng:hover, button#exportPdf:hover { background: #c73650; }
```

- [ ] **Step 3: Run the file**

Open `index.html` in a browser. Expected: dark-themed UI with text input, canvas area, speed slider, direction buttons, and download buttons. The page should render without JS errors (console clean).

---

### Task 2: Canvas Sizing + Text Rendering

- [ ] **Step 1: Add canvas setup JS**

```js
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const textInput = document.getElementById('textInput');
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const dirButtons = document.querySelectorAll('.dir-buttons button');
const exportPng = document.getElementById('exportPng');
const exportPdf = document.getElementById('exportPdf');

let currentText = '';
let particles = [];
let animTime = 0;
let cycleDuration = 3;
let direction = { x: 0, y: 1 };

function resizeCanvas() {
  const wrapper = canvas.parentElement;
  const rect = wrapper.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = 300 * dpr;
  canvas.style.height = '300px';
  ctx.scale(dpr, dpr);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
```

- [ ] **Step 2: Add text measurement utility**

```js
function measureTextDimensions(text, fontSize) {
  const offscreen = document.createElement('canvas');
  const offCtx = offscreen.getContext('2d');
  offCtx.font = `bold ${fontSize}px 'Segoe UI', system-ui, sans-serif`;
  const metrics = offCtx.measureText(text);
  return {
    width: metrics.width,
    height: fontSize * 1.2,
    actualHeight: fontSize,
    metrics
  };
}
```

- [ ] **Step 3: Verify canvas sizing**

Open in browser. Expected: canvas is 300px tall, fills width of wrapper. Resize window recalculates. No console errors.

---

### Task 3: Per-Character Pixel Extraction

- [ ] **Step 1: Implement pixel extraction**

```js
function extractPixelsFromChar(char, fontSize) {
  const offscreen = document.createElement('canvas');
  const offCtx = offscreen.getContext('2d');
  offCtx.font = `bold ${fontSize}px 'Segoe UI', system-ui, sans-serif`;
  const metrics = offCtx.measureText(char);
  const w = Math.ceil(metrics.width);
  const h = Math.ceil(fontSize * 1.2);
  offscreen.width = w || 1;
  offscreen.height = h || 1;
  offCtx.font = `bold ${fontSize}px 'Segoe UI', system-ui, sans-serif`;
  offCtx.fillStyle = '#fff';
  offCtx.textBaseline = 'alphabetic';
  offCtx.fillText(char, 0, fontSize * 0.85);
  const imageData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
  const pts = [];
  const step = 2;
  for (let y = 0; y < offscreen.height; y += step) {
    for (let x = 0; x < offscreen.width; x += step) {
      const idx = (y * offscreen.width + x) * 4;
      if (imageData.data[idx + 3] > 128) {
        pts.push({ x, y });
      }
    }
  }
  return pts;
}
```

- [ ] **Step 2: Implement full-text particle generation**

```js
function generateParticles(text) {
  const fontSize = 80;
  const dpr = window.devicePixelRatio || 1;
  const logicalW = canvas.width / dpr;
  const logicalH = canvas.height / dpr;
  const chars = text.split('');
  const totalWidth = chars.reduce((sum, ch) => {
    const c = document.createElement('canvas');
    const cx = c.getContext('2d');
    cx.font = `bold ${fontSize}px 'Segoe UI', system-ui, sans-serif';
    return sum + cx.measureText(ch).width;
  }, 0);
  const startX = (logicalW - totalWidth) / 2;
  const baseY = logicalH / 2 + fontSize * 0.4;
  const allParticles = [];
  let cursorX = startX;
  chars.forEach((ch, idx) => {
    const c = document.createElement('canvas');
    const cx = c.getContext('2d');
    cx.font = `bold ${fontSize}px 'Segoe UI', system-ui, sans-serif';
    const w = cx.measureText(ch).width;
    const pts = extractPixelsFromChar(ch, fontSize);
    pts.forEach(p => {
      allParticles.push({
        originX: cursorX + p.x,
        originY: baseY - (fontSize * 0.85) + p.y,
        x: cursorX + p.x,
        y: baseY - (fontSize * 0.85) + p.y,
        charIdx: idx,
        offset: idx * 0.06,
        maxDist: 40 + Math.random() * 30,
      });
    });
    cursorX += w;
  });
  return allParticles;
}
```

- [ ] **Step 3: Connect text input**

```js
textInput.addEventListener('input', () => {
  const text = textInput.value || ' ';
  particles = generateParticles(text);
  animTime = 0;
});
```

- [ ] **Step 4: Test in browser**

Type text in input. Expected: particles array is populated based on the typed text. No console errors. Log `particles.length` to verify.

---

### Task 4: Animation Loop

- [ ] **Step 1: Add easing function and direction mapping**

```js
function easeInOutSine(t) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function getDirectionVector(dir) {
  switch (dir) {
    case 'up': return { x: 0, y: -1 };
    case 'down': return { x: 0, y: 1 };
    case 'left': return { x: -1, y: 0 };
    case 'right': return { x: 1, y: 0 };
    default: return { x: 0, y: 1 };
  }
}
```

- [ ] **Step 2: Add draw function**

```js
function draw(progress) {
  const dpr = window.devicePixelRatio || 1;
  ctx.save();
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
  ctx.fillStyle = '#ffffff';
  particles.forEach(p => {
    const eased = easeInOutSine(progress);
    let dx, dy;
    if (progress <= 0.5) {
      const t = progress * 2;
      const et = easeInOutSine(t);
      dx = direction.x * p.maxDist * et;
      dy = direction.y * p.maxDist * et;
    } else {
      const t = (progress - 0.5) * 2;
      const et = easeInOutSine(t);
      dx = direction.x * p.maxDist * (1 - et);
      dy = direction.y * p.maxDist * (1 - et);
    }
    const sx = p.originX + dx;
    const sy = p.originY + dy;
    ctx.fillRect(sx, sy, 2, 2);
  });
  ctx.restore();
}
```

- [ ] **Step 3: Add animation loop**

```js
let lastTime = 0;

function animate(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const delta = (timestamp - lastTime) / 1000;
  lastTime = timestamp;
  animTime += delta;
  const progress = (animTime % cycleDuration) / cycleDuration;
  draw(progress);
  requestAnimationFrame(animate);
}
```

- [ ] **Step 4: Wire everything and start**

```js
particles = generateParticles(textInput.value || 'Effetto Pixel');
requestAnimationFrame(animate);
```

- [ ] **Step 5: Test in browser**

Open page. Expected: text appears centered on canvas, particles animate outward (downward by default) and back in a continuous loop. Smooth easing.

---

### Task 5: Controls Integration

- [ ] **Step 1: Wire speed slider**

```js
speedSlider.addEventListener('input', () => {
  cycleDuration = parseFloat(speedSlider.value);
  speedValue.textContent = cycleDuration;
});
```

- [ ] **Step 2: Wire direction buttons**

```js
dirButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    dirButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const dir = btn.dataset.dir;
    direction = getDirectionVector(dir);
  });
});
```

- [ ] **Step 3: Test controls**

Change speed slider — expected: animation cycle speeds up/slows down. Click direction buttons — expected: particles fly in selected direction. The text should begin from baseline (bottom of characters) for all directions.

---

### Task 6: PNG Export

- [ ] **Step 1: Implement PNG download**

```js
exportPng.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = `disintegration-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
});
```

- [ ] **Step 2: Test**

Click PNG button. Expected: browser downloads a PNG file showing the current frame of the canvas animation.

---

### Task 7: PDF Export

- [ ] **Step 1: Implement PDF download**

```js
exportPdf.addEventListener('click', () => {
  const imgData = canvas.toDataURL('image/png');
  const { jsPDF } = window.jspdf;
  const dpr = window.devicePixelRatio || 1;
  const pdfW = canvas.width / dpr;
  const pdfH = canvas.height / dpr;
  const doc = new jsPDF({
    orientation: pdfW > pdfH ? 'landscape' : 'portrait',
    unit: 'px',
    format: [pdfW, pdfH]
  });
  doc.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);
  doc.save(`disintegration-${Date.now()}.pdf`);
});
```

- [ ] **Step 2: Test**

Click PDF button. Expected: browser downloads a PDF file with the current canvas frame rendered inside.

---

### Task 8: Edge Cases + Polish

- [ ] **Step 1: Handle empty text**

```js
// In the input listener and initial call:
const text = textInput.value || ' ';
```

- [ ] **Step 2: Handle resize**

```js
window.addEventListener('resize', () => {
  resizeCanvas();
  particles = generateParticles(textInput.value || ' ');
});
```

- [ ] **Step 3: Test edge cases**

Try empty input, very long text, rapid text changes, rapid slider changes, rapid direction changes, exporting while empty canvas. Expected: no crashes, no console errors, graceful behavior.

---

### Self-Review Checklist

1. **Spec coverage:** Every spec requirement (text input, canvas-only rendering, per-character particles, speed slider, 4-direction buttons, continuous loop, PNG/PDF export) has a corresponding task. ✓
2. **Placeholder scan:** All steps contain actual code, not TODOs. ✓
3. **Type consistency:** `getDirectionVector` returns `{x,y}`, `direction` is set from it, `draw` uses `direction.x/direction.y` — consistent through tasks 4-5. `easeInOutSine` defined once, used in `draw`. ✓
4. **Scope check:** Single HTML file, no extraneous features. YAGNI applied. ✓
