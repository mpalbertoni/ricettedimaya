# Pattern Designer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-file HTML tool that renders a grid of rectangles with alternating diamond/circle shapes, controlled via sliders and color pickers, with export to SVG/PNG/PDF.

**Architecture:** Single `index.html` with all HTML/CSS/JS. Canvas2D renders the pattern. A `render(ctx)` function handles all drawing — used by both the live canvas and export functions. Export reconstructs SVG via markup, rasterizes PNG via offscreen canvas, and embeds in PDF via jsPDF.

**Tech Stack:** Vanilla JS, Canvas2D, jsPDF (CDN), no build tools.

---

## File Structure

- `index.html` — single file with HTML layout, CSS, and all JS logic

Internal JS structure (all in `<script>` tag):
- `state` object — holds slider/color values
- `initCanvas()` — canvas sizing with devicePixelRatio
- `render(ctx)` — draws everything on any canvas context
- `draw()` — calls render on the live canvas
- `setupControls()` — wires event listeners
- `exportSVG()`, `exportPNG()`, `exportPDF()` — export handlers

---

### Task 1: HTML Structure & CSS

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write HTML skeleton with layout and styles**

```html
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pattern Designer</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 100%; height: 100%; overflow: hidden; }
  body {
    background: #000;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    display: flex;
  }
  #canvas-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  #canvas {
    background: #fff;
    display: block;
    border-radius: 4px;
  }
  #panel {
    width: 300px;
    min-width: 300px;
    height: 100vh;
    background: #111;
    padding: 24px 20px;
    overflow-y: auto;
    border-left: 1px solid #333;
  }
  #panel h2 { font-size: 14px; font-weight: 600; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px; color: #888; }
  .control-group { margin-bottom: 24px; }
  .control-group h3 { font-size: 13px; font-weight: 500; margin-bottom: 12px; color: #ccc; }
  .control-row { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
  .control-row label { font-size: 12px; color: #999; width: 60px; flex-shrink: 0; }
  .control-row input[type="range"] { flex: 1; accent-color: #fff; }
  .control-row input[type="color"] { width: 36px; height: 36px; border: none; padding: 0; cursor: pointer; background: none; }
  .control-row .value { font-size: 12px; color: #888; min-width: 36px; text-align: right; }
  .export-buttons { display: flex; gap: 8px; flex-wrap: wrap; }
  .export-buttons button {
    flex: 1; min-width: 70px; padding: 10px 0;
    background: #222; color: #fff; border: 1px solid #444;
    border-radius: 4px; cursor: pointer; font-size: 13px;
    text-transform: uppercase; letter-spacing: 0.5px;
  }
  .export-buttons button:hover { background: #333; }
</style>
</head>
<body>
<div id="canvas-wrapper">
  <canvas id="canvas"></canvas>
</div>
<div id="panel">
  <h2>Pattern Designer</h2>

  <div class="control-group">
    <h3>Rettangoli</h3>
    <div class="control-row">
      <label>Scala</label>
      <input type="range" id="rect-scale" min="0.2" max="3" step="0.01" value="1">
      <span class="value" id="rect-scale-val">1.00×</span>
    </div>
    <div class="control-row">
      <label>Colore</label>
      <input type="color" id="rect-color" value="#4A90D9">
    </div>
  </div>

  <div class="control-group">
    <h3>Cerchi</h3>
    <div class="control-row">
      <label>Scala</label>
      <input type="range" id="circle-scale" min="0.2" max="3" step="0.01" value="1">
      <span class="value" id="circle-scale-val">1.00×</span>
    </div>
    <div class="control-row">
      <label>Colore</label>
      <input type="color" id="circle-color" value="#E74C3C">
    </div>
  </div>

  <div class="control-group">
    <h3>Romhi</h3>
    <div class="control-row">
      <label>Scala</label>
      <input type="range" id="diamond-scale" min="0.2" max="3" step="0.01" value="1">
      <span class="value" id="diamond-scale-val">1.00×</span>
    </div>
    <div class="control-row">
      <label>Colore</label>
      <input type="color" id="diamond-color" value="#2ECC71">
    </div>
  </div>

  <div class="control-group">
    <h3>Esporta</h3>
    <div class="export-buttons">
      <button id="export-svg">SVG</button>
      <button id="export-png">PNG</button>
      <button id="export-pdf">PDF</button>
    </div>
  </div>
</div>

<script>
// JS in subsequent tasks
</script>
</body>
</html>
```

- [ ] **Step 2: Visual check**
  - Open file in browser
  - Verify: black background, white canvas area on left, dark panel (~300px) on right with control sections

---

### Task 2: Canvas Setup & Grid Math

**Files:**
- Modify: `index.html` (add JS inside `<script>` tag)

