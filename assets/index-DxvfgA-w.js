(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function r(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(t){if(t.ep)return;t.ep=!0;const i=r(t);fetch(t.href,i)}})();function A(n,e){const r=[];for(let o=0;o<n;o++)for(let t=0;t<e;t++)r.push({id:`rect-${o}-${t}`,row:o,col:t,x:t*120,y:o*120,width:100,height:100,scale:1,type:(o+t)%2===0?"diamond":"circle"});return r}function C(){return{rows:3,cols:3,diamondStrokeWidth:2,circleStrokeWidth:2,strokeColor:"#000000",fillColor:"none"}}function R(n){const e={...C(),...n==null?void 0:n.settings},r=e.rows,o=e.cols;return{state:{settings:e,rects:A(r,o),selectedId:null},listeners:new Set}}function m(n){return n.state}function b(n,e){Object.assign(n.state,e);for(const r of n.listeners)try{r(n.state)}catch(o){console.error(o)}}function $(n,e){return n.listeners.add(e),()=>n.listeners.delete(e)}function z(n){const e=n.cloneNode(!0);e.getAttribute("xmlns")||e.setAttribute("xmlns","http://www.w3.org/2000/svg");const o=new XMLSerializer().serializeToString(e),t=new Blob([o],{type:"image/svg+xml"});M(t,"pattern.svg")}function q(n,e=2){const r=new XMLSerializer().serializeToString(n),o=new Blob([r],{type:"image/svg+xml;charset=utf-8"}),t=URL.createObjectURL(o),i=new Image;i.onload=()=>{const c=document.createElement("canvas");c.width=i.naturalWidth*e,c.height=i.naturalHeight*e;const s=c.getContext("2d");s.scale(e,e),s.drawImage(i,0,0),c.toBlob(a=>{M(a,"pattern.png"),URL.revokeObjectURL(t)},"image/png")},i.src=t}function M(n,e){const r=document.createElement("a");r.href=URL.createObjectURL(n),r.download=e,r.click(),URL.revokeObjectURL(r.href)}function I(n){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
    <div class="modal">
      <h2>Esporta pattern</h2>
      <p style="margin-bottom:12px;color:var(--text-muted);font-size:13px">Scegli il formato:</p>
      <div class="modal-actions">
        <button id="export-svg">SVG</button>
        <button id="export-png">PNG</button>
        <button id="export-cancel">Annulla</button>
      </div>
    </div>
  `,e.querySelector("#export-svg").addEventListener("click",()=>{z(n),e.remove()}),e.querySelector("#export-png").addEventListener("click",()=>{q(n),e.remove()}),e.querySelector("#export-cancel").addEventListener("click",()=>{e.remove()}),e.addEventListener("click",r=>{r.target===e&&e.remove()}),document.body.appendChild(e)}function T(n,e){function r(o){const{rows:t,cols:i,diamondStrokeWidth:c,circleStrokeWidth:s,strokeColor:a,fillColor:l}=o.settings;n.innerHTML=`
      <div class="toolbar-group">
        <label>Righe</label>
        <button data-action="dec-rows">−</button>
        <span>${t}</span>
        <button data-action="inc-rows">+</button>
      </div>
      <div class="toolbar-group">
        <label>Colonne</label>
        <button data-action="dec-cols">−</button>
        <span>${i}</span>
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
        <input type="color" data-prop="strokeColor" value="${a}" />
      </div>
      <div class="toolbar-group">
        <label>Fill</label>
        <input type="color" data-prop="fillColor" value="${l!=="none"?l:"#ffffff"}" />
      </div>
      <div style="margin-left:auto">
        <button class="primary" id="export-btn">Esporta</button>
      </div>
    `,O(n,e)}return r(m(e)),$(e,o=>r(o))}function O(n,e){var r,o,t,i,c;(r=n.querySelector('[data-action="dec-rows"]'))==null||r.addEventListener("click",()=>w(e,-1,0)),(o=n.querySelector('[data-action="inc-rows"]'))==null||o.addEventListener("click",()=>w(e,1,0)),(t=n.querySelector('[data-action="dec-cols"]'))==null||t.addEventListener("click",()=>w(e,0,-1)),(i=n.querySelector('[data-action="inc-cols"]'))==null||i.addEventListener("click",()=>w(e,0,1)),n.querySelectorAll('input[type="number"]').forEach(s=>{s.addEventListener("change",()=>{const a=s.dataset.prop,l=parseFloat(s.value);b(e,{settings:{...m(e).settings,[a]:l}})})}),n.querySelectorAll('input[type="color"]').forEach(s=>{s.addEventListener("input",()=>{const a=s.dataset.prop,l=s.value,u=a==="fillColor"&&l==="#ffffff"?"none":l;b(e,{settings:{...m(e).settings,[a]:u}})})}),(c=n.querySelector("#export-btn"))==null||c.addEventListener("click",()=>{const s=document.querySelector(".canvas-container svg");s&&I(s)})}function w(n,e,r){const o=m(n),t=Math.max(1,o.settings.rows+e),i=Math.max(1,o.settings.cols+r),c=[];for(let s=0;s<t;s++)for(let a=0;a<i;a++){const l=o.rects.find(u=>u.row===s&&u.col===a);c.push(l||{id:`rect-${s}-${a}`,row:s,col:a,x:a*120,y:s*120,width:100,height:100,scale:1,type:(s+a)%2===0?"diamond":"circle"})}b(n,{settings:{...o.settings,rows:t,cols:i},rects:c})}function P(n,e,r,o,t){const i=n+r/2,c=e+o/2,s=(1-t)*r/2,a=(1-t)*o/2;return[{x:i,y:e+a},{x:n+r-s,y:c},{x:i,y:e+o-a},{x:n+s,y:c}]}function B(n,e,r){return Math.min(n,e)/2*r}function H(n,e,r,o){return{cx:n+r/2,cy:e+o/2}}function W(n,e,r){const{id:o,x:t,y:i,width:c,height:s,scale:a,type:l}=n,{strokeColor:u,fillColor:v,diamondStrokeWidth:h,circleStrokeWidth:f}=e,p=l==="diamond"?h:f,x=r?' class="selected"':"";let g="";if(l==="diamond")g=`  <polygon points="${P(t,i,c,s,a).map(y=>`${y.x},${y.y}`).join(" ")}" fill="${v}" stroke="${u}" stroke-width="${p}"${x} />`;else{const{cx:L,cy:k}=H(t,i,c,s),y=B(c,s,a);g=`  <circle cx="${L}" cy="${k}" r="${y>0?y:0}" fill="${v}" stroke="${u}" stroke-width="${p}"${x} />`}return`  <g data-rect-id="${o}">
${g}
  </g>`}function N(n,e,r){const o=Math.min(...n.map(a=>a.x)),t=Math.min(...n.map(a=>a.y)),i=Math.max(...n.map(a=>a.x+a.width)),c=Math.max(...n.map(a=>a.y+a.height)),s=n.map(a=>W(a,e,a.id===r));return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${o-10} ${t-10} ${i-o+20} ${c-t+20}">
${s.join(`
`)}
</svg>`}const d=8;function U(n,e){const{x:r,y:o,width:t,height:i}=e,c=[{id:"nw",x:r-d/2,y:o-d/2},{id:"n",x:r+t/2-d/2,y:o-d/2},{id:"ne",x:r+t-d/2,y:o-d/2},{id:"e",x:r+t-d/2,y:o+i/2-d/2},{id:"se",x:r+t-d/2,y:o+i-d/2},{id:"s",x:r+t/2-d/2,y:o+i-d/2},{id:"sw",x:r-d/2,y:o+i-d/2},{id:"w",x:r-d/2,y:o+i/2-d/2}],s=document.createDocumentFragment();for(const a of c){const l=document.createElementNS(n,"rect");l.setAttribute("x",a.x),l.setAttribute("y",a.y),l.setAttribute("width",d),l.setAttribute("height",d),l.setAttribute("fill","#fff"),l.setAttribute("stroke","#3b82f6"),l.setAttribute("stroke-width","1.5"),l.setAttribute("data-handle",a.id),l.style.cursor=`${a.id}-resize`,s.appendChild(l)}return s}function X(n,e,r){let o=null,t=null,i=null;n.addEventListener("mousedown",c=>{const s=c.target.closest("[data-handle]");if(!s)return;c.preventDefault();const a=m(e),l=a.rects.find(u=>u.id===a.selectedId);l&&(o=s.getAttribute("data-handle"),t={...l},i={x:c.clientX,y:c.clientY},r&&r(!0))}),window.addEventListener("mousemove",c=>{if(!o||!t||!i)return;const s=c.clientX-i.x,a=c.clientY-i.y,l=m(e);let{x:u,y:v,width:h,height:f}=t;const p=20;switch(o){case"e":h=Math.max(p,t.width+s);break;case"w":h=Math.max(p,t.width-s),u=t.x+t.width-h;break;case"s":f=Math.max(p,t.height+a);break;case"n":f=Math.max(p,t.height-a),v=t.y+t.height-f;break;case"ne":h=Math.max(p,t.width+s),f=Math.max(p,t.height-a),v=t.y+t.height-f;break;case"nw":h=Math.max(p,t.width-s),u=t.x+t.width-h,f=Math.max(p,t.height-a),v=t.y+t.height-f;break;case"se":h=Math.max(p,t.width+s),f=Math.max(p,t.height+a);break;case"sw":h=Math.max(p,t.width-s),u=t.x+t.width-h,f=Math.max(p,t.height+a);break}const x=l.rects.map(g=>g.id===t.id?{...g,x:u,y:v,width:h,height:f}:g);b(e,{rects:x})}),window.addEventListener("mouseup",()=>{o&&r&&r(!1),o=null,t=null,i=null})}let E=!1;function j(n,e){const r=document.createElement("div");r.className="canvas-container",n.appendChild(r);function o(){if(E)return;const i=m(e),c=N(i.rects,i.settings,i.selectedId);r.innerHTML=c;const s=r.querySelector("svg");if(!s)return;Y(s,e);const a=i.rects.find(l=>l.id===i.selectedId);if(a){const u=U("http://www.w3.org/2000/svg",a);s.appendChild(u)}X(s,e,l=>{E=l,l||o()})}o();const t=$(e,o);return{element:r,destroy:t}}function Y(n,e){if(!n)return;const r=n.querySelectorAll("[data-rect-id]");for(const o of r)o.style.cursor="pointer",o.addEventListener("click",t=>{t.stopPropagation();const i=o.getAttribute("data-rect-id"),s=m(e).rects.find(a=>a.id===i);s&&b(e,{selectedId:s.id})})}function F(n,e){function r(o){const t=o.rects.find(i=>i.id===o.selectedId);if(!t){n.innerHTML='<h3>Proprietà</h3><p style="color:var(--text-muted);font-size:13px">Seleziona un rettangolo</p>';return}n.innerHTML=`
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
        <label>Scala (0.1 – 1.0)</label>
        <input type="number" data-prop="scale" value="${t.scale}" min="0.1" max="1" step="0.05" />
      </div>
    `,D(n,e)}return r(m(e)),$(e,r)}function D(n,e){n.querySelectorAll("input").forEach(r=>{r.addEventListener("change",()=>{const o=r.dataset.prop,t=parseFloat(r.value),i=m(e),c=i.rects.map(s=>s.id===i.selectedId?{...s,[o]:t}:s);b(e,{rects:c})})})}const G=document.getElementById("app"),S=R();G.innerHTML=`
  <div class="toolbar" id="toolbar"></div>
  <div class="main-area">
    <div id="canvas-slot"></div>
    <div class="property-panel" id="property-panel"></div>
  </div>
`;T(document.getElementById("toolbar"),S);j(document.getElementById("canvas-slot"),S);F(document.getElementById("property-panel"),S);
