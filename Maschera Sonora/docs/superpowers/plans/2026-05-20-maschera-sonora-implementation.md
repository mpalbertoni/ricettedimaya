# Maschera Sonora Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a pure HTML/CSS/JS web tool that animates a sound mask SVG by transitioning between idle and active states driven by voice volume.

**Architecture:** Single-page app with inline SVG. mask.js handles splitting the SVG into idle/active element sets and cross-fades them. script.js handles audio capture (microphone + file) via Web Audio API and drives the animation loop. style.css provides dark theme layout with slider controls.

**Tech Stack:** HTML5, CSS3, Vanilla JS, Web Audio API, SVG DOM

---

### Task 1: index.html — page structure

**Files:**
- Create: `index.html`

- [ ] **Create index.html**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Maschera Sonora</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="app">
    <header>
      <h1>Maschera Sonora</h1>
      <div id="controls-bar">
        <button id="mic-btn" class="btn">🎤 Microfono</button>
        <button id="file-btn" class="btn">📂 Carica Audio</button>
        <input type="file" id="file-input" accept="audio/*" hidden>
        <span id="status">⏸ In attesa...</span>
      </div>
    </header>

    <main>
      <div id="mask-container">
        <div id="mask-stage"></div>
      </div>
    </main>

    <footer>
      <div id="sliders">
        <div class="slider-group">
          <label>🔊 Volume Sensitivity</label>
          <input type="range" id="slider-sensitivity" min="0" max="100" value="70">
          <span class="slider-value" id="val-sensitivity">70%</span>
        </div>
        <div class="slider-group">
          <label>⚡ Transition Speed</label>
          <input type="range" id="slider-speed" min="0" max="100" value="50">
          <span class="slider-value" id="val-speed">50%</span>
        </div>
        <div class="slider-group">
          <label>👁 Idle Eye Movement</label>
          <input type="range" id="slider-eye-idle" min="0" max="100" value="30">
          <span class="slider-value" id="val-eye-idle">30%</span>
        </div>
        <div class="slider-group">
          <label>🗣 Mouth Intensity</label>
          <input type="range" id="slider-mouth" min="0" max="100" value="100">
          <span class="slider-value" id="val-mouth">100%</span>
        </div>
        <div class="slider-group">
          <label>🤨 Eyebrow Intensity</label>
          <input type="range" id="slider-brow" min="0" max="100" value="80">
          <span class="slider-value" id="val-brow">80%</span>
        </div>
        <div class="slider-group">
          <label>💇 Hair Wave</label>
          <input type="range" id="slider-hair" min="0" max="100" value="60">
          <span class="slider-value" id="val-hair">60%</span>
        </div>
      </div>
    </footer>
  </div>
  <script src="mask.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Verify**: Open in browser, dark background with header, empty mask container, and sliders visible

---

### Task 2: style.css — dark theme, layout, sliders

**Files:**
- Create: `style.css`

- [ ] **Create style.css**

```css
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: system-ui, -apple-system, sans-serif;
  background: #1a1a2e;
  color: #e0e0e0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  width: 100%;
  max-width: 800px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

header h1 {
  text-align: center;
  font-size: 1.8rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: #f39200;
  margin-bottom: 1rem;
}

#controls-bar {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  background: #2d2d4a;
  color: #e0e0e0;
  border: 1px solid #444;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.btn:hover { background: #3d3d5a; border-color: #f39200; }
.btn.active { background: #f39200; color: #1a1a2e; border-color: #f39200; }

#status {
  font-size: 0.85rem;
  color: #888;
  padding: 0.3rem 0.8rem;
  background: #2d2d4a;
  border-radius: 12px;
}

#mask-container {
  background: #16213e;
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 420px;
  border: 1px solid #2d2d4a;
  position: relative;
  overflow: hidden;
}

#mask-stage {
  width: 100%;
  max-width: 500px;
  position: relative;
}

#mask-stage svg {
  width: 100%;
  height: auto;
  display: block;
}

#sliders {
  display: grid;
  gap: 0.7rem;
}

.slider-group {
  display: grid;
  grid-template-columns: 1fr 200px 50px;
  align-items: center;
  gap: 0.8rem;
}

.slider-group label {
  font-size: 0.9rem;
  text-align: right;
  color: #ccc;
}

.slider-group input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #2d2d4a;
  outline: none;
}

.slider-group input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #f39200;
  cursor: pointer;
  transition: transform 0.15s;
}

.slider-group input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.slider-value {
  font-size: 0.8rem;
  color: #f39200;
  font-variant-numeric: tabular-nums;
  text-align: center;
}
```

- [ ] **Verify**: Open index.html, confirm dark layout, centered container, styled sliders and buttons

---

### Task 3: mask.js — SVG parsing and two-group construction

**Files:**
- Create: `mask.js`

**Approach:** Parse the SVG. Separate elements into idle set (left half) and active set (right half) by element center x coordinate. Clone each set into its own `<svg>` positioned absolutely at the same location. Cross-fade opacity between the two.

- [ ] **Step 1: Create mask.js with SVG loader and element sorter**

