import './style.css'
import { createStore } from './state.js'
import { createToolbar } from './components/Toolbar.js'
import { createCanvas } from './components/Canvas.js'
import { createSidePanel } from './components/PropertyPanel.js'

const app = document.getElementById('app')
const store = createStore()

app.innerHTML = `
  <div class="toolbar" id="toolbar"></div>
  <div class="main-area">
    <div id="canvas-slot"></div>
    <div class="side-panel" id="property-panel"></div>
  </div>
`

createToolbar(document.getElementById('toolbar'), store)
createCanvas(document.getElementById('canvas-slot'), store)
createSidePanel(document.getElementById('property-panel'), store)
