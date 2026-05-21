# Recipe Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page recipe website for "Pasta aglio e olio e peperoncino" with a rustic Italian look and light JS interactivity.

**Architecture:** Single `index.html` file with embedded `<style>` and `<script>`. Zero dependencies, no build step. Mobile-first single-column layout.

**Tech Stack:** Vanilla HTML5, CSS3, plain JavaScript

**Base ingredient data (2 porzioni):** 300g spaghetti, 3 spicchi d'aglio, 1 peperoncino fresco, prezzemolo q.b., olio d'oliva q.b., acqua q.b.

---

### File Structure

- `codebase/index.html` — the entire site

---

### Task 1: HTML Skeleton

**Files:**
- Create: `codebase/index.html`

- [ ] **Step 1: Write the full HTML structure**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pasta aglio e olio e peperoncino — Chef Maya</title>
</head>
<body>

  <div class="container">

    <header class="header">
      <h1>Pasta aglio e olio<br>e peperoncino</h1>
      <p class="chef">di <strong>Chef Maya</strong></p>
    </header>

    <div class="info-bar">
      <span class="tag">Preparazione: 5 min</span>
      <span class="tag">Cottura: 10 min</span>
      <span class="tag">Totale: 15 min</span>
    </div>

    <section class="ingredients">
      <h2>Ingredienti</h2>
      <div class="portion-control">
        <label for="portions">Porzioni:</label>
        <input type="range" id="portions" min="1" max="6" value="2">
        <span id="portion-display">2</span>
      </div>
      <ul id="ingredient-list">
        <li><input type="checkbox" id="ing-0"><label for="ing-0"><span class="qty" data-base="300" data-unit="g">300 g</span> di spaghetti</label></li>
        <li><input type="checkbox" id="ing-1"><label for="ing-1"><span class="qty" data-base="3" data-unit="">3</span> spicchi d'aglio</label></li>
        <li><input type="checkbox" id="ing-2"><label for="ing-2"><span class="qty" data-base="1" data-unit="">1</span> peperoncino fresco intero</label></li>
        <li><input type="checkbox" id="ing-3"><label for="ing-3">Prezzemolo q.b.</label></li>
        <li><input type="checkbox" id="ing-4"><label for="ing-4">Olio d'oliva q.b.</label></li>
        <li><input type="checkbox" id="ing-5"><label for="ing-5">Acqua q.b.</label></li>
      </ul>
    </section>

    <section class="steps">
      <h2>Preparazione</h2>
      <ol>
        <li>
          <span class="step-num">1</span>
          <div><strong>Lessare la pasta.</strong> Prendere una pentola, riempirla d'acqua, accendere il fuoco e portare a bollore. Calare gli spaghetti e cuocere per 10 minuti.</div>
        </li>
        <li>
          <span class="step-num">2</span>
          <div><strong>Preparare il condimento.</strong> Nel frattempo, sbucciare i 3 spicchi d'aglio e tagliarli finemente. Tagliare il prezzemolo.</div>
        </li>
        <li>
          <span class="step-num">3</span>
          <div><strong>Soffriggere.</strong> Scaldare una padella con una generosa quantità d'olio d'oliva. Aggiungere l'aglio tagliato e il peperoncino intero e farli soffriggere.</div>
        </li>
        <li>
          <span class="step-num">4</span>
          <div><strong>Mantecare.</strong> Scolare la pasta al dente e versarla direttamente nella padella con il soffritto. Mantecare per 1 minuto, aggiungendo un po' d'acqua di cottura se necessario.</div>
        </li>
        <li>
          <span class="step-num">5</span>
          <div><strong>Impiattare.</strong> Finalizzare con una spolverata di prezzemolo fresco tritato e servire.</div>
        </li>
      </ol>
    </section>

    <footer class="footer">
      <p>Buon appetito! &#127837;</p>
    </footer>

  </div>