```js
const Mask = (() => {
  const CENTER_X = 1137.74 / 2; // ~569
  let morphValue = 0;
  let idleSvg, activeSvg, stage;
  let idlePupils = [];
  let activePupils = [];

  function getElementCenter(el) {
    const t = el.tagName.toLowerCase();
    if (t === 'circle' || t === 'ellipse')
      return { x: parseFloat(el.getAttribute('cx') || 0), y: parseFloat(el.getAttribute('cy') || 0) };
    const bbox = el.getBBox();
    return { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 };
  }

  function init(svgText, containerEl) {
    stage = containerEl;

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    const srcSvg = doc.querySelector('svg');
    const viewBox = srcSvg.getAttribute('viewBox').split(' ').map(Number);

    // Build idle and active SVGs
    idleSvg = buildFaceSvg(srcSvg, viewBox, false);
    activeSvg = buildFaceSvg(srcSvg, viewBox, true);

    // Style them to overlap
    [idleSvg, activeSvg].forEach(s => {
      s.style.position = 'absolute';
      s.style.top = '0';
      s.style.left = '0';
      s.style.width = '100%';
      s.style.height = '100%';
    });

    stage.style.position = 'relative';
    stage.appendChild(idleSvg);
    stage.appendChild(activeSvg);

    // Collect pupils for idle animation
    idlePupils = collectPupils(idleSvg);
    activePupils = collectPupils(activeSvg);

    setMorph(0);
  }

  function buildFaceSvg(srcSvg, viewBox, isActive) {
    const svg = srcSvg.cloneNode(true);
    const groups = svg.querySelectorAll('g');

    groups.forEach(g => {
      const children = Array.from(g.children);
      children.forEach(el => {
        const center = getElementCenter(el);
        const belongsToActive = center.x >= CENTER_X;
        if (belongsToActive !== isActive) {
          el.remove();
        }
      });
    });

    // Center the face in viewport
    const faceCenterX = isActive ? 885.31 : 252.43;
    const offsetX = viewBox[2] / 2 - faceCenterX;
    svg.setAttribute('viewBox', `${-offsetX} 0 ${viewBox[2]} ${viewBox[3]}`);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');

    return svg;
  }

  function collectPupils(svg) {
    const pupils = [];
    svg.querySelectorAll('circle.cls-3').forEach(c => {
      pupils.push({
        el: c,
        baseCx: parseFloat(c.getAttribute('cx')),
        baseCy: parseFloat(c.getAttribute('cy')),
        r: parseFloat(c.getAttribute('r'))
      });
    });
    return pupils;
  }

  function setMorph(t) {
    morphValue = Math.max(0, Math.min(1, t));
    idleSvg.style.opacity = 1 - morphValue;
    activeSvg.style.opacity = morphValue;
  }

  function setIdleEyeDrift(driftX, driftY) {
    idlePupils.forEach(p => {
      p.el.setAttribute('cx', p.baseCx + driftX);
      p.el.setAttribute('cy', p.baseCy + driftY);
    });
  }

  return { init, setMorph, setIdleEyeDrift, updateIdle };
```

- [ ] **Step 2: Manual verification**

Open index.html with SVG content loaded. Check that both faces appear at the same position and opacity cross-fades correctly when `setMorph(0)` and `setMorph(1)` are called from console.

---

### Task 4: mask.js — idle eye drift animation

**Files:**
- Modify: `mask.js`

- [ ] **Add idle eye drift logic**

```js
// Inside Mask module, add:
let driftTime = 0;

function updateIdle(deltaTime, intensity) {
  driftTime += deltaTime;
  const driftX = Math.sin(driftTime * 0.6) * 5 * intensity;
  const driftY = Math.sin(driftTime * 0.4) * 3 * intensity;
  setIdleEyeDrift(driftX, driftY);
}
```

- [ ] **Verify**: Call `Mask.updateIdle(0.016, 1)` repeatedly, pupils drift slowly.

---

### Task 5: script.js — audio capture setup (microphone)

**Files:**
- Create: `script.js`

- [ ] **Create script.js with AudioContext and microphone capture**

```js
const App = (() => {
  let audioCtx, analyser, source, mediaStream;
  let isListening = false;
  let currentVolume = 0;

  const SMOOTHING = 0.3;

  async function startMic() {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      source = audioCtx.createMediaStreamSource(mediaStream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      isListening = true;
      document.getElementById('mic-btn').classList.add('active');
      document.getElementById('status').textContent = '🎤 In ascolto...';
    } catch (e) {
      document.getElementById('status').textContent = '❌ Errore microfono';
      console.error(e);
    }
  }

  function stopMic() {
    if (mediaStream) mediaStream.getTracks().forEach(t => t.stop());
    isListening = false;
    document.getElementById('mic-btn').classList.remove('active');
    document.getElementById('status').textContent = '⏸ In attesa...';
  }

  function toggleMic() {
    isListening ? stopMic() : startMic();
  }

  function getVolume() {
    if (!analyser) return 0;
    const data = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const v = (data[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / data.length);
    // Smooth
    currentVolume = currentVolume * SMOOTHING + rms * (1 - SMOOTHING);
    return currentVolume;
  }

  // Event binding
  document.getElementById('mic-btn').addEventListener('click', toggleMic);

  return { getVolume, isListening: () => isListening };
})();
```

