# Ricetta Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a single-file HTML landing page for "Pasta aglio e olio e peperoncino" with checkerboard tablecloth background, SVG illustration, and interactive portion selector.

**Architecture:** Single `index.html` file containing inline CSS (checkerboard pattern, card layout), inline SVG (pasta plate illustration), and vanilla JS (portion calculator). Zero external dependencies.

**Tech Stack:** HTML5, CSS3 (repeating-conic-gradient), Vanilla JS, SVG

---

### Task 1: HTML Skeleton + Checkerboard Background

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write the full HTML skeleton with checkerboard background**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Le Ricette Classiche Italiane — Pasta aglio e olio e peperoncino</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Georgia, "Times New Roman", serif;
      background-color: #fff;
      background-image: repeating-conic-gradient(
        #cc0000 0deg 90deg,
        #ffffff 90deg 180deg
      );
      background-size: 80px 80px;
      padding: 2rem;
    }
  </style>
</head>
<body>
</body>
</html>
```

---

### Task 2: Header with Title and Subtitle

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add the header section inside `<body>`**

```html
<body>
  <div class="container">
    <header class="header">
      <h1>Le Ricette Classiche Italiane</h1>
      <p class="subtitle">I sapori della nonna</p>
    </header>
  </div>
</body>
```

- [ ] **Step 2: Add header styles**

```css
.container {
  max-width: 900px;
  width: 100%;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
}

.subtitle {
  font-size: 1.2rem;
  color: #fff;
  font-style: italic;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  margin-top: 0.5rem;
}
```

---

### Task 3: Portion Selector UI

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add portion selector HTML after header**

```html
<div class="portion-selector">
  <label>Porzioni:</label>
  <button id="decBtn" class="portion-btn">−</button>
  <span id="portionCount" class="portion-count">2</span>
  <button id="incBtn" class="portion-btn">+</button>
</div>
```

- [ ] **Step 2: Add portion selector styles**

```css
.portion-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.portion-selector label {
  font-size: 1.1rem;
  font-weight: bold;
  color: #8b0000;
}

