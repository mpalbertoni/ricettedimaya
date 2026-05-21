const Mask = (() => {
  let container;
  let pupils = [];
  let morphGroups = [];
  let driftTime = 0;

  function prefixCss(svgText, prefix) {
    return svgText
      .replace(/\.st(\d)\b/g, `.${prefix}st$1`)
      .replace(/class="st(\d)"/g, `class="${prefix}st$1"`);
  }

  function init(idleText, activeText, containerEl) {
    container = containerEl;
    const parser = new DOMParser();

    // Prefix active SVG classes to avoid CSS conflicts
    const activePrefixed = prefixCss(activeText, 'a');

    const activeDoc = parser.parseFromString(activePrefixed, 'image/svg+xml');

    // Parse idle SVG and set as base
    const idleDoc = parser.parseFromString(idleText, 'image/svg+xml');
    const baseSvg = idleDoc.querySelector('svg');
    baseSvg.setAttribute('viewBox', '0 40 595 780');
    baseSvg.style.width = '100%';
    baseSvg.style.height = '100%';
    baseSvg.style.display = 'block';

    // Copy active styles into base SVG so cloned elements render correctly
    const activeStyle = activeDoc.querySelector('style');
    const activeDefs = activeDoc.querySelector('defs');
    if (activeStyle) {
      let baseDefs = baseSvg.querySelector('defs');
      if (!baseDefs) {
        baseDefs = baseSvg.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'defs');
        baseSvg.insertBefore(baseDefs, baseSvg.firstChild);
      }
      // Copy gradient defs too (needed for ast0 even though we don't clone head)
      if (activeDefs) {
        const grad = activeDefs.querySelector('linearGradient');
        if (grad) baseDefs.appendChild(baseSvg.ownerDocument.importNode(grad, true));
      }
      baseDefs.appendChild(baseSvg.ownerDocument.importNode(activeStyle, true));
    }

    container.style.position = 'relative';
    container.appendChild(baseSvg);

    // Pair pupils by index
    const idlePupils = [...baseSvg.querySelectorAll('circle.st1')];
    const activePupils = [...activeDoc.querySelectorAll('circle.ast2')];
    pupils = idlePupils.map((el, i) => ({
      el,
      idleX: parseFloat(el.getAttribute('cx')),
      idleY: parseFloat(el.getAttribute('cy')),
      activeX: parseFloat(activePupils[i]?.getAttribute('cx') || 0),
      activeY: parseFloat(activePupils[i]?.getAttribute('cy') || 0)
    }));

    // Morph groups: clone active elements into base, cross-fade with idle
    const groupMap = [
      { id: 'bocca', name: 'mouth' },
      { id: 'sopracciglia', name: 'brows' },
      { id: 'Capelli', name: 'hair' }
    ];

    groupMap.forEach(({ id, name }) => {
      const idleGroup = baseSvg.querySelector(`#${id}`);
      const activeGroup = activeDoc.querySelector(`#${id}`);
      if (!idleGroup || !activeGroup) return;

      const idleKids = [...idleGroup.children];
      const activeKids = [...activeGroup.children];
      const pairs = [];

      activeKids.forEach((ak, i) => {
        const clone = ak.cloneNode(true);
        idleGroup.appendChild(clone);
        pairs.push({
          idle: idleKids[i] || null,
          active: clone
        });
      });

      morphGroups.push({ name, pairs });
    });

    setMorph(0);
  }

  function morphFade(v) {
    // Sharper transition: ramp from 0→1 between 0.2 and 0.7
    if (v < 0.2) return 0;
    if (v > 0.7) return 1;
    return (v - 0.2) / 0.5;
  }

  function setMorph(t, mouthT) {
    pupils.forEach(p => {
      p.el.setAttribute('cx', p.idleX + (p.activeX - p.idleX) * t);
      p.el.setAttribute('cy', p.idleY + (p.activeY - p.idleY) * t);
    });

    morphGroups.forEach(group => {
      const rawT = group.name === 'mouth' && mouthT !== undefined ? mouthT : t;
      const fadeT = morphFade(rawT);
      group.pairs.forEach(({ idle, active }) => {
        if (idle) idle.style.opacity = 1 - fadeT;
        if (active) active.style.opacity = fadeT;
      });
    });
  }

  function updateIdle(dt, intensity) {
    if (!pupils.length) return;
    driftTime += dt;
    const dx = Math.sin(driftTime * 0.6) * 5 * intensity;
    const dy = Math.sin(driftTime * 0.4) * 3 * intensity;
    pupils.forEach(p => {
      p.el.setAttribute('cx', p.idleX + dx);
      p.el.setAttribute('cy', p.idleY + dy);
    });
  }

  return { init, setMorph, updateIdle };
})();