</body>
</html>
```

---

### Task 2: CSS Styling

**Files:**
- Modify: `codebase/index.html` (add `<style>` block in `<head>`)

- [ ] **Step 1: Add the full stylesheet inside `<head>`**

Add before `</head>`:

```html
<style>
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
    background: #fdf6ec;
    color: #3a2a1a;
    line-height: 1.6;
  }

  .container {
    max-width: 720px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  /* Header */
  .header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .header h1 {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 2.2rem;
    color: #c75b39;
    margin: 0;
    line-height: 1.2;
  }

  .chef {
    font-size: 1rem;
    color: #5b7a4f;
    margin-top: 0.3rem;
  }

  /* Info bar */
  .info-bar {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  .tag {
    background: #5b7a4f;
    color: #fff;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.85rem;
  }

  /* Section headings */
  h2 {
    font-family: Georgia, 'Times New Roman', serif;
    color: #c75b39;
    font-size: 1.5rem;
    border-bottom: 2px solid #5b7a4f;
    padding-bottom: 0.3rem;
    margin-top: 2rem;
  }

  /* Ingredients card */
  .ingredients {
    background: #fff;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  .portion-control {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }

  .portion-control input[type="range"] {
    flex: 1;
    max-width: 200px;
    accent-color: #5b7a4f;
  }

  #portion-display {
    font-weight: bold;
    color: #c75b39;
    min-width: 1.5rem;
  }

  #ingredient-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  #ingredient-list li {
    padding: 0.4rem 0;
  }

  #ingredient-list input[type="checkbox"] {
    accent-color: #5b7a4f;
    margin-right: 0.5rem;
    transform: scale(1.1);
  }

  #ingredient-list input[type="checkbox"]:checked + label {
    text-decoration: line-through;
    opacity: 0.5;
  }

  /* Steps */
  .steps ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .steps li {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
  }

  .steps li:last-child {
    border-bottom: none;
  }

  .step-num {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    background: #c75b39;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.9rem;
  }

  /* Footer */
  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 2px solid #5b7a4f;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 1.3rem;
    color: #c75b39;
  }

  /* Print button */
  .print-btn {
    position: fixed;
    top: 1rem;
    right: 1rem;
    background: #c75b39;
    color: #fff;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 1.1rem;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .print-btn:hover {
    background: #a84a2e;
  }

  /* Print styles */
  @media print {
    .print-btn { display: none; }
    .portion-control { display: none; }
    body { background: #fff; }
    .ingredients { box-shadow: none; padding: 0; }
  }

  /* Mobile tweaks */
  @media (max-width: 480px) {
    .header h1 { font-size: 1.6rem; }
    .container { padding: 1rem; }
  }
</style>
```

---

### Task 3: JavaScript Interactivity

**Files:**
- Modify: `codebase/index.html` (add `<script>` block before `</body>`)

- [ ] **Step 1: Add the script block with portion slider + checkbox + print logic**

Add before `</body>`:

```html
<script>
  const portionsSlider = document.getElementById('portions');
  const portionDisplay = document.getElementById('portion-display');
  const basePortions = 2;

  const scalables = document.querySelectorAll('.qty');

  function updatePortions() {
    const current = parseInt(portionsSlider.value, 10);
    portionDisplay.textContent = current;
    const factor = current / basePortions;

    scalables.forEach(el => {
      const base = parseFloat(el.dataset.base);
      if (isNaN(base)) return;
      const scaled = Math.round(base * factor);
      const unit = el.dataset.unit;
      el.textContent = scaled + ' ' + unit;
    });
  }

  portionsSlider.addEventListener('input', updatePortions);
  updatePortions();

  document.querySelector('.print-btn').addEventListener('click', () => {
    window.print();
  });
</script>
```

- [ ] **Step 2: Add the print button HTML**

Add right after `<body>`:

```html
<button class="print-btn" title="Stampa" aria-label="Stampa ricetta">&#128424;</button>
```

---

### Task 4: Final Review

**Files:**
- Review: `codebase/index.html`

- [ ] **Step 1: Open in browser and verify**
  - Page loads with no console errors
  - Text is readable, no content overflow
  - Portion slider scales: 300g → 150g (1 porzione), 450g (3 porzioni), 600g (4 porzioni), etc.
  - Clicking a checkbox strikes through the ingredient
  - Print button opens print dialog
  - Print preview hides slider and button
  - Mobile view (<480px) shrinks title and padding
