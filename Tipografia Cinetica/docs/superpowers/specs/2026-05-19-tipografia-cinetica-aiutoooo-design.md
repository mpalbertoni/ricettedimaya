# Tipografia Cinetica — "aiutoooo"

## Obiettivo
Animazione di tipografia cinetica della parola "aiutoooo" (italiano, urlo) su schermo nero con testo bianco. Una lettera alla volta cresce di dimensione in sequenza, poi il ciclo ricomincia.

## Specifiche
- **Parola:** "aiutoooo" (8 lettere)
- **Background:** `#000`
- **Testo:** `#fff`, font sans-serif grassetto (Arial Black / Impact)
- **Effetto:** Una lettera alla volta scala progressivamente da dimensione base a ~3.5x, poi torna a base mentre la successiva inizia a crescere
- **Loop:** 8 secondi totali (~1 secondo per lettera)
- **Ritmo:** Medio/veloce — crescita rapida (~0.35s), pausa al picco (~0.3s), ritorno graduale (~0.35s)

## Stack
- **Singolo file HTML** auto-contenuto
- **CSS:** Layout flexbox centrato, stili base
- **JS:** `requestAnimationFrame` per controllo dell'animazione

## Architettura
### HTML
- `<div id="word">` contenente 8 `<span class="letter">`, uno per ogni carattere
- I `<span>` hanno `display: inline-block` per permettere `transform: scale()`

### CSS
- `body`: `margin: 0; background: #000; display: flex; justify-content: center; align-items: center; height: 100vh;`
- `.word`: `font-size: 5rem; color: #fff; font-weight: 900;`
- `.letter`: `display: inline-block; transition: transform 0.1s;` (per smoothing)

### JS (Animazione)
- `requestAnimationFrame` loop
- `phase` globale: da 0 a 1 (un ciclo completo = 8 secondi)
- Indice lettera attiva = `Math.floor(phase * 8)`
- Progresso locale = `(phase * 8) % 1` → da 0 a 1
- Funzione di easing (es. ease-in-out) sul progresso locale
- `scale = 1 + (scaleMax - 1) * easedProgress` per la fase di crescita
- `scale = 1 + (scaleMax - 1) * (1 - easedProgress)` per la fase di ritorno
- Timeline per lettera: 0-0.4 crescita, 0.4-0.7 piena, 0.7-1.0 ritorno

### Easing
- `easeInOutQuad` o custom per dare naturalezza al movimento

## File
- `index.html` — unico file, auto-contenuto, pronto da aprire in browser

## Criteri di successo
1. Parola centrata su schermo nero
2. Lettere bianche, dimensione base leggibile
3. Lettera focus scala a ~3.5x con transizione fluida
4. Sequenza corretta: a → i → u → t → o → o → o → o
5. Loop continuo di 8 secondi
6. Ritmo percepito come medio/veloce
