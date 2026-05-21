# Pattern Designer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive web tool where users arrange variable-size rectangles in a grid, with diamonds and circles alternating checkerboard-style, and export the result as SVG or PNG.

**Architecture:** SVG-first rendering with all shapes as inline SVG elements. A hidden `<canvas>` rasterizes the SVG for PNG export. A simple observable store holds state; DOM updates happen via declarative `innerHTML` rendering on state changes. Pure geometry functions are unit-tested with Vitest.

**Tech Stack:** Vite (build), Vitest (tests), Vanilla JS (no framework), CSS custom properties for theming

---

### Task 1: Project scaffold

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/style.css`
- Create: `src/main.js`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "pattern-designer",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "vitest": "^3.0.0"
  }
}
```

- [ ] **Step 2: Create vite.config.js**

```js
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'node'
  }
})
```

- [ ] **Step 3: Create index.html**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pattern Designer</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

- [ ] **Step 4: Create src/style.css**

```css
:root {
  --bg: #f8f9fa;
  --surface: #fff;
  --border: #dee2e6;
  --text: #212529;
  --text-muted: #6c757d;
  --primary: #3b82f6;
  --primary-light: #dbeafe;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: var(--bg); color: var(--text); }

#app { display: grid; grid-template-rows: auto 1fr; height: 100vh; }

.toolbar {
  display: flex; gap: 16px; align-items: center; padding: 12px 16px;
  background: var(--surface); border-bottom: 1px solid var(--border);
}

.toolbar-group { display: flex; align-items: center; gap: 6px; }
.toolbar-group label { font-size: 12px; color: var(--text-muted); white-space: nowrap; }
.toolbar-group input[type="number"] {
  width: 50px; padding: 4px 6px; border: 1px solid var(--border);
  border-radius: 4px; font-size: 13px;
}
.toolbar-group input[type="color"] {
  width: 32px; height: 28px; border: 1px solid var(--border);
  border-radius: 4px; padding: 0; cursor: pointer;
}
.toolbar button {
  padding: 6px 12px; border: 1px solid var(--border); border-radius: 4px;
  background: var(--surface); cursor: pointer; font-size: 13px;
}
.toolbar button:hover { background: #f0f0f0; }
.toolbar button.primary { background: var(--primary); color: #fff; border-color: var(--primary); }

.main-area { display: grid; grid-template-columns: 1fr 280px; overflow: hidden; }

.canvas-container {
  overflow: auto; padding: 24px; background: #e9ecef;
  display: flex; align-items: flex-start; justify-content: flex-start;
}

.canvas-container svg { background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.1); }

.property-panel {
  background: var(--surface); border-left: 1px solid var(--border);
  padding: 16px; overflow-y: auto;
}

.property-panel h3 { font-size: 14px; margin-bottom: 12px; }
.property-panel .field { margin-bottom: 10px; }
.property-panel .field label {
  display: block; font-size: 11px; color: var(--text-muted); margin-bottom: 2px;
}
.property-panel .field input {
  width: 100%; padding: 4px 8px; border: 1px solid var(--border);
  border-radius: 4px; font-size: 13px;
}

.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4);
  display: flex; align-items: center; justify-content: center;
}
.modal {
  background: var(--surface); border-radius: 8px; padding: 24px;
  min-width: 300px; box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}
.modal h2 { margin-bottom: 16px; font-size: 16px; }
.modal-actions { display: flex; gap: 8px; margin-top: 16px; }
.modal-actions button { flex: 1; padding: 8px; border-radius: 4px; cursor: pointer; font-size: 13px; }

.selected { stroke: var(--primary) !important; stroke-width: 2 !important; }
```

- [ ] **Step 5: Create src/main.js (stub)**

```js
import './style.css'

const app = document.getElementById('app')
app.innerHTML = '<p>Loading...</p>'
```

- [ ] **Step 6: Install dependencies**

Run: `npm install`
Expected: vite and vitest installed, `package-lock.json` created.

---

### Task 2: State store

**Files:**
- Create: `src/state.js`
- Create: `src/state.test.js`

- [ ] **Step 1: Write state tests**

