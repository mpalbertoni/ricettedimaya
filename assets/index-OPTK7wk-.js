(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(t){if(t.ep)return;t.ep=!0;const a=n(t);fetch(t.href,a)}})();function C(o,e){const n=[];for(let r=0;r<o;r++)for(let t=0;t<e;t++)n.push({id:`rect-${r}-${t}`,row:r,col:t,x:t*120,y:r*120,width:100,height:100,scale:1,rotation:0,type:(r+t)%2===0?"diamond":"circle"});return n}function q(){return{rows:3,cols:3,diamondStrokeWidth:2,circleStrokeWidth:2,strokeColor:"#000000",fillColor:"none"}}function I(o){const e={...q(),...o==null?void 0:o.settings},n=e.rows,r=e.cols;return{state:{settings:e,rects:C(n,r),selectedId:null},listeners:new Set}}function m(o){return o.state}function g(o,e){Object.assign(o.state,e);for(const n of o.listeners)try{n(o.state)}catch(r){console.error(r)}}function S(o,e){return o.listeners.add(e),()=>o.listeners.delete(e)}function T(o){const e=o.cloneNode(!0);e.getAttribute("xmlns")||e.setAttribute("xmlns","http://www.w3.org/2000/svg");const r=new XMLSerializer().serializeToString(e),t=new Blob([r],{type:"image/svg+xml"});z(t,"pattern.svg")}function O(o,e=2){const n=new XMLSerializer().serializeToString(o),r=new Blob([n],{type:"image/svg+xml;charset=utf-8"}),t=URL.createObjectURL(r),a=new Image;a.onload=()=>{const c=document.createElement("canvas");c.width=a.naturalWidth*e,c.height=a.naturalHeight*e;const s=c.getContext("2d");s.scale(e,e),s.drawImage(a,0,0),c.toBlob(i=>{z(i,"pattern.png"),URL.revokeObjectURL(t)},"image/png")},a.src=t}function z(o,e){const n=document.createElement("a");n.href=URL.createObjectURL(o),n.download=e,n.click(),URL.revokeObjectURL(n.href)}function P(o){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
    <div class="modal">
      <h2>Esporta pattern</h2>
      <p style="margin-bottom:12px;color:var(--text-muted);font-size:13px">Scegli il formato:</p>
      <div class="modal-actions">
        <button id="export-svg">SVG</button>
        <button id="export-png">PNG</button>
        <button id="export-cancel">Annulla</button>
      </div>
    </div>
  `,e.querySelector("#export-svg").addEventListener("click",()=>{T(o),e.remove()}),e.querySelector("#export-png").addEventListener("click",()=>{O(o),e.remove()}),e.querySelector("#export-cancel").addEventListener("click",()=>{e.remove()}),e.addEventListener("click",n=>{n.target===e&&e.remove()}),document.body.appendChild(e)}function B(o,e){function n(r){const{rows:t,cols:a,diamondStrokeWidth:c,circleStrokeWidth:s,strokeColor:i,fillColor:l}=r.settings;o.innerHTML=`
      <div class="toolbar-group">
        <label>Righe</label>
        <button data-action="dec-rows">−</button>
        <span>${t}</span>
        <button data-action="inc-rows">+</button>
      </div>
      <div class="toolbar-group">
        <label>Colonne</label>
        <button data-action="dec-cols">−</button>
        <span>${a}</span>
        <button data-action="inc-cols">+</button>
      </div>
      <div class="toolbar-group">
        <label>Tratto rombo</label>
        <input type="number" data-prop="diamondStrokeWidth" value="${c}" min="0" max="20" step="0.5" />
      </div>
      <div class="toolbar-group">
        <label>Tratto cerchio</label>
        <input type="number" data-prop="circleStrokeWidth" value="${s}" min="0" max="20" step="0.5" />
      </div>
      <div class="toolbar-group">
        <label>Colore tratto</label>
        <input type="color" data-prop="strokeColor" value="${i}" />
      </div>
      <div class="toolbar-group">
        <label>Fill</label>
        <input type="color" data-prop="fillColor" value="${l!=="none"?l:"#ffffff"}" />
      </div>
      <div style="margin-left:auto">
        <button class="primary" id="export-btn">Esporta</button>
      </div>
    `,H(o,e)}return n(m(e)),S(e,r=>n(r))}function H(o,e){var n,r,t,a,c;(n=o.querySelector('[data-action="dec-rows"]'))==null||n.addEventListener("click",()=>x(e,-1,0)),(r=o.querySelector('[data-action="inc-rows"]'))==null||r.addEventListener("click",()=>x(e,1,0)),(t=o.querySelector('[data-action="dec-cols"]'))==null||t.addEventListener("click",()=>x(e,0,-1)),(a=o.querySelector('[data-action="inc-cols"]'))==null||a.addEventListener("click",()=>x(e,0,1)),o.querySelectorAll('input[type="number"]').forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.prop,l=parseFloat(s.value);g(e,{settings:{...m(e).settings,[i]:l}})})}),o.querySelectorAll('input[type="color"]').forEach(s=>{s.addEventListener("input",()=>{const i=s.dataset.prop,l=s.value,u=i==="fillColor"&&l==="#ffffff"?"none":l;g(e,{settings:{...m(e).settings,[i]:u}})})}),(c=o.querySelector("#export-btn"))==null||c.addEventListener("click",()=>{const s=document.querySelector(".canvas-container svg");s&&P(s)})}function x(o,e,n){const r=m(o),t=Math.max(1,r.settings.rows+e),a=Math.max(1,r.settings.cols+n),c=[];for(let s=0;s<t;s++)for(let i=0;i<a;i++){const l=r.rects.find(u=>u.row===s&&u.col===i);c.push(l||{id:`rect-${s}-${i}`,row:s,col:i,x:i*120,y:s*120,width:100,height:100,scale:1,scale:1,rotation:0,type:(s+i)%2===0?"diamond":"circle"})}g(o,{settings:{...r.settings,rows:t,cols:a},rects:c})}function W(o,e,n,r,t){const a=o+n/2,c=e+r/2,s=(1-t)*n/2,i=(1-t)*r/2;return[{x:a,y:e+i},{x:o+n-s,y:c},{x:a,y:e+r-i},{x:o+s,y:c}]}function N(o,e,n){return Math.min(o,e)/2*n}function U(o,e,n){const{id:r,x:t,y:a,width:c,height:s,scale:i,rotation:l,type:u}=o,{strokeColor:v,fillColor:h,diamondStrokeWidth:f,circleStrokeWidth:p}=e,y=u==="diamond"?f:p,b=n?' class="selected"':"",E=t+c/2,k=a+s/2,M=l?` transform="rotate(${l}, ${E}, ${k})"`:"";let w="";if(u==="diamond")w=`  <polygon points="${W(t,a,c,s,i).map(A=>`${A.x},${A.y}`).join(" ")}" fill="${h}" stroke="${v}" stroke-width="${y}"${M}${b} />`;else{const $=N(c,s,i);w=`  <circle cx="${E}" cy="${k}" r="${$>0?$:0}" fill="${h}" stroke="${v}" stroke-width="${y}"${M}${b} />`}return`  <g data-rect-id="${r}">
${w}
  </g>`}function X(o,e,n){const r=Math.min(...o.map(i=>i.x)),t=Math.min(...o.map(i=>i.y)),a=Math.max(...o.map(i=>i.x+i.width)),c=Math.max(...o.map(i=>i.y+i.height)),s=o.map(i=>U(i,e,i.id===n));return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${r-10} ${t-10} ${a-r+20} ${c-t+20}">
${s.join(`
`)}
</svg>`}const d=8;function j(o,e){const{x:n,y:r,width:t,height:a}=e,c=[{id:"nw",x:n-d/2,y:r-d/2},{id:"n",x:n+t/2-d/2,y:r-d/2},{id:"ne",x:n+t-d/2,y:r-d/2},{id:"e",x:n+t-d/2,y:r+a/2-d/2},{id:"se",x:n+t-d/2,y:r+a-d/2},{id:"s",x:n+t/2-d/2,y:r+a-d/2},{id:"sw",x:n-d/2,y:r+a-d/2},{id:"w",x:n-d/2,y:r+a/2-d/2}],s=document.createDocumentFragment();for(const i of c){const l=document.createElementNS(o,"rect");l.setAttribute("x",i.x),l.setAttribute("y",i.y),l.setAttribute("width",d),l.setAttribute("height",d),l.setAttribute("fill","#fff"),l.setAttribute("stroke","#3b82f6"),l.setAttribute("stroke-width","1.5"),l.setAttribute("data-handle",i.id),l.style.cursor=`${i.id}-resize`,s.appendChild(l)}return s}function F(o,e,n){let r=null,t=null,a=null;o.addEventListener("mousedown",c=>{const s=c.target.closest("[data-handle]");if(!s)return;c.preventDefault();const i=m(e),l=i.rects.find(u=>u.id===i.selectedId);l&&(r=s.getAttribute("data-handle"),t={...l},a={x:c.clientX,y:c.clientY},n&&n(!0))}),window.addEventListener("mousemove",c=>{if(!r||!t||!a)return;const s=c.clientX-a.x,i=c.clientY-a.y,l=m(e);let{x:u,y:v,width:h,height:f}=t;const p=20;switch(r){case"e":h=Math.max(p,t.width+s);break;case"w":h=Math.max(p,t.width-s),u=t.x+t.width-h;break;case"s":f=Math.max(p,t.height+i);break;case"n":f=Math.max(p,t.height-i),v=t.y+t.height-f;break;case"ne":h=Math.max(p,t.width+s),f=Math.max(p,t.height-i),v=t.y+t.height-f;break;case"nw":h=Math.max(p,t.width-s),u=t.x+t.width-h,f=Math.max(p,t.height-i),v=t.y+t.height-f;break;case"se":h=Math.max(p,t.width+s),f=Math.max(p,t.height+i);break;case"sw":h=Math.max(p,t.width-s),u=t.x+t.width-h,f=Math.max(p,t.height+i);break}const y=l.rects.map(b=>b.id===t.id?{...b,x:u,y:v,width:h,height:f}:b);g(e,{rects:y})}),window.addEventListener("mouseup",()=>{r&&n&&n(!1),r=null,t=null,a=null})}let R=!1;function Y(o,e){const n=document.createElement("div");n.className="canvas-container",o.appendChild(n);function r(){if(R)return;const a=m(e),c=X(a.rects,a.settings,a.selectedId);n.innerHTML=c;const s=n.querySelector("svg");if(!s)return;D(s,e);const i=a.rects.find(l=>l.id===a.selectedId);if(i){const u=j("http://www.w3.org/2000/svg",i);s.appendChild(u)}F(s,e,l=>{R=l,l||r()})}r();const t=S(e,r);return{element:n,destroy:t}}function D(o,e){if(!o)return;const n=o.querySelectorAll("[data-rect-id]");for(const r of n)r.style.cursor="pointer",r.addEventListener("click",t=>{t.stopPropagation();const a=r.getAttribute("data-rect-id"),s=m(e).rects.find(i=>i.id===a);s&&g(e,{selectedId:s.id})})}function G(o,e){function n(r){const t=r.rects.find(a=>a.id===r.selectedId);if(!t){o.innerHTML='<h3>Proprietà</h3><p style="color:var(--text-muted);font-size:13px">Seleziona un rettangolo</p>';return}o.innerHTML=`
      <h3>Rettangolo ${t.row},${t.col} — ${t.type}</h3>
      <div class="field">
        <label>X</label>
        <input type="number" data-prop="x" value="${t.x}" />
      </div>
      <div class="field">
        <label>Y</label>
        <input type="number" data-prop="y" value="${t.y}" />
      </div>
      <div class="field">
        <label>Larghezza</label>
        <input type="number" data-prop="width" value="${t.width}" min="20" />
      </div>
      <div class="field">
        <label>Altezza</label>
        <input type="number" data-prop="height" value="${t.height}" min="20" />
      </div>
      <div class="field">
        <label>Scala: ${t.scale}</label>
        <input type="range" data-prop="scale" value="${t.scale}" min="0.1" max="1" step="0.05" />
      </div>
      <div class="field">
        <label>Rotazione: ${t.rotation}°</label>
        <input type="range" data-prop="rotation" value="${t.rotation}" min="0" max="360" step="1" />
      </div>
    `,K(o,e)}return n(m(e)),S(e,n)}function K(o,e){o.querySelectorAll('input[type="number"]').forEach(n=>{n.addEventListener("change",()=>{const r=n.dataset.prop,t=parseFloat(n.value),a=m(e),c=a.rects.map(s=>s.id===a.selectedId?{...s,[r]:t}:s);g(e,{rects:c})})}),o.querySelectorAll('input[type="range"]').forEach(n=>{n.addEventListener("input",()=>{const r=n.dataset.prop,t=parseFloat(n.value),a=m(e),c=a.rects.map(s=>s.id===a.selectedId?{...s,[r]:t}:s);g(e,{rects:c})})})}const V=document.getElementById("app"),L=I();V.innerHTML=`
  <div class="toolbar" id="toolbar"></div>
  <div class="main-area">
    <div id="canvas-slot"></div>
    <div class="property-panel" id="property-panel"></div>
  </div>
`;B(document.getElementById("toolbar"),L);Y(document.getElementById("canvas-slot"),L);G(document.getElementById("property-panel"),L);
