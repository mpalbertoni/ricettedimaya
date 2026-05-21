# Exercise Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a garbett.com.au-inspired landing page grid for 7 existing exercise folders, with back-navigation added to each exercise.

**Architecture:** Static HTML+CSS landing page at root `index.html`. Inline SVG icons in colored square tiles. Each exercise's `index.html` gets a minimal "← Back" link. No build step, no JS needed on the landing page.

**Tech Stack:** HTML, CSS, Google Fonts (Space Grotesk), inline SVG

---

### Task 1: Create the landing page (index.html + style.css)

**Files:**
- Create: `Sito/index.html`
- Create: `Sito/style.css`

- [ ] **Step 1: Create the CSS file**

Write `Sito/style.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Space Grotesk', Helvetica, sans-serif;
  background: #f5f5f5;
  color: #fff;
  min-height: 100vh;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 62px;
  background: #000;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 24px;
  z-index: 10;
}

.header h1 {
  font-size: 1.4em;
  font-weight: 500;
  letter-spacing: -0.02em;
}

main {
  padding-top: 70px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 8px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.tile {
  position: relative;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  overflow: hidden;
}

.tile svg {
  width: 30%;
  height: 30%;
  max-width: 120px;
  max-height: 120px;
}

.tile-info {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
}

.tile:hover .tile-info {
  opacity: 1;
}

.tile-title {
  font-size: 1.125em;
  font-weight: 500;
  line-height: 1.1;
}

.tile-category {
  font-size: 0.875em;
  opacity: 0.8;
  margin-top: 2px;
}

@media (max-width: 767px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .tile-info {
    opacity: 1;
  }

  .header {
    height: 50px;
    padding: 0 16px;
  }

  .header h1 {
    font-size: 1.1em;
  }

  main {
    padding-top: 58px;
  }
}
```

- [ ] **Step 2: Create the HTML file**

