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
        type: (r + c) % 2 === 0 ? 'diamond' : 'circle'
      })
    }
  }
  return rects
}

function defaultSettings() {
  return {
    rows: 8,
    cols: 8,
    strokeWidth: 2,
    strokeColor: '#000000',
    fillColor: 'none',
    scale: 1,
    rotation: 0,
    blend: 0,
    canvasColor: '#ffffff',
    rectColor: 'none'
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
