import { describe, it, expect } from 'vitest'
import { createStore, getState, setState, subscribe } from './state.js'

describe('state store', () => {
  it('initializes with default state', () => {
    const store = createStore()
    const s = getState(store)
    expect(s.settings.rows).toBe(8)
    expect(s.settings.cols).toBe(8)
    expect(s.settings.strokeWidth).toBe(2)
    expect(s.settings.strokeColor).toBe('#000000')
    expect(s.settings.fillColor).toBe('none')
    expect(s.settings.blend).toBe(0)
    expect(s.settings.canvasColor).toBe('#ffffff')
    expect(s.settings.rectColor).toBe('none')
    expect(s.rects).toHaveLength(64)
    expect(s.selectedId).toBeNull()
  })

  it('each rect has correct id, row, col', () => {
    const store = createStore()
    const s = getState(store)
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const rect = s.rects[r * 8 + c]
        expect(rect.id).toBe(`rect-${r}-${c}`)
        expect(rect.row).toBe(r)
        expect(rect.col).toBe(c)
        expect(rect.x).toBe(c * 120)
        expect(rect.y).toBe(r * 120)
        expect(rect.width).toBe(100)
        expect(rect.height).toBe(100)
      }
    }
  })

  it('generates diamond type for even (row+col), circle for odd', () => {
    const store = createStore()
    const s = getState(store)
    expect(s.rects[0].type).toBe('diamond')   // 0+0=0 even
    expect(s.rects[1].type).toBe('circle')    // 0+1=1 odd
    expect(s.rects[3].type).toBe('circle')    // 1+0=1 odd
    expect(s.rects[4].type).toBe('diamond')   // 1+1=2 even
  })

  it('subscribe notifies listeners on setState', () => {
    const store = createStore()
    let notified = 0
    subscribe(store, () => { notified++ })
    setState(store, { settings: { diamondStrokeWidth: 4 } })
    expect(notified).toBe(1)
  })

  it('global scale, rotation, blend, canvasColor settings', () => {
    const store = createStore()
    expect(getState(store).settings.scale).toBe(1)
    expect(getState(store).settings.rotation).toBe(0)
    expect(getState(store).settings.blend).toBe(0)
    expect(getState(store).settings.canvasColor).toBe('#ffffff')
    setState(store, { settings: { ...getState(store).settings, scale: 0.5, rotation: 45, blend: 0.5, canvasColor: '#f0f0f0' } })
    expect(getState(store).settings.scale).toBe(0.5)
    expect(getState(store).settings.rotation).toBe(45)
    expect(getState(store).settings.blend).toBe(0.5)
    expect(getState(store).settings.canvasColor).toBe('#f0f0f0')
  })
})