- [ ] **Step 1: Add constants, state, and canvas init**

```js
const COLS = 8;
const ROWS = 4;
const GAP = 8;
const PADDING = 40;
const LOG_W = 1200;
const LOG_H = 800;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const state = {
  rectScale: 1,    rectColor: '#4A90D9',
  circleScale: 1,  circleColor: '#E74C3C',
  diamondScale: 1, diamondColor: '#2ECC71',
};

function initCanvas() {
  const wrapper = document.getElementById('canvas-wrapper');
  const maxW = wrapper.clientWidth - 40;
  const maxH = wrapper.clientHeight - 40;
  const scale = Math.min(maxW / LOG_W, maxH / LOG_H);
  const dpr = window.devicePixelRatio || 1;

  canvas.width = LOG_W * dpr;
  canvas.height = LOG_H * dpr;
  canvas.style.width = (LOG_W * scale) + 'px';
  canvas.style.height = (LOG_H * scale) + 'px';

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}
```

- [ ] **Step 2: Add grid cell calculation**

```js
function getCells() {
  const usableW = LOG_W - PADDING * 2;
  const usableH = LOG_H - PADDING * 2;
  const cellW = usableW / COLS;
  const cellH = usableH / ROWS;
  const cells = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      cells.push({
        col, row,
        x: PADDING + col * cellW,
        y: PADDING + row * cellH,
        w: cellW, h: cellH,
      });
    }
  }
  return { cells, cellW, cellH };
}
```

- [ ] **Step 3: Wire init + resize**

```js
initCanvas();
window.addEventListener('resize', () => { initCanvas(); draw(); });
```

- [ ] **Step 4: Visual check**
  - Open browser, canvas renders at correct size

---

### Task 3: Render Function with Grid + Rectangles

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add the core render(ctx) function**

```js
function render(ctx, w, h) {
  ctx.clearRect(0, 0, w, h);
  const { cells } = getCells();
  const cellW = cells[0].w;
  const cellH = cells[0].h;
  const baseRectW = cellW - GAP;
  const baseRectH = cellH - GAP;
  const baseDiamondW = cellW * 0.6;
  const baseDiamondH = cellW * 0.6;
  const baseCircleR = cellW * 0.3;

  // --- Rectangles ---
  ctx.fillStyle = state.rectColor;
  for (const c of cells) {
    const sw = baseRectW * state.rectScale;
    const sh = baseRectH * state.rectScale;
    const sx = c.x + (c.w - sw) / 2;
    const sy = c.y + (c.h - sh) / 2;
    ctx.fillRect(sx, sy, sw, sh);
  }

  // --- Shapes (checkerboard: sum even = diamond, odd = circle) ---
  for (const c of cells) {
    const sw = baseRectW * state.rectScale;
    const sh = baseRectH * state.rectScale;
    const rectX = c.x + (c.w - sw) / 2;
    const rectY = c.y + (c.h - sh) / 2;
    const cx = rectX + sw / 2;  // rectangle center X
    const cy = rectY;           // rectangle top Y

    if ((c.col + c.row) % 2 === 0) {
      // Diamond
      const dw = baseDiamondW * state.diamondScale;
      const dh = baseDiamondH * state.diamondScale;
      ctx.fillStyle = state.diamondColor;
      ctx.beginPath();
      ctx.moveTo(cx, cy);               // bottom vertex
      ctx.lineTo(cx - dw / 2, cy - dh / 2); // left
      ctx.lineTo(cx, cy - dh);          // top
      ctx.lineTo(cx + dw / 2, cy - dh / 2); // right
      ctx.closePath();
      ctx.fill();
    } else {
      // Circle
      const r = baseCircleR * state.circleScale;
      ctx.fillStyle = state.circleColor;
      ctx.beginPath();
      ctx.arc(cx, cy - r, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function draw() {
  render(ctx, LOG_W, LOG_H);
}
```

- [ ] **Step 2: Draw on init**

```js
draw();
```

- [ ] **Step 3: Visual check**
  - Open browser, verify 8×4 blue rectangles with alternating green diamonds (top-left cell) and red circles

---

### Task 4: Control Panel Interactivity

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add setupControls()**

```js
function setupControls() {
  const bindSlider = (id, valId, key) => {
    const slider = document.getElementById(id);
    const valEl = document.getElementById(valId);
    slider.addEventListener('input', () => {
      state[key] = parseFloat(slider.value);
      valEl.textContent = parseFloat(slider.value).toFixed(2) + '×';
      draw();
    });
  };
  const bindColor = (id, key) => {
    document.getElementById(id).addEventListener('input', (e) => {
      state[key] = e.target.value;
      draw();
    });
  };

  bindSlider('rect-scale', 'rect-scale-val', 'rectScale');
  bindSlider('circle-scale', 'circle-scale-val', 'circleScale');
  bindSlider('diamond-scale', 'diamond-scale-val', 'diamondScale');
  bindColor('rect-color', 'rectColor');
  bindColor('circle-color', 'circleColor');
  bindColor('diamond-color', 'diamondColor');
}
```