Create `src/state.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { createStore, getState, setState, subscribe } from './state.js'

describe('state store', () => {
  it('initializes with default state', () => {
    const store = createStore()
    const s = getState(store)
    expect(s.settings.rows).toBe(3)
    expect(s.settings.cols).toBe(3)
    expect(s.settings.diamondStrokeWidth).toBe(2)
    expect(s.settings.circleStrokeWidth).toBe(2)
    expect(s.settings.strokeColor).toBe('#000000')
    expect(s.settings.fillColor).toBe('none')
    expect(s.rects).toHaveLength(9)
    expect(s.selectedId).toBeNull()
  })

  it('each rect has correct id, row, col', () => {
    const store = createStore()
    const s = getState(store)
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const rect = s.rects[r * 3 + c]
        expect(rect.id).toBe(`rect-${r}-${c}`)
        expect(rect.row).toBe(r)
        expect(rect.col).toBe(c)
        expect(rect.x).toBe(c * 120)
        expect(rect.y).toBe(r * 120)
        expect(rect.width).toBe(100)
        expect(rect.height).toBe(100)
        expect(rect.scale).toBe(1)
      }
    }
  })

  it('generates diamond type for even (row+col), circle for odd', () => {
    const store = createStore()
    const s = getState(store)
    // rect-0-0: row+col=0 even → diamond
    expect(s.rects[0].type).toBe('diamond')
    // rect-0-1: row+col=1 odd → circle
    expect(s.rects[1].type).toBe('circle')
    // rect-1-0: row+col=1 odd → circle
    expect(s.rects[3].type).toBe('circle')
    // rect-1-1: row+col=2 even → diamond
    expect(s.rects[4].type).toBe('diamond')
  })

  it('subscribe notifies listeners on setState', () => {
    const store = createStore()
    let notified = 0
    subscribe(store, () => { notified++ })
    setState(store, { settings: { diamondStrokeWidth: 4 } })
    expect(notified).toBe(1)
  })

  it('selected rect scale can be updated', () => {
    const store = createStore()
    const rectId = getState(store).rects[0].id
    setState(store, { selectedId: rectId })
    setState(store, { rects: getState(store).rects.map(r =>
      r.id === rectId ? { ...r, scale: 0.5 } : r
    )})
    expect(getState(store).rects[0].scale).toBe(0.5)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run`
Expected: FAIL — `src/state.js` module not found or `createStore` not exported

- [ ] **Step 3: Create src/state.js**

```js
function generateRects(rows, cols) {
  const rects = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rects.push({
        id: `rect-${r}-${c}`,
        row: r,
        col: c,
        x: c * 120,
        y: r * 120,
        width: 100,
        height: 100,
        scale: 1,
        type: (r + c) % 2 === 0 ? 'diamond' : 'circle'
      })
    }
  }
  return rects
}

function defaultSettings() {
  return {
    rows: 3,
    cols: 3,
    diamondStrokeWidth: 2,
    circleStrokeWidth: 2,
    strokeColor: '#000000',
    fillColor: 'none'
  }
}

export function createStore(initial) {
  const settings = { ...defaultSettings(), ...initial?.settings }
  const rows = settings.rows
  const cols = settings.cols
  const state = {
    settings,
    rects: initial?.rects || generateRects(rows, cols),
    selectedId: initial?.selectedId || null
  }
  const listeners = new Set()
  return { state, listeners }
}

export function getState(store) {
  return store.state
}

export function setState(store, patch) {
  Object.assign(store.state, patch)
  for (const fn of store.listeners) {
    try { fn(store.state) } catch (e) { console.error(e) }
  }
}

export function subscribe(store, fn) {
  store.listeners.add(fn)
  return () => store.listeners.delete(fn)
}

export function generateRects, defaultSettings
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run`
Expected: PASS (all 5 tests)

---

### Task 3: Geometry module

**Files:**
- Create: `src/geometry.js`
- Create: `src/geometry.test.js`

- [ ] **Step 1: Write geometry tests**

