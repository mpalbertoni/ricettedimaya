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