.portion-btn {
  width: 36px;
  height: 36px;
  border: 2px solid #8b0000;
  background: #fff;
  color: #8b0000;
  font-size: 1.3rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.portion-btn:hover {
  background: #8b0000;
  color: #fff;
}

.portion-count {
  font-size: 1.4rem;
  font-weight: bold;
  color: #8b0000;
  min-width: 2rem;
  text-align: center;
}
```

---

### Task 4: Recipe Card and SVG Illustration Layout

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add recipe card + illustration wrapper**

```html
<div class="recipe-wrapper">
  <div class="recipe-card">
    <h2 class="recipe-title">Pasta aglio e olio e peperoncino</h2>
    <p class="chef">Chef: Maya</p>

    <h3>Ingredienti</h3>
    <ul class="ingredients" id="ingredientsList">
      <li><span class="amount" data-base="300" data-unit="g">300 g</span> di spaghetti</li>
      <li><span class="amount" data-base="3" data-unit="">3</span> spicchi d'aglio</li>
      <li><span class="amount" data-base="1" data-unit="">1</span> peperoncino fresco intero</li>
      <li>prezzemolo <span class="nonscalable">q.b.</span></li>
      <li>olio d'oliva <span class="nonscalable">q.b.</span></li>
      <li>acqua <span class="nonscalable">q.b.</span></li>
      <li>sale <span class="nonscalable">q.b.</span></li>
    </ul>

    <h3>Preparazione</h3>
    <ol class="preparation">
      <li>Prendere una pentola, riempirla d'acqua, accendere il fuoco e mettere la pentola sul fuoco per far bollire l'acqua.</li>
      <li>Nel frattempo, prendere 3 spicchi d'aglio, sbucciarli e tagliarli finemente. Prendere 1 peperoncino fresco intero. Prendere un po' di prezzemolo e tagliarlo.</li>
      <li>Quando l'acqua bolle, mettere gli spaghetti nella pentola e farli cuocere per 10 minuti.</li>
      <li>Intanto, prendere una padella, farla riscaldare e versare una quantità generosa di olio d'oliva. Aggiungere l'aglio tagliato e il peperoncino e farli soffriggere.</li>
      <li>Prendere uno scolapasta, scolare la pasta e versarla nella padella.</li>
      <li>Mantecare per 1 minuto con un po' di acqua di cottura.</li>
      <li>Finalizzare con un po' di prezzemolo.</li>
    </ol>
  </div>

  <div class="illustration">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <!-- Plate -->
      <ellipse cx="100" cy="120" rx="85" ry="30" fill="#f0f0f0" stroke="#ccc" stroke-width="2"/>
      <ellipse cx="100" cy="115" rx="75" ry="25" fill="#fff" stroke="#ddd" stroke-width="1"/>
      <!-- Pasta -->
      <path d="M60 110 Q70 80 85 95 Q95 105 80 115 Q70 120 60 110" fill="#f4d03f" opacity="0.9"/>
      <path d="M75 105 Q85 75 100 90 Q110 100 95 110 Q85 115 75 105" fill="#f4d03f" opacity="0.9"/>
      <path d="M90 100 Q100 70 115 85 Q125 95 110 105 Q100 110 90 100" fill="#f4d03f" opacity="0.9"/>
      <path d="M105 105 Q115 75 130 90 Q140 100 125 110 Q115 115 105 105" fill="#f4d03f" opacity="0.9"/>
      <path d="M70 115 Q80 85 95 100 Q105 110 90 120 Q80 125 70 115" fill="#e5c832" opacity="0.9"/>
      <path d="M100 110 Q110 80 125 95 Q135 105 120 115 Q110 120 100 110" fill="#e5c832" opacity="0.9"/>
      <path d="M85 120 Q95 90 110 105 Q120 115 105 125 Q95 130 85 120" fill="#f4d03f" opacity="0.9"/>
      <!-- Fork -->
      <line x1="130" y1="60" x2="115" y2="120" stroke="#aaa" stroke-width="3" stroke-linecap="round"/>
      <line x1="140" y1="50" x2="130" y2="60" stroke="#aaa" stroke-width="3" stroke-linecap="round"/>
      <line x1="120" y1="55" x2="115" y2="65" stroke="#aaa" stroke-width="3" stroke-linecap="round"/>
      <!-- Steam -->
      <path d="M60 95 Q55 85 60 75" fill="none" stroke="#ccc" stroke-width="1.5" opacity="0.5"/>
      <path d="M100 85 Q95 75 100 65" fill="none" stroke="#ccc" stroke-width="1.5" opacity="0.5"/>
      <path d="M140 95 Q135 85 140 75" fill="none" stroke="#ccc" stroke-width="1.5" opacity="0.5"/>
    </svg>
  </div>
</div>
```

- [ ] **Step 2: Add recipe card and illustration styles**

```css
.recipe-wrapper {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.recipe-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.recipe-title {
  font-size: 1.8rem;
  color: #8b0000;
  margin-bottom: 0.3rem;
}

.chef {
  font-style: italic;
  color: #666;
  margin-bottom: 1.5rem;
  border-bottom: 1px dashed #ccc;
  padding-bottom: 0.5rem;
}

.recipe-card h3 {
  color: #8b0000;
  margin: 1.2rem 0 0.5rem;
  font-size: 1.2rem;
}

.ingredients {
  list-style: none;
  padding: 0;
}

.ingredients li {
  padding: 0.25rem 0;
  border-bottom: 1px dotted #eee;
}

.ingredients li::before {
  content: "• ";
  color: #cc0000;
}

.preparation {
  padding-left: 1.5rem;
}

.preparation li {
  padding: 0.4rem 0;
  line-height: 1.5;
}

.illustration {
  flex-shrink: 0;
  width: 180px;
}

.illustration svg {
  width: 100%;
  height: auto;
}

.nonscalable {
  color: #888;
  font-style: italic;
}

@media (max-width: 700px) {
  .recipe-wrapper {
    flex-direction: column-reverse;
    align-items: center;
  }

  .illustration {
    width: 140px;
  }
}
```

---

### Task 5: Portion Calculator JavaScript

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add JavaScript before `</body>`**

```html
<script>
  const BASE_SERVINGS = 2;
  let currentServings = BASE_SERVINGS;

  const portionCount = document.getElementById('portionCount');
  const decBtn = document.getElementById('decBtn');
  const incBtn = document.getElementById('incBtn');
  const amountSpans = document.querySelectorAll('.amount');

  function updatePortions() {
    portionCount.textContent = currentServings;
    const multiplier = currentServings / BASE_SERVINGS;

    amountSpans.forEach(span => {
      const base = parseFloat(span.dataset.base);
      const unit = span.dataset.unit;
      if (!isNaN(base)) {
        const scaled = Math.round(base * multiplier);
        span.textContent = scaled + (unit ? ' ' + unit : '');
      }
    });
  }

  decBtn.addEventListener('click', () => {
    if (currentServings > 1) {
      currentServings--;
      updatePortions();
    }
  });

  incBtn.addEventListener('click', () => {
    if (currentServings < 10) {
      currentServings++;
      updatePortions();
    }
  });
</script>
```

---

### Task 6: Final Review

- [ ] **Step 1: Open `index.html` in browser and verify:**
  - Checkerboard background renders correctly
  - Title and subtitle visible
  - Recipe card displays ingredients and preparation
  - SVG pasta illustration appears to the right (or below on mobile)
  - Portion selector + and - buttons work
  - Ingredient amounts update correctly when changing portions
  - Non-scalable items (q.b.) stay unchanged

- [ ] **Step 2: Verify no external dependencies — the file works offline with just a browser**