Create `src/geometry.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { calcDiamondPoints, calcCircleRadius } from './geometry.js'

describe('geometry', () => {
  describe('calcDiamondPoints', () => {
    it('returns full rectangle diamond at scale 1', () => {
      const pts = calcDiamondPoints(0, 0, 100, 100, 1)
      expect(pts).toEqual([
        { x: 50, y: 0 },
        { x: 100, y: 50 },
        { x: 50, y: 100 },
        { x: 0, y: 50 }
      ])
    })

    it('returns centered half-size diamond at scale 0.5', () => {
      const pts = calcDiamondPoints(0, 0, 100, 100, 0.5)
      expect(pts).toEqual([
        { x: 50, y: 25 },
        { x: 75, y: 50 },
        { x: 50, y: 75 },
        { x: 25, y: 50 }
      ])
    })

    it('works with non-square rectangle', () => {
      const pts = calcDiamondPoints(10, 20, 200, 100, 1)
      expect(pts).toEqual([
        { x: 110, y: 20 },
        { x: 210, y: 70 },
        { x: 110, y: 120 },
        { x: 10, y: 70 }
      ])
    })

    it('returns single point (center) at scale 0', () => {
      const pts = calcDiamondPoints(0, 0, 100, 100, 0)
      expect(pts).toEqual([
        { x: 50, y: 50 },
        { x: 50, y: 50 },
        { x: 50, y: 50 },
        { x: 50, y: 50 }
      ])
    })
  })

  describe('calcCircleRadius', () => {
    it('returns half the smaller dimension at scale 1', () => {
      expect(calcCircleRadius(100, 100, 1)).toBe(50)
      expect(calcCircleRadius(100, 60, 1)).toBe(30)
      expect(calcCircleRadius(40, 100, 1)).toBe(20)
    })

    it('scales proportionally', () => {
      expect(calcCircleRadius(100, 100, 0.5)).toBe(25)
      expect(calcCircleRadius(100, 100, 0.25)).toBe(12.5)
    })

    it('returns 0 at scale 0', () => {
      expect(calcCircleRadius(100, 100, 0)).toBe(0)
    })
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run`
Expected: FAIL — `calcDiamondPoints` / `calcCircleRadius` not found

- [ ] **Step 3: Create src/geometry.js**

```js
export function calcDiamondPoints(x, y, w, h, scale) {
  const cx = x + w / 2
  const cy = y + h / 2
  const insetX = (1 - scale) * w / 2
  const insetY = (1 - scale) * h / 2
  return [
    { x: cx, y: y + insetY },
    { x: x + w - insetX, y: cy },
    { x: cx, y: y + h - insetY },
    { x: x + insetX, y: cy }
  ]
}

export function calcCircleRadius(w, h, scale) {
  return Math.min(w, h) / 2 * scale
}

export function calcCircleCenter(x, y, w, h) {
  return { cx: x + w / 2, cy: y + h / 2 }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run`
Expected: PASS (all tests)

---

### Task 4: SVG renderer

**Files:**
- Create: `src/renderer.js`

- [ ] **Step 1: Create src/renderer.js**

```js
import { calcDiamondPoints, calcCircleRadius, calcCircleCenter } from './geometry.js'

function rectToSvg(rect, settings, isSelected) {
  const { id, x, y, width, height, scale, type } = rect
  const { strokeColor, fillColor, diamondStrokeWidth, circleStrokeWidth } = settings
  const strokeWidth = type === 'diamond' ? diamondStrokeWidth : circleStrokeWidth
  const cls = isSelected ? ' class="selected"' : ''

  let shapeSvg = ''
  if (type === 'diamond') {
    const pts = calcDiamondPoints(x, y, width, height, scale)
    const points = pts.map(p => `${p.x},${p.y}`).join(' ')
    shapeSvg = `  <polygon points="${points}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"${cls} />`
  } else {
    const { cx, cy } = calcCircleCenter(x, y, width, height)
    const r = calcCircleRadius(width, height, scale)
    shapeSvg = `  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"${cls} />`
  }

  return `  <g data-rect-id="${id}">
${shapeSvg}
  </g>`
}

export function renderSvg(rects, settings, selectedId) {
  const minX = Math.min(...rects.map(r => r.x))
  const minY = Math.min(...rects.map(r => r.y))
  const maxX = Math.max(...rects.map(r => r.x + r.width))
  const maxY = Math.max(...rects.map(r => r.y + r.height))

  const parts = rects.map(r => rectToSvg(r, settings, r.id === selectedId))

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX - 10} ${minY - 10} ${maxX - minX + 20} ${maxY - minY + 20}">
${parts.join('\n')}
</svg>`
}
```

---

### Task 5: Canvas component (SVG container with interaction)

**Files:**
- Modify: `src/main.js`
- Create: `src/components/Canvas.js`

- [ ] **Step 1: Create src/components/Canvas.js**

