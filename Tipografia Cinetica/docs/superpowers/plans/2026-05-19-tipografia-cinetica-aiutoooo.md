# "aiutoooo" Kinetic Typography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Single-page HTML animation showing "aiutoooo" with sequential letter scaling on black background.

**Architecture:** One self-contained HTML file with embedded CSS and JS. DOM-based letter spans animated via `requestAnimationFrame` loop. No dependencies.

**Tech Stack:** HTML5, CSS3, Vanilla JS

---

### Task 1: Create `index.html`

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write the HTML structure and letter spans**

The HTML contains a wrapper div with 8 letter spans, each wrapping one character.

```html
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>aiutoooo</title>
<style>
  /* styles in next step */
</style>
</head>
<body>
  <div id="word">
    <span class="letter">a</span>
    <span class="letter">i</span>
    <span class="letter">u</span>
    <span class="letter">t</span>
    <span class="letter">o</span>
    <span class="letter">o</span>
    <span class="letter">o</span>
    <span class="letter">o</span>
  </div>
  <script>
    /* JS in step 3 */
  </script>
</body>
</html>
```

- [ ] **Step 2: Write the CSS styles**

Black background, centered layout, white bold text at large base size.

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}
#word {
  font-size: 5rem;
  font-family: Arial Black, Impact, sans-serif;
  font-weight: 900;
  color: #fff;
  user-select: none;
}
.letter {
  display: inline-block;
  transition: none;
}
```

- [ ] **Step 3: Write the JS animation loop**

The animation runs at 8 seconds per cycle. Each letter gets ~1 second slot. Within its slot, the letter: grows (0-0.35s), holds at max (0.35-0.7s), shrinks (0.7-1.0s).

```js
const letters = document.querySelectorAll('.letter');
const CYCLE_DURATION = 8000; // ms
const LETTER_COUNT = letters.length;
const SLOT_DURATION = CYCLE_DURATION / LETTER_COUNT; // ~1000ms
const MAX_SCALE = 3.5;
const GROW_FRACTION = 0.35;  // 0-0.35 grow
const HOLD_FRACTION = 0.35;  // 0.35-0.7 hold
const SHRINK_FRACTION = 0.3; // 0.7-1.0 shrink

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function animate() {
  const now = performance.now();
  const cyclePhase = (now % CYCLE_DURATION) / CYCLE_DURATION; // 0 to 1

  letters.forEach((letter, i) => {
    // Where this letter sits in the cycle (0 to 1)
    const letterStart = i / LETTER_COUNT;
    const localPhase = (cyclePhase - letterStart + 1) % 1; // 0 to 1

    let scale = 1;
    if (localPhase < GROW_FRACTION) {
      // Growing
      const t = localPhase / GROW_FRACTION;
      scale = 1 + (MAX_SCALE - 1) * easeInOutQuad(t);
    } else if (localPhase < GROW_FRACTION + HOLD_FRACTION) {
      // Holding at max
      scale = MAX_SCALE;
    } else {
      // Shrinking
      const t = (localPhase - GROW_FRACTION - HOLD_FRACTION) / SHRINK_FRACTION;
      scale = MAX_SCALE - (MAX_SCALE - 1) * easeInOutQuad(t);
    }

    letter.style.transform = `scale(${scale})`;
  });

  requestAnimationFrame(animate);
}

animate();
```

- [ ] **Step 4: Open in browser and verify**

Open `index.html` in a browser. Confirm:
- Black background, white text
- Word "aiutoooo" centered
- Letters grow sequentially left-to-right
- Scale reaches ~3.5x at peak
- Loop is continuous at ~8s per cycle
- Medium/fast rhythm feels natural

No automated tests needed (visual animation).

- [ ] **Step 5: Final check**

Run a quick code review pass on the file:
- No console errors
- Animation smooth (requestAnimationFrame)
- No unused CSS/JS
- No external dependencies
