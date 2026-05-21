# Recipe Website Design — Pasta aglio e olio e peperoncino

**Date:** 2026-05-18
**Chef:** Maya
**Approach:** Single-page HTML + CSS + light JS (Approach B)

---

## Layout & Structure

Single-column, centered, mobile-first layout. Max-width ~720px. Stacks vertically — no sidebar, no nav.

Sections in order:
1. Header (title + chef credit)
2. Quick info bar (prep/cook time tags)
3. Ingredients list (checkable boxes, portion slider)
4. Preparation steps (numbered)
5. Footer ("Buon appetito!")

---

## Visual Style

| Element | Value |
|---------|-------|
| Background | `#fdf6ec` (warm cream) |
| Headers / footer | `#c75b39` (terracotta) |
| Accent | `#5b7a4f` (olive green) |
| Text | `#3a2a1a` (dark brown) |
| Heading font | `"Georgia", serif` |
| Body font | `system-ui, sans-serif` |

- Rounded card for recipe area with subtle shadow
- Checkboxes styled in olive green
- Step numbers get a terracotta badge
- Print button as small icon top-right

---

## Content

- **Header:** "Pasta aglio e olio e peperoncino" + "by Chef Maya"
- **Quick info:** Prep time, cook time as small tags
- **Ingredients:** Unordered list with click-to-cross-off checkboxes
- **Portion slider:** Adjustable, scales ingredient quantities proportionally
- **Steps:** Numbered list with short descriptions
- **Footer:** "Buon appetito!"

---

## Interactivity (JS)

- Portion scaling slider
- Click-to-cross-off ingredients
- Print button (`window.print()` with print stylesheet)

---

## File Structure

```
index.html          — single file, embedded <style> and <script>
```

Zero dependencies, no build step. Opens directly in browser.

---

## Success Criteria

- Page looks good on mobile and desktop without a framework
- Rustic Italian trattoria feel is clear from colors/typography
- Portion slider correctly scales all ingredient quantities
- Print layout is clean and readable