Write `Sito/index.html`:

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Esercizi</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="header">
    <h1>Esercizi</h1>
  </header>
  <main>
    <div class="grid">

      <!-- Marionetta -->
      <a class="tile" href="Marionetta/index.html" style="background:#7B68EE;">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 90 C25 75 10 60 10 40 C10 20 25 10 40 10 C50 10 55 18 55 18 L60 10 C65 5 75 8 78 15 L85 30 C90 40 85 50 78 50 L68 48 L70 58 C72 65 68 72 62 75 L55 80 Z" fill="currentColor" opacity="0.85"/>
          <path d="M15 40 Q10 42 8 38" stroke="currentColor" stroke-width="2" fill="none" opacity="0.6"/>
          <path d="M10 35 Q8 38 5 35" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4" stroke-dasharray="2 2"/>
          <circle cx="40" cy="25" r="6" fill="currentColor"/>
          <line x1="30" y1="22" x2="50" y2="22" stroke="currentColor" stroke-width="1.5"/>
          <line x1="40" y1="19" x2="40" y2="31" stroke="currentColor" stroke-width="1.5"/>
        </svg>
        <div class="tile-info">
          <div class="tile-title">Marionetta</div>
          <div class="tile-category">AI</div>
        </div>
      </a>

      <!-- Maschera Sonora -->
      <a class="tile" href="Maschera%20Sonora/index.html" style="background:#FF6B9D;">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="55" rx="35" ry="30" fill="currentColor" opacity="0.85"/>
          <circle cx="36" cy="48" r="6" fill="#FF6B9D"/>
          <circle cx="64" cy="48" r="6" fill="#FF6B9D"/>
          <path d="M42 65 Q50 72 58 65" stroke="#FF6B9D" stroke-width="2" fill="none"/>
          <path d="M12 35 Q18 25 28 30" stroke="currentColor" stroke-width="2" fill="none" opacity="0.5"/>
          <path d="M72 30 Q82 25 88 35" stroke="currentColor" stroke-width="2" fill="none" opacity="0.5"/>
          <path d="M8 40 Q14 30 22 36" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3"/>
          <path d="M78 36 Q86 30 92 40" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3"/>
        </svg>
        <div class="tile-info">
          <div class="tile-title">Maschera Sonora</div>
          <div class="tile-category">Audio</div>
        </div>
      </a>

      <!-- MEMORY LOSS -->
      <a class="tile" href="MEMORY%20LOSS/index.html" style="background:#E74C3C;">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <text x="50" y="55" font-family="sans-serif" font-size="72" font-weight="bold" text-anchor="middle" fill="currentColor" opacity="0.9">A</text>
          <circle cx="20" cy="80" r="2.5" fill="currentColor" opacity="0.6"/>
          <circle cx="80" cy="15" r="2" fill="currentColor" opacity="0.5"/>
          <circle cx="75" cy="85" r="3" fill="currentColor" opacity="0.4"/>
          <circle cx="30" cy="10" r="2" fill="currentColor" opacity="0.5"/>
          <circle cx="88" cy="50" r="2.5" fill="currentColor" opacity="0.4"/>
          <circle cx="12" cy="45" r="2" fill="currentColor" opacity="0.5"/>
          <circle cx="50" cy="90" r="2" fill="currentColor" opacity="0.3"/>
          <circle cx="65" cy="8" r="1.5" fill="currentColor" opacity="0.4"/>
        </svg>
        <div class="tile-info">
          <div class="tile-title">MEMORY LOSS</div>
          <div class="tile-category">Typography</div>
        </div>
      </a>

      <!-- Pattern Exercise -->
      <a class="tile" href="Pattern%20Exercise/index.html" style="background:#2ECC71;">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,5 85,30 85,70 50,95 15,70 15,30" fill="currentColor" opacity="0.85"/>
          <polygon points="50,20 70,35 70,65 50,80 30,65 30,35" fill="#2ECC71" opacity="0.5"/>
          <circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.6"/>
        </svg>
        <div class="tile-info">
          <div class="tile-title">Pattern Exercise</div>
          <div class="tile-category">Design</div>
        </div>
      </a>

      <!-- Ricetta - 2 -->
      <a class="tile" href="Ricetta%20-%202/index.html" style="background:#F39C12;">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="72" rx="28" ry="14" fill="currentColor" opacity="0.8"/>
          <rect x="35" y="58" width="30" height="8" rx="2" fill="currentColor" opacity="0.6"/>
          <path d="M35 62 L33 30 Q33 20 42 20 L58 20 Q67 20 67 30 L64 62" stroke="currentColor" stroke-width="3" fill="none" opacity="0.9"/>
          <path d="M42 12 Q50 8 58 12" stroke="currentColor" stroke-width="2.5" fill="none" opacity="0.7"/>
        </svg>
        <div class="tile-info">
          <div class="tile-title">Ricetta - 2</div>
          <div class="tile-category">Recipe</div>
        </div>
      </a>

      <!-- Ricetta Pasta -->
      <a class="tile" href="Ricetta%20Pasta%20aglio%20e%20olio%20e%20peperoncino/codebase/index.html" style="background:#E67E22;">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <line x1="60" y1="20" x2="60" y2="80" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.9"/>
          <line x1="68" y1="20" x2="68" y2="78" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
          <line x1="52" y1="20" x2="52" y2="78" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
          <path d="M48 18 Q60 10 72 18" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.9"/>
          <path d="M50 80 Q55 85 60 80 Q65 85 70 80" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.6"/>
        </svg>
        <div class="tile-info">
          <div class="tile-title">Ricetta Pasta</div>
          <div class="tile-category">Recipe</div>
        </div>
      </a>

      <!-- Tipografia Cinetica -->
      <a class="tile" href="Tipografia%20Cinetica/index.html" style="background:#3498DB;">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <text x="30" y="50" font-family="sans-serif" font-size="40" font-weight="bold" fill="currentColor" opacity="0.85">a</text>
          <text x="52" y="55" font-family="sans-serif" font-size="34" font-weight="bold" fill="currentColor" opacity="0.65">b</text>
          <path d="M10 70 Q30 60 50 70 Q70 80 90 70" stroke="currentColor" stroke-width="2" fill="none" opacity="0.5"/>
          <path d="M10 76 Q30 68 50 76 Q70 84 90 76" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3"/>
        </svg>
        <div class="tile-info">
          <div class="tile-title">Tipografia Cinetica</div>
          <div class="tile-category">Typography</div>
        </div>
      </a>

    </div>
  </main>
</body>
</html>
```

- [ ] **Step 3: Verify the landing page**

Open `Sito/index.html` in a browser. Expected:
- Black fixed header with "Esercizi"
- 7 colored tiles in a 2-column grid
- Each tile has an SVG icon centered
- On hover, title + category appear at bottom-left
- Tiles link to correct exercise paths

---

### Task 2: Add "← Back" to Marionetta index.html

**File:** Modify: `Marionetta/index.html`

- [ ] **Step 1: Add the back link**

After `<body>` (line 24), insert before the toolbar `<div>`:

```html
  <a href="../index.html" style="position:fixed;top:12px;left:12px;z-index:100;color:#fff;text-decoration:none;font-family:'Segoe UI',sans-serif;font-size:14px;background:rgba(0,0,0,0.5);padding:4px 10px;border-radius:4px;">← Back</a>
