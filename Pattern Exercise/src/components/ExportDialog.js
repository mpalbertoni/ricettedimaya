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
