# Typographic Disintegration Tool — Design Spec

## Overview

A single-page web tool that lets users type text and watch it disintegrate character by character in a continuous particle animation. Built with pure HTML, CSS, and JavaScript using Canvas API. Exports to PNG and PDF.

## UI Layout

```
┌────────────────────────────────────────────┐
│  ✏️ [Testo da animare...]                  │
│                                            │
│  ┌────────────────────────────────────────┐│
│  │             CANVAS                     ││
│  │    (animazione disintegrazione)        ││
│  └────────────────────────────────────────┘│
│                                            │
│  Velocità:  ────●─────────────            │
│  Direzione:  [▼] [▲] [◄] [►]             │
│                                            │
│  [⬇ PNG]    [⬇ PDF]                      │
└────────────────────────────────────────────┘
```

- **Text input**: single-line text input at the top
- **Canvas**: central area, fills available width, auto-scales height based on text
- **Speed slider**: continuous range (min → max)
- **Direction**: 4 discrete buttons — giù, su, sinistra, destra
- **Download buttons**: PNG and PDF

## Architecture

### File structure

Single `index.html` containing:
- Inline CSS in `<head>`
- HTML structure
- Inline JavaScript at end of `<body>`
- jsPDF loaded from CDN

### Core Animation System (Canvas-only)

Four-phase continuous loop:

1. **RENDER** — Draw current text on an offscreen canvas to get exact pixel positions per character
2. **SCAN** — For each character, read pixel data from its bounding box. Create a particle for each dark pixel (threshold > 128)
3. **DISINTEGRATE** — Animate particles away from their origin along the chosen direction vector
4. **RESTORE** — Animate particles back to origin, then loop

### Character Isolation

Each character is rendered individually on a small offscreen canvas. The bounding box is determined by `measureText()` and character index. Particles are generated per-character with a stagger delay (30-50ms offset between consecutive characters).

### Particle Model

Each particle is a `{x, y, originX, originY}` object rendered as a small filled rectangle (2×2 px). The `originX/originY` stores where it started (the text pixel position). `x/y` is the current animated position.

Animation uses a normalized time value `t ∈ [0, 1]` where:
- `t = 0` → particles at origin (intact text)
- `t = 0.5` → particles at max displacement (fully disintegrated)
- `t = 1` → particles back at origin (recomposed text)

Easing: smooth `ease-in-out` sine for natural motion.

### Direction Mapping

- **Giù**: `(0, +1)` — particles fall downward from baseline
- **Su**: `(0, -1)` — particles rise upward
- **Sinistra**: `(-1, 0)` — particles scatter left
- **Destra**: `(+1, 0)` — particles scatter right

The displacement for each particle: `finalPos = origin + direction * intensity * randomFactor`

### Speed Control

The speed slider controls the total cycle duration. Range: ~1 second (fast) to ~8 seconds (slow). This is mapped to the `t` progression rate.

### Loop Behavior

- Animation starts automatically on page load / text change
- Runs continuously: disintegrate → restore → disintegrate...
- Each frame uses `requestAnimationFrame`
- When text changes, the particle system resets immediately

## Export

### PNG
`canvas.toDataURL('image/png')` from the main canvas (the frame at the moment of click).

### PDF
Capture canvas as image URL, create a jsPDF document, add image in correct aspect ratio, trigger download.

Both export only the canvas area (the animation), not the full UI.

## Dependencies

- jsPDF (CDN) — only external dependency
- No build tools, no frameworks, no bundlers

## Out of Scope

- No custom font upload
- No multi-line text support
- No particle size customization
- No background color options
- No video export (GIF/MP4)
