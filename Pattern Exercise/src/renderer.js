import { calcDiamondPoints, calcCircleRadius, calcCircleCenter } from './geometry.js'

function rectToSvg(rect, settings, isSelected) {
  const { id, x, y, width, height, type } = rect
  const { strokeColor, fillColor, strokeWidth, scale, rotation, blend } = settings
  const cls = isSelected ? ' class="selected"' : ''
  const cx = x + width / 2
  const cy = y + height / 2
  const rotAttr = rotation ? ` transform="rotate(${rotation}, ${cx}, ${cy})"` : ''
  const rectFill = settings.rectColor || 'none'
  const rectStroke = strokeColor

  const diamondPts = calcDiamondPoints(x, y, width, height, scale)
  const diamondPoints = diamondPts.map(p => `${p.x},${p.y}`).join(' ')
  const r = calcCircleRadius(width, height, scale)

  let shapeSvg = ''
  if (blend <= 0 || type === 'diamond' && blend < 1) {
    shapeSvg = `  <polygon points="${diamondPoints}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"${rotAttr}${cls} />`
  }
  if (blend >= 1 || type === 'circle' && blend > 0) {
    shapeSvg = `  <circle cx="${cx}" cy="${cy}" r="${r > 0 ? r : 0}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"${rotAttr}${cls} />`
  }
  if (blend > 0 && blend < 1) {
    const diaOpacity = type === 'diamond' ? 1 - blend : blend
    const circOpacity = type === 'circle' ? blend : 1 - blend
    shapeSvg = `  <polygon points="${diamondPoints}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" opacity="${diaOpacity}"${rotAttr}${cls} />
  <circle cx="${cx}" cy="${cy}" r="${r > 0 ? r : 0}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" opacity="${circOpacity}"${rotAttr}${cls} />`
  }

  const rectBorder = `  <rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${rectFill}" stroke="${rectStroke}" stroke-width="1" />`

  return `  <g data-rect-id="${id}">
${rectBorder}
${shapeSvg}
  </g>`
}

export function renderSvg(rects, settings, selectedId) {
  const minX = Math.min(...rects.map(r => r.x))
  const minY = Math.min(...rects.map(r => r.y))
  const maxX = Math.max(...rects.map(r => r.x + r.width))
  const maxY = Math.max(...rects.map(r => r.y + r.height))
  const bg = settings.canvasColor || '#ffffff'

  const parts = rects.map(r => rectToSvg(r, settings, r.id === selectedId))

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX - 10} ${minY - 10} ${maxX - minX + 20} ${maxY - minY + 20}" style="background:${bg}">
${parts.join('\n')}
</svg>`
}
