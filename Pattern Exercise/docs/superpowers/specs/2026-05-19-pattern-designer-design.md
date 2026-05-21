# Pattern Designer — Design Spec

## Overview

A web-based interactive tool for designing vector patterns. Users define a grid of rectangles with variable sizes; from each rectangle, alternating diamond and circle shapes are drawn (checkerboard pattern). Shapes are inscribed within their rectangle and have per-rectangle scale control. Output is exportable as SVG and PNG.

## Data Model

```typescript
interface Rect {
  id: string
  row: number
  col: number
  x: number        // px, position on canvas
  y: number        // px, position on canvas
  width: number    // px
  height: number   // px
  scale: number    // 0.1 – 1.0
}

interface PatternSettings {
  rows: number
  cols: number
  diamondStrokeWidth: number   // px, global for all diamonds
  circleStrokeWidth: number    // px, global for all circles
  strokeColor: string          // CSS color
  fillColor: string            // CSS color
}
```

- `Rect.type` is derived: `(row + col) % 2 === 0 ? 'diamond' : 'circle'`
- `rows` and `cols` are user-adjustable; adding rows/cols inserts default rectangles
- Default rectangle size: 100×100 px, scale: 1.0

## Geometry

For a rectangle at `(x, y, w, h)` with scale `s`:

**Diamond** (alternating, `(row+col)%2 === 0`):
- Vertices at the midpoints of each side, scaled from center:
  - Top: `(x + w/2, y + (1-s) * h/2)`
  - Right: `(x + w - (1-s) * w/2, y + h/2)`
  - Bottom: `(x + w/2, y + h - (1-s) * h/2)`
  - Left: `(x + (1-s) * w/2, y + h/2)`
- At `s=1.0`, fills the rectangle completely (vertices at exact midpoints)
- At `s=0.5`, diamond is 50% of the rectangle, centered

**Circle** (alternating, `(row+col)%2 === 1`):
- Center: `(x + w/2, y + h/2)`
- Radius: `min(w, h) / 2 * s`
- At `s=1.0`, circle touches all four sides (inscribed)
- At `s=0.5`, radius is 50%

Both shapes' strokes remain within the rectangle bounds.

## Architecture

**Approach: SVG-first rendering + Canvas for PNG export**

### Component Tree

```
App
├── Toolbar          (rows, cols, stroke width/color, fill, export button)
├── Canvas           (SVG container, renders the grid)
│   └── RectGroup[]  (single rectangle + its diamond/circle shape)
├── PropertyPanel    (edit selected rectangle's x, y, w, h, scale)
└── ExportDialog     (choose SVG or PNG, trigger download)
```

### Component Responsibilities

**Toolbar**
- Row/col increment/decrement buttons
- Diamond stroke width (number input)
- Circle stroke width (number input)
- Stroke color picker
- Fill color picker
- Export button → opens ExportDialog

**Canvas** (`<svg>` element)
- Renders all rectangles as `<rect>` elements
- Renders diamonds as `<polygon>` elements
- Renders circles as `<circle>` elements
- Handles click-to-select (highlight selected rect with blue border)
- Handles drag-to-resize (corner/edge handles on selected rect)
- SVG viewBox scales with canvas content

**RectGroup** (per rectangle)
- `<rect>` with fill "none" and thin gray stroke
- `<polygon>` or `<circle>` based on `type`
- Selected state: blue outline on the rect
- Resize handles (drag corners/edges)

**PropertyPanel**
- Visible when a rectangle is selected
- Number inputs: x, y, width, height, scale
- Changes update the Rect in state in real time

**ExportDialog**
- Modal overlay
- "Export as SVG" — serializes the SVG DOM element to string, triggers download as `.svg`
- "Export as PNG" — renders SVG to `<canvas>` via `Image` + `canvas.toBlob()`, triggers download as `.png`
- Close button

### Data Flow

- State lives in a single top-level store (`App`), passed down as props
- Rect array is the primary data structure
- Toolbar updates → `PatternSettings` updated
- PropertyPanel edits → specific `Rect` updated
- Canvas drag → specific `Rect` geometry updated
- Export → Canvas serialized or rasterized based on format

## Technology Choices

- **Rendering:** SVG (inline elements in the DOM)
- **PNG export:** Hidden `<canvas>` that rasterizes SVG via `Image` element
- **State management:** Svelte stores or React context (TBD in implementation plan)
- **No external SVG/vector library needed** — native SVG elements suffice
- **Build tool:** Vite (vanilla) or a minimal Svelte/React setup

## User Interaction

- **Grid adjustment:** Click `+`/`-` on rows and columns in toolbar
- **Selection:** Click on a rectangle → outline highlights, PropertyPanel shows values
- **Resize:** Drag corner/edge handles on selected rectangle
- **Property edit:** Type values in PropertyPanel inputs → real-time canvas update
- **Scale edit:** Slide or type scale (0.1–1.0) in PropertyPanel
- **Export:** Toolbar Export button → dialog → choose SVG or PNG → file downloads

## Export Detail

**SVG:**
1. Clone the SVG element (deep clone to avoid mutation)
2. Serialize to string via `XMLSerializer`
3. Add `xmlns` attribute if missing
4. Create `Blob` and trigger `<a download>`

**PNG:**
1. Serialize SVG to XML string (same as SVG export)
2. Create a `Blob:` URL from the SVG string
3. Load into `Image` element
4. Draw image onto `<canvas>` at desired resolution
5. Call `canvas.toBlob('image/png')` and trigger download

## Out of Scope (v1)

- Undo/redo history
- Shape rotation
- Multiple shape types per rectangle
- Gradient fills
- Export to other formats (PDF, EPS)
- Pattern tiling / repeat settings