```js
import { renderSvg } from '../renderer.js'
import { getState, setState, subscribe } from '../state.js'
import { renderResizeHandles, initResizeDrag } from './ResizeHandles.js'

let suppressRender = false

export function createCanvas(container, store) {
  const wrapper = document.createElement('div')
  wrapper.className = 'canvas-container'
  container.appendChild(wrapper)

  function render() {
    if (suppressRender) return
    const state = getState(store)
    const svgStr = renderSvg(state.rects, state.settings, state.selectedId)
    wrapper.innerHTML = svgStr
    const svgEl = wrapper.querySelector('svg')
    if (!svgEl) return
    attachClickHandlers(svgEl, store)
    // Render resize handles on selected rect
    const selected = state.rects.find(r => r.id === state.selectedId)
    if (selected) {
      const ns = 'http://www.w3.org/2000/svg'
      const handles = renderResizeHandles(ns, selected)
      svgEl.appendChild(handles)
    }
    initResizeDrag(svgEl, store, (isDragging) => {
      suppressRender = isDragging
      if (!isDragging) render()
    })
  }

  render()
  const unsub = subscribe(store, render)
  return { element: wrapper, destroy: unsub }
}

function attachClickHandlers(svgEl, store) {
  if (!svgEl) return
  const groups = svgEl.querySelectorAll('[data-rect-id]')
  for (const g of groups) {
    g.style.cursor = 'pointer'
    g.addEventListener('click', (e) => {
      e.stopPropagation()
      const id = g.getAttribute('data-rect-id')
      const state = getState(store)
      const rect = state.rects.find(r => r.id === id)
      if (rect) setState(store, { selectedId: rect.id })
    })
  }
}

- [ ] **Step 3: Update src/main.js to wire Canvas**

```js
import './style.css'
import { createStore } from './state.js'
import { createCanvas } from './components/Canvas.js'

const app = document.getElementById('app')
const store = createStore()

app.innerHTML = `
  <div class="toolbar" id="toolbar"></div>
  <div class="main-area">
    <div id="canvas-slot"></div>
    <div class="property-panel" id="property-panel"></div>
  </div>
`

const canvasSlot = document.getElementById('canvas-slot')
createCanvas(canvasSlot, store)
```

---

### Task 6: Toolbar component

**Files:**
- Create: `src/components/Toolbar.js`
- Modify: `src/main.js`

- [ ] **Step 1: Create src/components/Toolbar.js**

```js
import { getState, setState, subscribe } from '../state.js'

export function createToolbar(container, store) {
  function render(state) {
    const { rows, cols, diamondStrokeWidth, circleStrokeWidth, strokeColor, fillColor } = state.settings
    container.innerHTML = `
      <div class="toolbar-group">
        <label>Righe</label>
        <button data-action="dec-rows">−</button>
        <span>${rows}</span>
        <button data-action="inc-rows">+</button>
      </div>
      <div class="toolbar-group">
        <label>Colonne</label>
        <button data-action="dec-cols">−</button>
        <span>${cols}</span>
        <button data-action="inc-cols">+</button>
      </div>
      <div class="toolbar-group">
        <label>Tratto rombo</label>
        <input type="number" data-prop="diamondStrokeWidth" value="${diamondStrokeWidth}" min="0" max="20" step="0.5" />
      </div>
      <div class="toolbar-group">
        <label>Tratto cerchio</label>
        <input type="number" data-prop="circleStrokeWidth" value="${circleStrokeWidth}" min="0" max="20" step="0.5" />
      </div>
      <div class="toolbar-group">
        <label>Colore tratto</label>
        <input type="color" data-prop="strokeColor" value="${strokeColor}" />
      </div>
      <div class="toolbar-group">
        <label>Fill</label>
        <input type="color" data-prop="fillColor" value="${fillColor !== 'none' ? fillColor : '#ffffff'}" />
      </div>
      <div style="margin-left:auto">
        <button class="primary" id="export-btn">Esporta</button>
      </div>
    `
    attachEvents(container, store)
  }

  render(getState(store))
  return subscribe(store, (s) => render(s))
}