```

Edit: at line 24, replace `<body>` with:

```html
<body>
  <a href="../index.html" style="position:fixed;top:12px;left:12px;z-index:100;color:#fff;text-decoration:none;font-family:'Segoe UI',sans-serif;font-size:14px;background:rgba(0,0,0,0.5);padding:4px 10px;border-radius:4px;">← Back</a>
```

- [ ] **Step 2: Verify the page loads correctly**

Open `Marionetta/index.html` — should show "← Back" in top-left, clicking goes to root index.

---

### Task 3: Add "← Back" to Maschera Sonora index.html

**File:** Modify: `Maschera Sonora/index.html`

- [ ] **Step 1: Add the back link after `<body>`**

Replace `<body>` (line 9) with:

```html
<body>
  <a href="../index.html" style="position:fixed;top:12px;left:12px;z-index:100;color:#fff;text-decoration:none;font-family:'Segoe UI',sans-serif;font-size:14px;background:rgba(0,0,0,0.5);padding:4px 10px;border-radius:4px;">← Back</a>
```

- [ ] **Step 2: Verify**

---

### Task 4: Add "← Back" to MEMORY LOSS index.html

**File:** Modify: `MEMORY LOSS/index.html`

- [ ] **Step 1: Add the back link after `<body>`**

Replace `<body>` (line 118) with:

```html
<body>
  <a href="../index.html" style="position:fixed;top:12px;left:12px;z-index:100;color:#fff;text-decoration:none;font-family:'Segoe UI',sans-serif;font-size:14px;background:rgba(0,0,0,0.5);padding:4px 10px;border-radius:4px;">← Back</a>
```

- [ ] **Step 2: Verify**

---

### Task 5: Add "← Back" to Pattern Exercise index.html

**File:** Modify: `Pattern Exercise/index.html`

- [ ] **Step 1: Add the back link after `<body>`**

Replace `<body>` (line 8) with:

```html
<body>
  <a href="../index.html" style="position:fixed;top:12px;left:12px;z-index:100;color:#000;text-decoration:none;font-family:'Segoe UI',sans-serif;font-size:14px;background:rgba(255,255,255,0.7);padding:4px 10px;border-radius:4px;">← Back</a>
```

- [ ] **Step 2: Verify**

---

### Task 6: Add "← Back" to Ricetta - 2 index.html

**File:** Modify: `Ricetta - 2/index.html`

- [ ] **Step 1: Add the back link after `<body>`**

Replace `<body>` (line 268) with:

```html
<body>
  <a href="../index.html" style="position:fixed;top:12px;left:12px;z-index:100;color:#fff;text-decoration:none;font-family:Lora,serif;font-size:14px;background:rgba(0,0,0,0.5);padding:4px 10px;border-radius:4px;">← Back</a>
```

- [ ] **Step 2: Verify**

---

### Task 7: Add "← Back" to Ricetta Pasta index.html

**File:** Modify: `Ricetta Pasta aglio e olio e peperoncino/codebase/index.html`

- [ ] **Step 1: Add the back link after `<body>`**

Replace `<body>` (line 9) with:

```html
<body>
  <a href="../../index.html" style="position:fixed;top:12px;left:12px;z-index:100;color:#333;text-decoration:none;font-family:'Segoe UI',sans-serif;font-size:14px;background:rgba(255,255,255,0.8);padding:4px 10px;border-radius:4px;">← Back</a>
```

- [ ] **Step 2: Verify**

---

### Task 8: Add "← Back" to Tipografia Cinetica index.html

**File:** Modify: `Tipografia Cinetica/index.html`

- [ ] **Step 1: Add the back link after `<body>`**

Replace `<body>` (line 74) with:

```html
<body>
  <a href="../index.html" style="position:fixed;top:12px;left:12px;z-index:100;color:#fff;text-decoration:none;font-family:Nunito,sans-serif;font-size:14px;background:rgba(0,0,0,0.5);padding:4px 10px;border-radius:4px;">← Back</a>
```

- [ ] **Step 2: Verify**

---

### Task 9: Final verification

- [ ] **Step 1: Open `Sito/index.html` in a browser**

Expected:
- Grid of 7 colored tiles renders correctly
- Each tile shows its SVG icon
- Hovering shows title + category

- [ ] **Step 2: Click each tile**

Expected:
- Navigates to the exercise page
- "← Back" link visible in top-left
- Clicking "← Back" returns to root index.html

- [ ] **Step 3: Test on mobile viewport (max 767px)**

Expected:
- Grid becomes single column
- Tile info (title/category) always visible
- Header smaller