- [ ] **Verify**: Click microphone button, browser asks for permission, status changes to listening.

---

### Task 6: script.js — file upload audio

**Files:**
- Modify: `script.js`

- [ ] **Add file upload handling**

```js
// Add to App:
let audioBuffer, audioSourceNode, isPlaying = false;

function handleFileUpload(file) {
  const reader = new FileReader();
  reader.onload = async (e) => {
    if (audioCtx) audioCtx.close();
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioBuffer = await audioCtx.decodeAudioData(e.target.result);
    document.getElementById('status').textContent = `📂 ${file.name}`;
    playFile();
  };
  reader.readAsArrayBuffer(file);
}

function playFile() {
  if (audioSourceNode) audioSourceNode.disconnect();
  audioSourceNode = audioCtx.createBufferSource();
  audioSourceNode.buffer = audioBuffer;
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;
  audioSourceNode.connect(analyser);
  analyser.connect(audioCtx.destination);
  audioSourceNode.start(0);
  isPlaying = true;
  isListening = false;
}

document.getElementById('file-btn').addEventListener('click', () => {
  document.getElementById('file-input').click();
});

document.getElementById('file-input').addEventListener('change', (e) => {
  if (e.target.files.length > 0) handleFileUpload(e.target.files[0]);
});
```

- [ ] **Verify**: Click file button, select an audio file, status shows filename, audio plays.

---

### Task 7: script.js — animation loop and morph control

**Files:**
- Modify: `script.js`

- [ ] **Add animation loop**

```js
// Add to App:
function startLoop() {
  let lastTime = performance.now();
  let smoothT = 0;

  function loop(time) {
    const dt = (time - lastTime) / 1000;
    lastTime = time;

    const rawVolume = getVolume();
    const sensitivity = parseFloat(document.getElementById('slider-sensitivity').value) / 100;
    const speed = parseFloat(document.getElementById('slider-speed').value) / 100;

    // Target morph based on volume
    const target = Math.min(1, rawVolume * 3 * sensitivity);
    const lerpFactor = 1 - Math.pow(0.5, dt * (1 + speed * 4));
    smoothT += (target - smoothT) * lerpFactor;

    // Apply morph
    Mask.setMorph(smoothT);

    // Idle eye drift (only when mostly idle)
    if (smoothT < 0.5) {
      const eyeIntensity = parseFloat(document.getElementById('slider-eye-idle').value) / 100;
      const idleInfluence = (0.5 - smoothT) / 0.5; // fade out as morph increases
      Mask.updateIdle(dt, eyeIntensity * idleInfluence);
    }

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

// Init
document.addEventListener('DOMContentLoaded', async () => {
  const resp = await fetch('Maschera Sonora.svg');
  const svgText = await resp.text();
  Mask.init(svgText, document.getElementById('mask-stage'));
  startLoop();
});
```

- [ ] **Verify**: SVG loads, animation loop runs, mask responds to volume (say "test" into mic and see cross-fade).

---

### Task 8: script.js — slider values display

**Files:**
- Modify: `script.js`

- [ ] **Add slider value binding**

```js
// Add to App init:
document.querySelectorAll('#sliders input[type="range"]').forEach(slider => {
  const valSpan = document.getElementById('val-' + slider.id.replace('slider-', ''));
  if (valSpan) {
    slider.addEventListener('input', () => {
      valSpan.textContent = slider.value + '%';
    });
  }
});
```

- [ ] **Verify**: Drag any slider, percentage display updates in real time.

---

### Task 9: local server, test, and launch

**Files:**
- None (commands only)

- [ ] **Create and start local HTTP server**

```bash
npx serve .
```

Or if `npx serve` is not available:

```bash
python -m http.server 8000
```

- [ ] **Open in Chrome**

```bash
start chrome http://localhost:3000
```

- [ ] **Final verification checklist**
  - SVG mask loads and displays centered
  - Microphone button starts/stops audio capture
  - File upload plays audio file
  - Speaking into mic causes mask to transition to active state (right face)
  - Silence causes mask to return to idle state (left face)
  - Idle eye drift visible when not speaking
  - All 6 sliders affect their respective parameters
  - Slider values display correctly

---

### Element pairing reference (from SVG analysis)

| Group | Idle (left) elements | Active (right) elements |
|-------|---------------------|----------------------|
| #Testa | `#testa` (cx=252) | `#testa-2` (cx=885) |
| #Ochhi | `#Occhi-5,6,7,8` (cx=141-364) | `#Occhi,Occhi-2,3,4` (cx=774-997) |
| #sopracciglia | Paths 1-2 | Paths 3-4 |
| #bocca | Last 3 elements | First 2 elements |
| #Capelli | Last 2 paths | First 2 paths |
