(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();function C(n,e){const a=[];for(let o=0;o<n;o++)for(let t=0;t<e;t++)a.push({id:`rect-${o}-${t}`,row:o,col:t,x:t*120,y:o*120,width:100,height:100,scale:1,rotation:0,type:(o+t)%2===0?"diamond":"circle"});return a}function q(){return{rows:3,cols:3,diamondStrokeWidth:2,circleStrokeWidth:2,strokeColor:"#000000",fillColor:"none"}}function I(n){const e={...q(),...n==null?void 0:n.settings},a=e.rows,o=e.cols;return{state:{settings:e,rects:C(a,o),selectedId:null},listeners:new Set}}function f(n){return n.state}function b(n,e){Object.assign(n.state,e);for(const a of n.listeners)try{a(n.state)}catch(o){console.error(o)}}function S(n,e){return n.listeners.add(e),()=>n.listeners.delete(e)}function T(n){const e=n.cloneNode(!0);e.getAttribute("xmlns")||e.setAttribute("xmlns","http://www.w3.org/2000/svg");const o=new XMLSerializer().serializeToString(e),t=new Blob([o],{type:"image/svg+xml"});z(t,"pattern.svg")}function O(n,e=2){const a=new XMLSerializer().serializeToString(n),o=new Blob([a],{type:"image/svg+xml;charset=utf-8"}),t=URL.createObjectURL(o),r=new Image;r.onload=()=>{const c=document.createElement("canvas");c.width=r.naturalWidth*e,c.height=r.naturalHeight*e;const i=c.getContext("2d");i.scale(e,e),i.drawImage(r,0,0),c.toBlob(s=>{z(s,"pattern.png"),URL.revokeObjectURL(t)},"image/png")},r.src=t}function z(n,e){const a=document.createElement("a");a.href=URL.createObjectURL(n),a.download=e,a.click(),URL.revokeObjectURL(a.href)}function P(n){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
    <div class="modal">
      <h2>Esporta pattern</h2>
      <p style="margin-bottom:12px;color:var(--text-muted);font-size:13px">Scegli il formato:</p>
      <div class="modal-actions">
        <button id="export-svg">SVG</button>
        <button id="export-png">PNG</button>
        <button id="export-cancel">Annulla</button>
      </div>
    </div>
  `,e.querySelector("#export-svg").addEventListener("click",()=>{T(n),e.remove()}),e.querySelector("#export-png").addEventListener("click",()=>{O(n),e.remove()}),e.querySelector("#export-cancel").addEventListener("click",()=>{e.remove()}),e.addEventListener("click",a=>{a.target===e&&e.remove()}),document.body.appendChild(e)}function B(n,e){function a(o){const{rows:t,cols:r,diamondStrokeWidth:c,circleStrokeWidth:i,strokeColor:s,fillColor:l}=o.settings;n.innerHTML=`
      <div class="toolbar-group">
        <label>Righe</label>
        <button data-action="dec-rows">−</button>
        <span>${t}</span>
        <button data-action="inc-rows">+</button>
      </div>
      <div class="toolbar-group">
        <label>Colonne</label>
        <button data-action="dec-cols">−</button>
        <span>${r}</span>
        <button data-action="inc-cols">+</button>
      </div>
      <div class="toolbar-group">
        <label>Tratto rombo</label>
        <input type="number" data-prop="diamondStrokeWidth" value="${c}" min="0" max="20" step="0.5" />
      </div>
      <div class="toolbar-group">
        <label>Tratto cerchio</label>
        <input type="number" data-prop="circleStrokeWidth" value="${i}" min="0" max="20" step="0.5" />
      </div>
      <div class="toolbar-group">
        <label>Colore tratto</label>
        <input type="color" data-prop="strokeColor" value="${s}" />
      </div>
      <div class="toolbar-group">
        <label>Fill</label>
        <input type="color" data-prop="fillColor" value="${l!=="none"?l:"#ffffff"}" />
      </div>
      <div style="margin-left:auto">
        <button class="primary" id="export-btn">Esporta</button>
      </div>
    `,H(n,e)}return a(f(e)),S(e,o=>a(o))}function H(n,e){var a,o,t,r,c;(a=n.querySelector('[data-action="dec-rows"]'))==null||a.addEventListener("click",()=>x(e,-1,0)),(o=n.querySelector('[data-action="inc-rows"]'))==null||o.addEventListener("click",()=>x(e,1,0)),(t=n.querySelector('[data-action="dec-cols"]'))==null||t.addEventListener("click",()=>x(e,0,-1)),(r=n.querySelector('[data-action="inc-cols"]'))==null||r.addEventListener("click",()=>x(e,0,1)),n.querySelectorAll('input[type="number"]').forEach(i=>{i.addEventListener("change",()=>{const s=i.dataset.prop,l=parseFloat(i.value);b(e,{settings:{...f(e).settings,[s]:l}})})}),n.querySelectorAll('input[type="color"]').forEach(i=>{i.addEventListener("input",()=>{const s=i.dataset.prop,l=i.value,u=s==="fillColor"&&l==="#ffffff"?"none":l;b(e,{settings:{...f(e).settings,[s]:u}})})}),(c=n.querySelector("#export-btn"))==null||c.addEventListener("click",()=>{const i=document.querySelector(".canvas-container svg");i&&P(i)})}function x(n,e,a){const o=f(n),t=Math.max(1,o.settings.rows+e),r=Math.max(1,o.settings.cols+a),c=[];for(let i=0;i<t;i++)for(let s=0;s<r;s++){const l=o.rects.find(u=>u.row===i&&u.col===s);c.push(l||{id:`rect-${i}-${s}`,row:i,col:s,x:s*120,y:i*120,width:100,height:100,scale:1,scale:1,rotation:0,type:(i+s)%2===0?"diamond":"circle"})}b(n,{settings:{...o.settings,rows:t,cols:r},rects:c})}function W(n,e,a,o,t){const r=n+a/2,c=e+o/2,i=(1-t)*a/2,s=(1-t)*o/2;return[{x:r,y:e+s},{x:n+a-i,y:c},{x:r,y:e+o-s},{x:n+i,y:c}]}function N(n,e,a){return Math.min(n,e)/2*a}function U(n,e,a){const{id:o,x:t,y:r,width:c,height:i,scale:s,rotation:l,type:u}=n,{strokeColor:g,fillColor:h,diamondStrokeWidth:m,circleStrokeWidth:p}=e,y=u==="diamond"?m:p,v=a?' class="selected"':"",k=t+c/2,E=r+i/2,M=l?` transform="rotate(${l}, ${k}, ${E})"`:"";let w="";if(u==="diamond")w=`  <polygon points="${W(t,r,c,i,s).map(A=>`${A.x},${A.y}`).join(" ")}" fill="${h}" stroke="${g}" stroke-width="${y}"${M}${v} />`;else{const $=N(c,i,s);w=`  <circle cx="${k}" cy="${E}" r="${$>0?$:0}" fill="${h}" stroke="${g}" stroke-width="${y}"${M}${v} />`}return`  <g data-rect-id="${o}">
${w}
  </g>`}function X(n,e,a){const o=Math.min(...n.map(s=>s.x)),t=Math.min(...n.map(s=>s.y)),r=Math.max(...n.map(s=>s.x+s.width)),c=Math.max(...n.map(s=>s.y+s.height)),i=n.map(s=>U(s,e,s.id===a));return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${o-10} ${t-10} ${r-o+20} ${c-t+20}">
${i.join(`
`)}
</svg>`}const d=8;function j(n,e){const{x:a,y:o,width:t,height:r}=e,c=[{id:"nw",x:a-d/2,y:o-d/2},{id:"n",x:a+t/2-d/2,y:o-d/2},{id:"ne",x:a+t-d/2,y:o-d/2},{id:"e",x:a+t-d/2,y:o+r/2-d/2},{id:"se",x:a+t-d/2,y:o+r-d/2},{id:"s",x:a+t/2-d/2,y:o+r-d/2},{id:"sw",x:a-d/2,y:o+r-d/2},{id:"w",x:a-d/2,y:o+r/2-d/2}],i=document.createDocumentFragment();for(const s of c){const l=document.createElementNS(n,"rect");l.setAttribute("x",s.x),l.setAttribute("y",s.y),l.setAttribute("width",d),l.setAttribute("height",d),l.setAttribute("fill","#fff"),l.setAttribute("stroke","#3b82f6"),l.setAttribute("stroke-width","1.5"),l.setAttribute("data-handle",s.id),l.style.cursor=`${s.id}-resize`,i.appendChild(l)}return i}function Y(n,e,a){let o=null,t=null,r=null;n.addEventListener("mousedown",c=>{const i=c.target.closest("[data-handle]");if(!i)return;c.preventDefault();const s=f(e),l=s.rects.find(u=>u.id===s.selectedId);l&&(o=i.getAttribute("data-handle"),t={...l},r={x:c.clientX,y:c.clientY},a&&a(!0))}),window.addEventListener("mousemove",c=>{if(!o||!t||!r)return;const i=c.clientX-r.x,s=c.clientY-r.y,l=f(e);let{x:u,y:g,width:h,height:m}=t;const p=20;switch(o){case"e":h=Math.max(p,t.width+i);break;case"w":h=Math.max(p,t.width-i),u=t.x+t.width-h;break;case"s":m=Math.max(p,t.height+s);break;case"n":m=Math.max(p,t.height-s),g=t.y+t.height-m;break;case"ne":h=Math.max(p,t.width+i),m=Math.max(p,t.height-s),g=t.y+t.height-m;break;case"nw":h=Math.max(p,t.width-i),u=t.x+t.width-h,m=Math.max(p,t.height-s),g=t.y+t.height-m;break;case"se":h=Math.max(p,t.width+i),m=Math.max(p,t.height+s);break;case"sw":h=Math.max(p,t.width-i),u=t.x+t.width-h,m=Math.max(p,t.height+s);break}const y=l.rects.map(v=>v.id===t.id?{...v,x:u,y:g,width:h,height:m}:v);b(e,{rects:y})}),window.addEventListener("mouseup",()=>{o&&a&&a(!1),o=null,t=null,r=null})}let R=!1;function F(n,e){const a=document.createElement("div");a.className="canvas-container",n.appendChild(a);function o(){if(R)return;const r=f(e),c=X(r.rects,r.settings,r.selectedId);a.innerHTML=c;const i=a.querySelector("svg");if(!i)return;D(i,e);const s=r.rects.find(l=>l.id===r.selectedId);if(s){const u=j("http://www.w3.org/2000/svg",s);i.appendChild(u)}Y(i,e,l=>{R=l,l||o()})}o();const t=S(e,o);return{element:a,destroy:t}}function D(n,e){if(!n)return;const a=n.querySelectorAll("[data-rect-id]");for(const o of a)o.style.cursor="pointer",o.addEventListener("click",t=>{t.stopPropagation();const r=o.getAttribute("data-rect-id"),i=f(e).rects.find(s=>s.id===r);i&&b(e,{selectedId:i.id})})}function G(n,e){function a(o){const t=o.rects.find(r=>r.id===o.selectedId);if(!t){n.innerHTML='<h3>Proprietà</h3><p style="color:var(--text-muted);font-size:13px">Seleziona un rettangolo</p>';return}n.innerHTML=`
      <h3>Rettangolo ${t.row},${t.col} — ${t.type}</h3>
      <div class="field">
        <label>X: ${t.x}</label>
        <input type="range" data-prop="x" value="${t.x}" min="0" max="2000" step="1" />
      </div>
      <div class="field">
        <label>Y: ${t.y}</label>
        <input type="range" data-prop="y" value="${t.y}" min="0" max="2000" step="1" />
      </div>
      <div class="field">
        <label>Larghezza: ${t.width}</label>
        <input type="range" data-prop="width" value="${t.width}" min="20" max="500" step="1" />
      </div>
      <div class="field">
        <label>Altezza: ${t.height}</label>
        <input type="range" data-prop="height" value="${t.height}" min="20" max="500" step="1" />
      </div>
      <div class="field">
        <label>Scala: ${t.scale}</label>
        <input type="range" data-prop="scale" value="${t.scale}" min="0.1" max="1" step="0.05" />
      </div>
      <div class="field">
        <label>Rotazione: ${t.rotation}°</label>
        <input type="range" data-prop="rotation" value="${t.rotation}" min="0" max="360" step="1" />
      </div>
    `,K(n,e)}return a(f(e)),S(e,a)}function K(n,e){n.querySelectorAll('input[type="range"]').forEach(a=>{a.addEventListener("input",()=>{const o=a.dataset.prop,t=parseFloat(a.value),r=f(e),c=r.rects.map(i=>i.id===r.selectedId?{...i,[o]:t}:i);b(e,{rects:c})})})}const V=document.getElementById("app"),L=I();V.innerHTML=`
  <div class="toolbar" id="toolbar"></div>
  <div class="main-area">
    <div id="canvas-slot"></div>
    <div class="property-panel" id="property-panel"></div>
  </div>
`;B(document.getElementById("toolbar"),L);F(document.getElementById("canvas-slot"),L);G(document.getElementById("property-panel"),L);
