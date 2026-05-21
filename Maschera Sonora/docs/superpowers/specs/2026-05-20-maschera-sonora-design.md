# Maschera Sonora — Design Document

## Overview
Web tool that animates a sound mask (SVG) based on voice input. The mask has two visual states embedded in a single SVG: an idle state (left) and an active state (right). Voice volume controls a smooth morphing transition between these two states.

## States
- **Idle** (SVG left face): slow gentle eye movement, relaxed mouth, flat brows, calm hair
- **Active** (SVG right face): mouth opens, eyes react, brows raise, hair moves
- Voice volume drives morphing between idle (0 volume) and active (max volume)
- When silent, mask smoothly returns to idle state

## Architecture
```
index.html            — main page
style.css             — layout, slider, button styles
script.js             — audio capture, UI coordination, animation loop
mask.js               — SVG morphing logic, element interpolation
Maschera Sonora.svg   — source SVG with both face states
```

Pure HTML + CSS + JS. No frameworks. Local HTTP server for microphone access.

## Layout
Header area: microphone button, file upload button, status indicator
Center: animated SVG mask (morphing between idle/active)
Bottom: 6 slider controls

## Controls (6 sliders)
1. Volume Sensitivity — scales audio input influence (0-100%)
2. Transition Speed — rate of morphing between states (0-100%)
3. Idle Eye Movement — amplitude of slow eye drift in idle state
4. Mouth Intensity — scales mouth opening response
5. Eyebrow Intensity — scales brow movement response
6. Hair Wave — scales hair animation response

## Animation System
- mask.js interpolates SVG attributes (cx, cy, rx, ry, path `d`, transforms) between corresponding left (idle) and right (active) elements
- Voice volume produces a `t` value (0-1) that controls interpolation position
- Each channel has its own intensity multiplier from its slider
- Idle eye movement uses independent sine-wave oscillation scaled by its slider
- Smoothing/damping on `t` value for natural-feeling transitions

## Audio Input (script.js)
- Live microphone: `navigator.mediaDevices.getUserMedia` → `Web Audio API` → `AnalyserNode`
- File upload: `FileReader` → `AudioContext.decodeAudioData` → playback + analysis
- Volume calculated from `getByteTimeDomainData` RMS

## Local Server
- `npx serve` or `python -m http.server` for local development
- Required for `getUserMedia` microphone access

## Future (out of scope)
- Multiple SVG masks
- Record/export animation
- Preset save/load
