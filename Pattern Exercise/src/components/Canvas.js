import { renderSvg } from '../renderer.js'
import { getState, setState, subscribe } from '../state.js'
import { renderResizeHandles, initResizeDrag } from './ResizeHandles.js'

let suppressRender = false
let renderRaf = null

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
    svgEl.setAttribute('width', '100%')
    svgEl.setAttribute('height', '100%')

    attachClickHandlers(svgEl, store)

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

  function debouncedRender() {
    if (renderRaf) cancelAnimationFrame(renderRaf)
    renderRaf = requestAnimationFrame(() => {
      renderRaf = null
      render()
    })
  }

  render()
  const unsub = subscribe(store, debouncedRender)
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