- [ ] **Step 2: Call it**

```js
setupControls();
```

- [ ] **Step 3: Visual check**
  - Every slider changes the corresponding shape size in real time
  - Every color picker changes the corresponding shape color in real time
  - Value labels update as sliders move

---

### Task 5: Export SVG

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add exportSVG()**

```js
function exportSVG() {
  const { cells } = getCells();
  const cellW = cells[0].w;
  const cellH = cells[0].h;
  const baseRectW = cellW - GAP;
  const baseRectH = cellH - GAP;
  const baseDiamondW = cellW * 0.6;
  const baseDiamondH = cellW * 0.6;
  const baseCircleR = cellW * 0.3;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${LOG_W}" height="${LOG_H}" viewBox="0 0 ${LOG_W} ${LOG_H}">
  <rect width="${LOG_W}" height="${LOG_H}" fill="white"/>`;

  for (const c of cells) {
    const sw = baseRectW * state.rectScale;
    const sh = baseRectH * state.rectScale;
    const sx = c.x + (c.w - sw) / 2;
    const sy = c.y + (c.h - sh) / 2;
    svg += `\n  <rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" fill="${state.rectColor}"/>`;

    const cx = sx + sw / 2;
    const cy = sy;

    if ((c.col + c.row) % 2 === 0) {
      const dw = baseDiamondW * state.diamondScale;
      const dh = baseDiamondH * state.diamondScale;
      svg += `\n  <polygon points="${cx},${cy} ${cx-dw/2},${cy-dh/2} ${cx},${cy-dh} ${cx+dw/2},${cy-dh/2}" fill="${state.diamondColor}"/>`;
    } else {
      const r = baseCircleR * state.circleScale;
      svg += `\n  <circle cx="${cx}" cy="${cy - r}" r="${r}" fill="${state.circleColor}"/>`;
    }
  }

  svg += '\n</svg>';
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pattern.svg';
  a.click();
  URL.revokeObjectURL(url);
}
```

- [ ] **Step 2: Wire the button**

```js
document.getElementById('export-svg').addEventListener('click', exportSVG);
```

- [ ] **Step 3: Visual check**
  - Click SVG → downloads pattern.svg
  - Open file → matches canvas rendering

---

### Task 6: Export PNG

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add exportPNG()**

```js
function exportPNG() {
  const offscreen = document.createElement('canvas');
  offscreen.width = LOG_W;
  offscreen.height = LOG_H;
  const offCtx = offscreen.getContext('2d');
  render(offCtx, LOG_W, LOG_H);
  offscreen.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pattern.png';
    a.click();
    URL.revokeObjectURL(url);
  });
}
```

- [ ] **Step 2: Wire the button**

```js
document.getElementById('export-png').addEventListener('click', exportPNG);
```

- [ ] **Step 3: Visual check**
  - Click PNG → downloads pattern.png
  - Open file → matches canvas rendering

---

### Task 7: Export PDF

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add exportPDF()**

```js
function exportPDF() {
  const offscreen = document.createElement('canvas');
  offscreen.width = LOG_W;
  offscreen.height = LOG_H;
  const offCtx = offscreen.getContext('2d');
  render(offCtx, LOG_W, LOG_H);
  const imgData = offscreen.toDataURL('image/png');
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({
    orientation: LOG_W > LOG_H ? 'landscape' : 'portrait',
    unit: 'px',
    format: [LOG_W, LOG_H],
  });
  pdf.addImage(imgData, 'PNG', 0, 0, LOG_W, LOG_H);
  pdf.save('pattern.pdf');
}
```

- [ ] **Step 2: Wire the button**

```js
document.getElementById('export-pdf').addEventListener('click', exportPDF);
```

- [ ] **Step 3: Visual check**
  - Click PDF → downloads pattern.pdf
  - Open file → matches canvas rendering

---

### Task 8: Final Polish & Edge Cases

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Ensure final file has everything wired correctly**

Verify the `<script>` block ends with calls in this order:
```js
initCanvas();
setupControls();
draw();
```

And all three export buttons are wired after their function definitions.

- [ ] **Step 2: Scale at 0 — handle edge cases**

The sliders have `min="0.2"` so scale doesn't reach 0. No extra handling needed.

- [ ] **Step 3: Final cross-check**

Open the HTML, test all controls and exports. Confirm every shape type has independent scale/color. Confirm checkerboard pattern: cell (0,0) diamond, (1,0) circle, (0,1) circle, (1,1) diamond.
