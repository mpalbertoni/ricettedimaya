import { showExportDialog } from './ExportDialog.js'

export function createToolbar(container) {
  container.innerHTML = `
    <div style="margin-left:auto">
      <button class="primary" id="export-btn">Esporta</button>
    </div>
  `
  container.querySelector('#export-btn')?.addEventListener('click', () => {
    const svgEl = document.querySelector('.canvas-container svg')
    if (svgEl) showExportDialog(svgEl)
  })
}
