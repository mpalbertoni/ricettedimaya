# Exercise Gallery — Design Spec

## Overview

A modern landing page (index.html) at the root of `Sito/` that presents the 7 existing exercises as a visual grid of colored tiles with SVG icons, inspired by the design of garbett.com.au. Each tile links to the corresponding exercise folder's index.html. A "← Back" link is added to each exercise page for navigation.

## Font

- **Space Grotesk** (Google Fonts) — free alternative to Die Grotesk used on garbett.com.au
- Weights: 400 (text), 500 (medium), 700 (bold headings)

## Layout

- **Header**: Fixed black bar at top. "Esercizi" title on the left. Minimal, no navigation.
- **Grid**: 2-column grid of square tiles (1 column on mobile). Gaps between tiles match garbett's 8px section spacing.
- **Tiles**: Each tile is a solid color square with a centered SVG icon. On hover, the project name and category appear at the bottom-left of the tile (text becomes visible).
- **Background**: Light gray (#f5f5f5) — matching garbett's off-white/light background.

## Tile Color Palette

| Exercise | Hex Color | Category |
|---|---|---|
| Marionetta | `#7B68EE` (MediumSlateBlue) | AI |
| Maschera Sonora | `#FF6B9D` (Pink) | Audio |
| MEMORY LOSS | `#E74C3C` (Red) | Typography |
| Pattern Exercise | `#2ECC71` (Green) | Design |
| Ricetta - 2 | `#F39C12` (Orange) | Recipe |
| Ricetta Pasta | `#E67E22` (Terracotta) | Recipe |
| Tipografia Cinetica | `#3498DB` (Blue) | Typography |

## SVG Icons

7 custom geometric SVG icons, one per exercise:

1. **Marionetta** — Hand silhouette with dotted stroke line (hand tracking)
2. **Maschera Sonora** — Face mask with sound wave arcs
3. **MEMORY LOSS** — Letter "A" fragmenting into dots/pixels
4. **Pattern Exercise** — Rotated diamond/square geometric shape
5. **Ricetta - 2** — Small pot with handle
6. **Ricetta Pasta** — Fork with twirled pasta
7. **Tipografia Cinetica** — Letters "aA" with wavy underline

## Navigation

- Clicking a tile navigates to the exercise's `index.html` in the same tab.
- Each exercise's `index.html` gets a "← Back" link in its header area pointing back to the root `../index.html`.
- Each exercise's original file is modified minimally — only the "← Back" link is added.

## Files to Create/Modify

- **Create**: `Sito/index.html` — landing page
- **Create**: `Sito/style.css` — landing page styles
- **Modify**: Each of the 7 exercise `index.html` files — add "← Back" header link
  - Marionetta/index.html
  - Maschera Sonora/index.html
  - MEMORY LOSS/index.html
  - Pattern Exercise/index.html
  - Ricetta - 2/index.html
  - Ricetta Pasta aglio e olio e peperoncino/codebase/index.html
  - Tipografia Cinetica/index.html

## Technical Details

- **No build step** — pure HTML + CSS, works by opening index.html directly in a browser
- **No JavaScript** needed for the landing page (CSS hover effects only)
- **Google Fonts**: Space Grotesk loaded via `<link>` from Google Fonts CDN
- **SVG icons**: Inline SVG inside each tile's HTML
- **Responsive**: 1 column on mobile (<768px), 2 columns on desktop
