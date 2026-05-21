const App = (() => {
  let audioCtx, analyser, source, mediaStream;
  let isListening = false;
  let currentVolume = 0;
  const SMOOTHING = 0.3;

  async function startMic() {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      source = audioCtx.createMediaStreamSource(mediaStream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      isListening = true;
      document.getElementById('mic-btn').classList.add('active');
      document.getElementById('status').textContent = '🎤 In ascolto...';
    } catch (e) {
      document.getElementById('status').textContent = '❌ Errore microfono';
      console.error(e);
    }
  }

  function stopMic() {
    if (mediaStream) mediaStream.getTracks().forEach(t => t.stop());
    isListening = false;
    document.getElementById('mic-btn').classList.remove('active');
    document.getElementById('status').textContent = '⏸ In attesa...';
  }

  function toggleMic() {
    isListening ? stopMic() : startMic();
  }

  function getVolume() {
    if (!analyser) return 0;
    const data = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const v = (data[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / data.length);
    currentVolume = currentVolume * SMOOTHING + rms * (1 - SMOOTHING);
    return currentVolume;
  }

  document.getElementById('mic-btn').addEventListener('click', toggleMic);

  document.querySelectorAll('#sliders input[type="range"]').forEach(slider => {
    const valSpan = document.getElementById('val-' + slider.id.replace('slider-', ''));
    if (valSpan) {
      slider.addEventListener('input', () => {
        valSpan.textContent = slider.value + '%';
      });
    }
  });

  function startLoop() {
    let lastTime = performance.now();
    let smoothT = 0;

    function loop(time) {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const rawVolume = getVolume();
      const sensitivity = parseFloat(document.getElementById('slider-sensitivity').value) / 100;
      const speed = parseFloat(document.getElementById('slider-speed').value) / 100;

      const faceMoveIntensity = parseFloat(document.getElementById('slider-face-move').value) / 100;
      const mouthIntensity = parseFloat(document.getElementById('slider-mouth').value) / 100;

      const rawTarget = Math.min(1, rawVolume * 6 * sensitivity);
      const target = rawTarget * faceMoveIntensity;
      const mouthTarget = rawTarget * mouthIntensity;

      const lerpFactor = 1 - Math.pow(0.5, dt * (1 + speed * 4));
      smoothT += (target - smoothT) * lerpFactor;

      Mask.setMorph(smoothT, mouthTarget);

      if (smoothT < 0.5) {
        const idleInfluence = (0.5 - smoothT) / 0.5;
        Mask.updateIdle(dt, faceMoveIntensity * idleInfluence);
      }

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const [r1, r2] = await Promise.all([
      fetch('Maschera Sonora - stato 1.svg'),
      fetch('Maschera Sonora - stato 2.svg')
    ]);
    const svg1 = await r1.text();
    const svg2 = await r2.text();
    Mask.init(svg1, svg2, document.getElementById('mask-stage'));
    startLoop();
  });
})();