function attachEvents(container, store) {
  // Row/col buttons
  container.querySelector('[data-action="dec-rows"]')?.addEventListener('click', () => updateGrid(store, -1, 0))
  container.querySelector('[data-action="inc-rows"]')?.addEventListener('click', () => updateGrid(store, 1, 0))
  container.querySelector('[data-action="dec-cols"]')?.addEventListener('click', () => updateGrid(store, 0, -1))
  container.querySelector('[data-action="inc-cols"]')?.addEventListener('click', () => updateGrid(store, 0, 1))

  // Numeric inputs
  container.querySelectorAll('input[type="number"]').forEach(el => {
    el.addEventListener('change', () => {
      const prop = el.dataset.prop
      const val = parseFloat(el.value)
      setState(store, { settings: { ...getState(store).settings, [prop]: val } })
    })
  })

  // Color inputs
  container.querySelectorAll('input[type="color"]').forEach(el => {
    el.addEventListener('input', () => {
      const prop = el.dataset.prop
      setState(store, { settings: { ...getState(store).settings, [prop]: el.value } })
    })
  })
}

function updateGrid(store, dRows, dCols) {
  const s = getState(store)
  const newRows = Math.max(1, s.settings.rows + dRows)
  const newCols = Math.max(1, s.settings.cols + dCols)
  // Rebuild rects
  const rects = []
  for (let r = 0; r < newRows; r++) {
    for (let c = 0; c < newCols; c++) {
      const existing = s.rects.find(rect => rect.row === r && rect.col === c)
      rects.push(existing || {
        id: `rect-${r}-${c}`,
        row: r, col: c,
        x: c * 120, y: r * 120,
        width: 100, height: 100,
        scale: 1,
        type: (r + c) % 2 === 0 ? 'diamond' : 'circle'
      })
    }
  }
  setState(store, {
    settings: { ...s.settings, rows: newRows, cols: newCols },
    rects
  })
}
```

- [ ] **Step 2: Wire Toolbar in main.js**

In `src/main.js`, after creating the store, add:

```js
import { createToolbar } from './components/Toolbar.js'

const toolbarEl = document.getElementById('toolbar')
createToolbar(toolbarEl, store)
```

---

### Task 7: PropertyPanel component

**Files:**
- Create: `src/components/PropertyPanel.js`
- Modify: `src/main.js`

- [ ] **Step 1: Create src/components/PropertyPanel.js**

```js
import { getState, setState, subscribe } from '../state.js'

export function createPropertyPanel(container, store) {
  function render(state) {
    const rect = state.rects.find(r => r.id === state.selectedId)
    if (!rect) {
      container.innerHTML = `<h3>Proprietà</h3><p style="color:var(--text-muted);font-size:13px">Seleziona un rettangolo</p>`
      return
    }
    container.innerHTML = `
      <h3>Rettangolo ${rect.row},${rect.col} — ${rect.type}</h3>
      <div class="field">
        <label>X</label>
        <input type="number" data-prop="x" value="${rect.x}" />
      </div>
      <div class="field">
        <label>Y</label>
        <input type="number" data-prop="y" value="${rect.y}" />
      </div>
      <div class="field">
        <label>Larghezza</label>
        <input type="number" data-prop="width" value="${rect.width}" min="20" />
      </div>
      <div class="field">
        <label>Altezza</label>
        <input type="number" data-prop="height" value="${rect.height}" min="20" />
      </div>
      <div class="field">
        <label>Scala (0.1 – 1.0)</label>
        <input type="number" data-prop="scale" value="${rect.scale}" min="0.1" max="1" step="0.05" />
      </div>
    `
    attachEvents(container, store)
  }

  render(getState(store))
  return subscribe(store, render)
}

function attachEvents(container, store) {
  container.querySelectorAll('input').forEach(el => {
    el.addEventListener('change', () => {
      const prop = el.dataset.prop
      const val = parseFloat(el.value)
      const state = getState(store)
      const updatedRects = state.rects.map(r =>
        r.id === state.selectedId ? { ...r, [prop]: val } : r
      )
      setState(store, { rects: updatedRects })
    })
  })
}
```

- [ ] **Step 2: Wire PropertyPanel in main.js**

```js
import { createPropertyPanel } from './components/PropertyPanel.js'

const propPanelEl = document.getElementById('property-panel')
createPropertyPanel(propPanelEl, store)
```

---

### Task 8: Export module (SVG + PNG)

**Files:**
- Create: `src/export.js`

- [ ] **Step 1: Create src/export.js**

```js
export function exportSvg(svgElement) {
  const clone = svgElement.cloneNode(true)
  if (!clone.getAttribute('xmlns')) {
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  }
  const serializer = new XMLSerializer()
  const str = serializer.serializeToString(clone)
  const blob = new Blob([str], { type: 'image/svg+xml' })
  downloadBlob(blob, 'pattern.svg')
}

