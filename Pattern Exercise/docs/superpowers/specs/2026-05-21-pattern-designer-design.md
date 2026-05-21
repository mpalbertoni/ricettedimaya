# Pattern Designer — Specifica di Design

## Panoramica

Strumento web per progettare pattern vettoriali composti da una griglia di
rettangoli con forme geometriche (rombi e cerchi) che si sviluppano verso
l'alto da ogni cella. L'utente può controllare scala e colore di ogni tipo
di forma tramite un pannello laterale ed esportare il risultato in SVG, PNG
o PDF.

## Tecnologia

- **Rendering**: Canvas2D (Vanilla JS)
- **Package**: Singolo file HTML — zero dipendenze (escluso jsPDF per export PDF)
- **Browser**: Moderno (Chrome, Firefox, Edge, Safari)

## Layout

- **Background interfaccia**: nero (`#000000`)
- **Colonne**: canvas a sinistra, pannello controlli a destra (~300px di larghezza)
- **Canvas**: sfondo bianco, responsive (si adatta al viewport), rapporto
  logico interno 1200×800 pixel con padding interno di 40px
- **Pannello**: testo bianco su sfondo nero, sezioni con titoli e controlli

## Griglia

- **Dimensioni**: 8 colonne × 4 righe = 32 celle
- **Spaziatura**: gap uniforme tra celle (es. 8px)
- **Distribuzione**: celle distribuite uniformemente nell'area canvas
  (escluso padding)

## Forme e Proprietà

### Rettangoli
- Ogni cella contiene un rettangolo
- **Scala**: slider singolo proporzionale (larghezza = altezza), range 0.5x–3x
- **Colore**: color picker singolo applicato a tutti i rettangoli
- Posizionamento: centrato nella cella

### Forme Emergenti
- Da ogni rettangolo parte una forma verso l'alto
- Punto di origine: angolo superiore sinistro del rettangolo
- La forma si centra orizzontalmente sul rettangolo
- **Alternanza a scacchiera**:
  - Celle con somma riga+colonna pari → rombo
  - Celle con somma riga+colonna dispari → cerchio

### Cerchi
- **Scala**: slider singolo proporzionale (diametro), range 0.5x–3x
- **Colore**: color picker singolo applicato a tutti i cerchi
- Disegnati come archi circolari centrati sul punto di origine, verso l'alto

### Romhi
- **Scala**: slider singolo proporzionale (larghezza = altezza), range 0.5x–3x
- **Colore**: color picker singolo applicato a tutti i rombi
- Disegnati come poligoni a 4 vertici (diamante), centrati sul punto di
  origine, verso l'alto

## Pannello Controlli (Destra)

Sezioni verticali nell'ordine:

1. **Rettangoli**
   - Slider scala (valore mostrato, es. "1.5×")
   - Color picker (esadecimale)
2. **Cerchi**
   - Slider scala
   - Color picker
3. **Romhi**
   - Slider scala
   - Color picker
4. **Esporta**
   - Pulsante "SVG" — scarica file .svg
   - Pulsante "PNG" — scarica file .png
   - Pulsante "PDF" — scarica file .pdf

## Esportazione

- **SVG**: ricostruzione del pattern come documento SVG basato sui parametri
  correnti, scaricato via download link
- **PNG**: cattura del canvas via `canvas.toBlob()`, scaricato come PNG
- **PDF**: jsPDF + immagine PNG intermedia via `canvas.toDataURL()`,
  incorporata nel PDF

L'output deve essere identico a ciò che si vede a schermo (stessi colori,
scale, posizioni).

## Dettagli Implementativi (Canvas2D)

- Ridimensionamento canvas: gestito via `devicePixelRatio` per uscita
  nitida su schermi Retina
- Disegno rettangoli: `fillRect()` con colore e scala applicati
- Disegno cerchi: `arc()` con raggio basato su scala e dimensione cella
- Disegno rombi: `path` (4 vertici) con scala applicata
- Gap gestito come offset nella fase di layout delle celle
- Update reale: a ogni cambio slider/colore, canvas cancellato e ridisegnato
