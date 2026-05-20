(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();function C(r,e){const o=[];for(let n=0;n<r;n++)for(let t=0;t<e;t++)o.push({id:`rect-${n}-${t}`,row:n,col:t,x:t*120,y:n*120,width:100,height:100,scale:1,rotation:0,type:(n+t)%2===0?"diamond":"circle"});return o}function I(){return{rows:8,cols:8,diamondStrokeWidth:2,circleStrokeWidth:2,strokeColor:"#000000",fillColor:"none"}}function z(r){const e={...I(),...r==null?void 0:r.settings},o=e.rows,n=e.cols;return{state:{settings:e,rects:C(o,n),selectedId:null},listeners:new Set}}function m(r){return r.state}function y(r,e){Object.assign(r.state,e);for(const o of r.listeners)try{o(r.state)}catch(n){console.error(n)}}function $(r,e){return r.listeners.add(e),()=>r.listeners.delete(e)}function T(r){const e=r.cloneNode(!0);e.getAttribute("xmlns")||e.setAttribute("xmlns","http://www.w3.org/2000/svg");const n=new XMLSerializer().serializeToString(e),t=new Blob([n],{type:"image/svg+xml"});R(t,"pattern.svg")}function q(r,e=2){const o=new XMLSerializer().serializeToString(r),n=new Blob([o],{type:"image/svg+xml;charset=utf-8"}),t=URL.createObjectURL(n),s=new Image;s.onload=()=>{const c=document.createElement("canvas");c.width=s.naturalWidth*e,c.height=s.naturalHeight*e;const i=c.getContext("2d");i.scale(e,e),i.drawImage(s,0,0),c.toBlob(a=>{R(a,"pattern.png"),URL.revokeObjectURL(t)},"image/png")},s.src=t}function R(r,e){const o=document.createElement("a");o.href=URL.createObjectURL(r),o.download=e,o.click(),URL.revokeObjectURL(o.href)}function O(r){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
    <div class="modal">
      <h2>Esporta pattern</h2>
      <p style="margin-bottom:12px;color:var(--text-muted);font-size:13px">Scegli il formato:</p>
      <div class="modal-actions">
        <button id="export-svg">SVG</button>
        <button id="export-png">PNG</button>
        <button id="export-cancel">Annulla</button>
      </div>
    </div>
  `,e.querySelector("#export-svg").addEventListener("click",()=>{T(r),e.remove()}),e.querySelector("#export-png").addEventListener("click",()=>{q(r),e.remove()}),e.querySelector("#export-cancel").addEventListener("click",()=>{e.remove()}),e.addEventListener("click",o=>{o.target===e&&e.remove()}),document.body.appendChild(e)}function P(r,e){function o(n){const{diamondStrokeWidth:t,circleStrokeWidth:s,strokeColor:c,fillColor:i}=n.settings;r.innerHTML=`
      <div class="toolbar-group">
        <label>Tratto rombo: ${t}</label>
        <input type="range" data-prop="diamondStrokeWidth" value="${t}" min="0" max="20" step="0.5" />
      </div>
      <div class="toolbar-group">
        <label>Tratto cerchio: ${s}</label>
        <input type="range" data-prop="circleStrokeWidth" value="${s}" min="0" max="20" step="0.5" />
      </div>
      <div class="toolbar-group">
        <label>Colore tratto</label>
        <input type="color" data-prop="strokeColor" value="${c}" />
      </div>
      <div class="toolbar-group">
        <label>Fill</label>
        <input type="color" data-prop="fillColor" value="${i!=="none"?i:"#ffffff"}" />
      </div>
      <div style="margin-left:auto">
        <button class="primary" id="export-btn">Esporta</button>
      </div>
    `,B(r,e)}return o(m(e)),$(e,n=>o(n))}function B(r,e){var o;r.querySelectorAll('input[type="range"]').forEach(n=>{n.addEventListener("input",()=>{const t=n.dataset.prop,s=parseFloat(n.value);y(e,{settings:{...m(e).settings,[t]:s}})})}),r.querySelectorAll('input[type="color"]').forEach(n=>{n.addEventListener("input",()=>{const t=n.dataset.prop,s=n.value,c=t==="fillColor"&&s==="#ffffff"?"none":s;y(e,{settings:{...m(e).settings,[t]:c}})})}),(o=r.querySelector("#export-btn"))==null||o.addEventListener("click",()=>{const n=document.querySelector(".canvas-container svg");n&&O(n)})}function H(r,e,o,n,t){const s=r+o/2,c=e+n/2,i=(1-t)*o/2,a=(1-t)*n/2;return[{x:s,y:e+a},{x:r+o-i,y:c},{x:s,y:e+n-a},{x:r+i,y:c}]}function W(r,e,o){return Math.min(r,e)/2*o}function N(r,e,o){const{id:n,x:t,y:s,width:c,height:i,scale:a,rotation:l,type:h}=r,{strokeColor:g,fillColor:p,diamondStrokeWidth:f,circleStrokeWidth:u}=e,b=h==="diamond"?f:u,v=o?' class="selected"':"",L=t+c/2,k=s+i/2,E=l?` transform="rotate(${l||0}, ${L}, ${k})"`:"";let x="";if(h==="diamond")x=`  <polygon points="${H(t,s,c,i,a).map(M=>`${M.x},${M.y}`).join(" ")}" fill="${p}" stroke="${g}" stroke-width="${b}"${E}${v} />`;else{const w=W(c,i,a);x=`  <circle cx="${L}" cy="${k}" r="${w>0?w:0}" fill="${p}" stroke="${g}" stroke-width="${b}"${E}${v} />`}return`  <g data-rect-id="${n}">
${x}
  </g>`}function U(r,e,o){const n=Math.min(...r.map(a=>a.x)),t=Math.min(...r.map(a=>a.y)),s=Math.max(...r.map(a=>a.x+a.width)),c=Math.max(...r.map(a=>a.y+a.height)),i=r.map(a=>N(a,e,a.id===o));return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${n-10} ${t-10} ${s-n+20} ${c-t+20}">
${i.join(`
`)}
</svg>`}const d=8;function j(r,e){const{x:o,y:n,width:t,height:s}=e,c=[{id:"nw",x:o-d/2,y:n-d/2},{id:"n",x:o+t/2-d/2,y:n-d/2},{id:"ne",x:o+t-d/2,y:n-d/2},{id:"e",x:o+t-d/2,y:n+s/2-d/2},{id:"se",x:o+t-d/2,y:n+s-d/2},{id:"s",x:o+t/2-d/2,y:n+s-d/2},{id:"sw",x:o-d/2,y:n+s-d/2},{id:"w",x:o-d/2,y:n+s/2-d/2}],i=document.createDocumentFragment();for(const a of c){const l=document.createElementNS(r,"rect");l.setAttribute("x",a.x),l.setAttribute("y",a.y),l.setAttribute("width",d),l.setAttribute("height",d),l.setAttribute("fill","#fff"),l.setAttribute("stroke","#3b82f6"),l.setAttribute("stroke-width","1.5"),l.setAttribute("data-handle",a.id),l.style.cursor=`${a.id}-resize`,i.appendChild(l)}return i}function X(r,e,o){let n=null,t=null,s=null;r.addEventListener("mousedown",c=>{const i=c.target.closest("[data-handle]");if(!i)return;c.preventDefault();const a=m(e),l=a.rects.find(h=>h.id===a.selectedId);l&&(n=i.getAttribute("data-handle"),t={...l},s={x:c.clientX,y:c.clientY},o&&o(!0))}),window.addEventListener("mousemove",c=>{if(!n||!t||!s)return;const i=c.clientX-s.x,a=c.clientY-s.y,l=m(e);let{x:h,y:g,width:p,height:f}=t;const u=20;switch(n){case"e":p=Math.max(u,t.width+i);break;case"w":p=Math.max(u,t.width-i),h=t.x+t.width-p;break;case"s":f=Math.max(u,t.height+a);break;case"n":f=Math.max(u,t.height-a),g=t.y+t.height-f;break;case"ne":p=Math.max(u,t.width+i),f=Math.max(u,t.height-a),g=t.y+t.height-f;break;case"nw":p=Math.max(u,t.width-i),h=t.x+t.width-p,f=Math.max(u,t.height-a),g=t.y+t.height-f;break;case"se":p=Math.max(u,t.width+i),f=Math.max(u,t.height+a);break;case"sw":p=Math.max(u,t.width-i),h=t.x+t.width-p,f=Math.max(u,t.height+a);break}const b=l.rects.map(v=>v.id===t.id?{...v,x:h,y:g,width:p,height:f}:v);y(e,{rects:b})}),window.addEventListener("mouseup",()=>{n&&o&&o(!1),n=null,t=null,s=null})}let A=!1;function F(r,e){const o=document.createElement("div");o.className="canvas-container",r.appendChild(o);function n(){if(A)return;const s=m(e),c=U(s.rects,s.settings,s.selectedId);o.innerHTML=c;const i=o.querySelector("svg");if(!i)return;i.setAttribute("width","100%"),i.setAttribute("height","100%"),Y(i,e);const a=s.rects.find(l=>l.id===s.selectedId);if(a){const h=j("http://www.w3.org/2000/svg",a);i.appendChild(h)}X(i,e,l=>{A=l,l||n()})}n();const t=$(e,n);return{element:o,destroy:t}}function Y(r,e){if(!r)return;const o=r.querySelectorAll("[data-rect-id]");for(const n of o)n.style.cursor="pointer",n.addEventListener("click",t=>{t.stopPropagation();const s=n.getAttribute("data-rect-id"),i=m(e).rects.find(a=>a.id===s);i&&y(e,{selectedId:i.id})})}function D(r,e){function o(n){const t=n.rects.find(s=>s.id===n.selectedId);if(!t){r.innerHTML='<h3>Proprietà</h3><p style="color:var(--text-muted);font-size:13px">Seleziona un rettangolo</p>';return}r.innerHTML=`
      <h3>Rettangolo ${t.row},${t.col} — ${t.type}</h3>
      <div class="field">
        <label>Scala: ${t.scale}</label>
        <input type="range" data-prop="scale" value="${t.scale}" min="0.1" max="1" step="0.05" />
      </div>
      <div class="field">
        <label>Rotazione: ${t.rotation}°</label>
        <input type="range" data-prop="rotation" value="${t.rotation}" min="0" max="360" step="1" />
      </div>
    `,G(r,e)}return o(m(e)),$(e,o)}function G(r,e){r.querySelectorAll('input[type="range"]').forEach(o=>{o.addEventListener("input",()=>{const n=o.dataset.prop,t=parseFloat(o.value),s=m(e),c=s.rects.map(i=>i.id===s.selectedId?{...i,[n]:t}:i);y(e,{rects:c})})})}const K=document.getElementById("app"),S=z();K.innerHTML=`
  <div class="toolbar" id="toolbar"></div>
  <div class="main-area">
    <div id="canvas-slot"></div>
    <div class="property-panel" id="property-panel"></div>
  </div>
`;P(document.getElementById("toolbar"),S);F(document.getElementById("canvas-slot"),S);D(document.getElementById("property-panel"),S);
