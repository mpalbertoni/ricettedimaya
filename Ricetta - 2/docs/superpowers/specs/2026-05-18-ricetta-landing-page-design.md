# Landing Page — Le Ricette Classiche Italiane

## Overview
Single-page HTML landing page for displaying the "Pasta aglio e olio e peperoncino" recipe by Chef Maya. Designed to evoke a homely, nonna-style Italian kitchen atmosphere.

## Layout
- Full-viewport red-and-white checkerboard background (CSS repeating-conic-gradient), mimicking a traditional Italian tablecloth
- Centered column layout for content
- Title and subtitle at top, then recipe card with SVG illustration beside it

## Components

### Header
- **Title:** "Le Ricette Classiche Italiane"
- **Subtitle:** "I sapori della nonna"

### Recipe Card
- White/cream background card with subtle shadow, resembling a recipe card
- Content sourced from the existing Markdown recipe file:
  - Recipe name
  - Chef: Maya
  - Ingredients list
  - Step-by-step preparation
- Card is centered horizontally with max-width for readability

### Illustration
- Simple SVG vector illustration of a plate of spaghetti, positioned to the **right** of the recipe card
- Drawn with clean, minimal lines (no external assets)

### Portion Selector
- +/- buttons to increase/decrease the number of servings (base: 2 persone per 300g pasta)
- Ingredient quantities update dynamically via JavaScript based on the multiplier
- All ingredients with numeric quantities (g, q.b.) scale proportionally

## Technical Stack
- **Single file:** `index.html` with inline CSS, inline SVG, and vanilla JavaScript
- **Zero external dependencies:** no frameworks, no external images
- **CSS pattern:** `repeating-conic-gradient` for checkerboard
- **Font:** system serif stack (Georgia, "Times New Roman", serif) — zero external dependencies

## Constraints
- Must be self-contained in one HTML file
- Must render correctly on modern browsers
- No build step required