export function exportPng(svgElement, scale = 2) {
  const svgData = new XMLSerializer().serializeToString(svgElement)
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(svgBlob)

  const img = new Image()
  img.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth * scale
    canvas.height = img.naturalHeight * scale
    const ctx = canvas.getContext('2d')
    ctx.scale(scale, scale)
    ctx.drawImage(img, 0, 0)
    canvas.toBlob((blob) => {
      downloadBlob(blob, 'pattern.png')
      URL.revokeObjectURL(url)
    }, 'image/png')
  }
  img.src = url
}

function downloadBlob(blob, filename) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}
```

---

### Task 9: ExportDialog component

**Files:**
- Create: `src/components/ExportDialog.js`
- Modify: `src/main.js`
- Modify: `src/components/Toolbar.js`

- [ ] **Step 1: Create src/components/ExportDialog.js**

```js
import { exportSvg, exportPng } from '../export.js'

export function showExportDialog(svgElement) {
  const overlay = document.createElement('div')
  overlay.className = 'modal-overlay'
  overlay.innerHTML = `
    <div class="modal">
      <h2>Esporta pattern</h2>
      <p style="margin-bottom:12px;color:var(--text-muted);font-size:13px">Scegli il formato:</p>
      <div class="modal-actions">
        <button id="export-svg">SVG</button>
        <button id="export-png">PNG</button>
        <button id="export-cancel">Annulla</button>
      </div>
    </div>
  `

  overlay.querySelector('#export-svg').addEventListener('click', () => {
    exportSvg(svgElement)
    overlay.remove()
  })

  overlay.querySelector('#export-png').addEventListener('click', () => {
    exportPng(svgElement)
    overlay.remove()
  })

  overlay.querySelector('#export-cancel').addEventListener('click', () => {
    overlay.remove()
  })

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove()
  })

  document.body.appendChild(overlay)
}
```

- [ ] **Step 2: Wire ExportDialog to the export button**

In `Toolbar.js`, update the attachEvents to handle the export button click. The export button needs access to the SVG element. Add a reference:

```js
// In Toolbar.js — add to attachEvents:
container.querySelector('#export-btn')?.addEventListener('click', () => {
  const svgEl = document.querySelector('.canvas-container svg')
  if (svgEl) {
    const { showExportDialog } = require('../components/ExportDialog.js')
    showExportDialog(svgEl)
  }
})
```

(Since we use ES modules, replace `require` with a top-level import and use it directly:

At the top of `Toolbar.js`, add:
```js
import { showExportDialog } from '../components/ExportDialog.js'
```

And the handler becomes:
```js
container.querySelector('#export-btn')?.addEventListener('click', () => {
  const svgEl = document.querySelector('.canvas-container svg')
  if (svgEl) showExportDialog(svgEl)
})
```)

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`
Expected: Toolbar visible, canvas with 3×3 grid, clicking a rect shows properties, export button opens dialog.

---

### Task 10: Resize interaction (drag handles on selected rect)

**Files:**
- Create: `src/components/ResizeHandles.js`
- Modify: `src/components/Canvas.js`

- [ ] **Step 1: Create src/components/ResizeHandles.js**

