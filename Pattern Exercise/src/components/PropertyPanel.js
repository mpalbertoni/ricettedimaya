import { getState, setState, subscribe } from '../state.js'

export function createSidePanel(container, store) {
  function render(state) {
    const { strokeWidth, scale, rotation, strokeColor, fillColor, blend, canvasColor, rectColor } = state.settings
    container.innerHTML = `
      <div class="field">
        <label>Tratto: ${strokeWidth}</label>
        <input type="range" data-prop="strokeWidth" value="${strokeWidth}" min="0" max="20" step="0.5" />
      </div>
      <div class="field">
        <label>Scala: ${scale}</label>
        <input type="range" data-prop="scale" value="${scale}" min="0.1" max="1" step="0.05" />
      </div>
      <div class="field">
        <label>Rotazione: ${rotation}°</label>
        <input type="range" data-prop="rotation" value="${rotation}" min="0" max="360" step="1" />
      </div>
      <div class="field">
        <label>Fusione: ${blend}</label>
        <input type="range" data-prop="blend" value="${blend}" min="0" max="1" step="0.05" />
      </div>
      <div class="field">
        <label>Colore tratto</label>
        <input type="color" data-prop="strokeColor" value="${strokeColor}" />
      </div>
      <div class="field">
        <label>Fill</label>
        <input type="color" data-prop="fillColor" value="${fillColor !== 'none' ? fillColor : '#ffffff'}" />
      </div>
      <div class="field">
        <label>Rettangoli</label>
        <input type="color" data-prop="rectColor" value="${rectColor !== 'none' ? rectColor : '#ffffff'}" />
      </div>
      <div class="field">
        <label>Sfondo canvas</label>
        <input type="color" data-prop="canvasColor" value="${canvasColor}" />
      </div>
    `
    attachEvents(container, store)
  }

  render(getState(store))
  return subscribe(store, render)
}

function attachEvents(container, store) {
  container.querySelectorAll('input[type="range"]').forEach(el => {
    el.addEventListener('input', () => {
      const prop = el.dataset.prop
      const val = parseFloat(el.value)
      setState(store, { settings: { ...getState(store).settings, [prop]: val } })
    })
  })

  container.querySelectorAll('input[type="color"]').forEach(el => {
    el.addEventListener('input', () => {
      const prop = el.dataset.prop
      const val = el.value
      const fill = (prop === 'fillColor' || prop === 'rectColor') && val === '#ffffff' ? 'none' : val
      setState(store, { settings: { ...getState(store).settings, [prop]: fill } })
    })
  })
}
