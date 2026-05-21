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