```js
import { getState, setState } from '../state.js'

const HANDLE_SIZE = 8

export function renderResizeHandles(svgNs, rect) {
  const { x, y, width, height } = rect
  const handles = [
    { id: 'nw', x: x - HANDLE_SIZE/2, y: y - HANDLE_SIZE/2 },
    { id: 'n', x: x + width/2 - HANDLE_SIZE/2, y: y - HANDLE_SIZE/2 },
    { id: 'ne', x: x + width - HANDLE_SIZE/2, y: y - HANDLE_SIZE/2 },
    { id: 'e', x: x + width - HANDLE_SIZE/2, y: y + height/2 - HANDLE_SIZE/2 },
    { id: 'se', x: x + width - HANDLE_SIZE/2, y: y + height - HANDLE_SIZE/2 },
    { id: 's', x: x + width/2 - HANDLE_SIZE/2, y: y + height - HANDLE_SIZE/2 },
    { id: 'sw', x: x - HANDLE_SIZE/2, y: y + height - HANDLE_SIZE/2 },
    { id: 'w', x: x - HANDLE_SIZE/2, y: y + height/2 - HANDLE_SIZE/2 },
  ]

  const frag = document.createDocumentFragment()
  for (const h of handles) {
    const el = document.createElementNS(svgNs, 'rect')
    el.setAttribute('x', h.x)
    el.setAttribute('y', h.y)
    el.setAttribute('width', HANDLE_SIZE)
    el.setAttribute('height', HANDLE_SIZE)
    el.setAttribute('fill', '#fff')
    el.setAttribute('stroke', '#3b82f6')
    el.setAttribute('stroke-width', '1.5')
    el.setAttribute('data-handle', h.id)
    el.style.cursor = `${h.id}-resize`
    frag.appendChild(el)
  }
  return frag
}

export function initResizeDrag(svgEl, store, onDragStateChange) {
  let dragging = null
  let startRect = null
  let startMouse = null

  svgEl.addEventListener('mousedown', (e) => {
    const handle = e.target.closest('[data-handle]')
    if (!handle) return
    e.preventDefault()
    const state = getState(store)
    const rect = state.rects.find(r => r.id === state.selectedId)
    if (!rect) return

    dragging = handle.getAttribute('data-handle')
    startRect = { ...rect }
    startMouse = { x: e.clientX, y: e.clientY }
    if (onDragStateChange) onDragStateChange(true)
  })

  window.addEventListener('mousemove', (e) => {
    if (!dragging || !startRect || !startMouse) return
    const dx = e.clientX - startMouse.x
    const dy = e.clientY - startMouse.y
    const state = getState(store)
    let { x, y, width, height } = startRect
    const minDim = 20

    switch (dragging) {
      case 'e': width = Math.max(minDim, startRect.width + dx); break
      case 'w': width = Math.max(minDim, startRect.width - dx); x = startRect.x + startRect.width - width; break
      case 's': height = Math.max(minDim, startRect.height + dy); break
      case 'n': height = Math.max(minDim, startRect.height - dy); y = startRect.y + startRect.height - height; break
      case 'ne': width = Math.max(minDim, startRect.width + dx); height = Math.max(minDim, startRect.height - dy); y = startRect.y + startRect.height - height; break
      case 'nw': width = Math.max(minDim, startRect.width - dx); x = startRect.x + startRect.width - width; height = Math.max(minDim, startRect.height - dy); y = startRect.y + startRect.height - height; break
      case 'se': width = Math.max(minDim, startRect.width + dx); height = Math.max(minDim, startRect.height + dy); break
      case 'sw': width = Math.max(minDim, startRect.width - dx); x = startRect.x + startRect.width - width; height = Math.max(minDim, startRect.height + dy); break
    }

    const updatedRects = state.rects.map(r =>
      r.id === startRect.id ? { ...r, x, y, width, height } : r
    )
    setState(store, { rects: updatedRects })
  })

  window.addEventListener('mouseup', () => {
    if (dragging && onDragStateChange) onDragStateChange(false)
    dragging = null
    startRect = null
    startMouse = null
  })
}

---

### Task 11: Final integration & polish

**Files:**
- Modify: `src/main.js`
- Modify: `src/style.css`

- [ ] **Step 1: Finalize src/main.js — wire all components**

Full `src/main.js`:

```js
import './style.css'
import { createStore } from './state.js'
import { createToolbar } from './components/Toolbar.js'
import { createCanvas } from './components/Canvas.js'
import { createPropertyPanel } from './components/PropertyPanel.js'

const app = document.getElementById('app')
const store = createStore()

app.innerHTML = `
  <div class="toolbar" id="toolbar"></div>
  <div class="main-area">
    <div id="canvas-slot"></div>
    <div class="property-panel" id="property-panel"></div>
  </div>
`

createToolbar(document.getElementById('toolbar'), store)
createCanvas(document.getElementById('canvas-slot'), store)
createPropertyPanel(document.getElementById('property-panel'), store)
```

- [ ] **Step 2: Build for production**

Run: `npm run build`
Expected: `dist/` folder with `index.html`, JS, CSS assets

- [ ] **Step 3: Verify preview**

Run: `npm run preview`
Expected: Full app working in browser at local URL

---

### Task 12: Clean up visual companion

- [ ] **Step 1: Stop the visual companion server**

Run: `node -e "require('fs').writeFileSync('C:\\Users\\User\\Desktop\\Work-shop 18-05-2026\\PatternExercise\\.superpowers\\brainstorm\\session1\\state\\server-stopped', JSON.stringify({reason:'manual',timestamp:Date.now()})+'\n')"`
