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
