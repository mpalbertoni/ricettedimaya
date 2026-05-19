(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();function q(n,e){const r=[];for(let o=0;o<n;o++)for(let t=0;t<e;t++)r.push({id:`rect-${o}-${t}`,row:o,col:t,x:t*120,y:o*120,width:100,height:100,scale:1,rotation:0,type:(o+t)%2===0?"diamond":"circle"});return r}function I(){return{rows:3,cols:3,diamondStrokeWidth:2,circleStrokeWidth:2,strokeColor:"#000000",fillColor:"none"}}function z(n){const e={...I(),...n==null?void 0:n.settings},r=e.rows,o=e.cols;return{state:{settings:e,rects:q(r,o),selectedId:null},listeners:new Set}}function m(n){return n.state}function y(n,e){Object.assign(n.state,e);for(const r of n.listeners)try{r(n.state)}catch(o){console.error(o)}}function S(n,e){return n.listeners.add(e),()=>n.listeners.delete(e)}function T(n){const e=n.cloneNode(!0);e.getAttribute("xmlns")||e.setAttribute("xmlns","http://www.w3.org/2000/svg");const o=new XMLSerializer().serializeToString(e),t=new Blob([o],{type:"image/svg+xml"});C(t,"pattern.svg")}function O(n,e=2){const r=new XMLSerializer().serializeToString(n),o=new Blob([r],{type:"image/svg+xml;charset=utf-8"}),t=URL.createObjectURL(o),s=new Image;s.onload=()=>{const c=document.createElement("canvas");c.width=s.naturalWidth*e,c.height=s.naturalHeight*e;const i=c.getContext("2d");i.scale(e,e),i.drawImage(s,0,0),c.toBlob(a=>{C(a,"pattern.png"),URL.revokeObjectURL(t)},"image/png")},s.src=t}function C(n,e){const r=document.createElement("a");r.href=URL.createObjectURL(n),r.download=e,r.click(),URL.revokeObjectURL(r.href)}function P(n){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
    <div class="modal">
      <h2>Esporta pattern</h2>
      <p style="margin-bottom:12px;color:var(--text-muted);font-size:13px">Scegli il formato:</p>
      <div class="modal-actions">
        <button id="export-svg">SVG</button>
        <button id="export-png">PNG</button>
        <button id="export-cancel">Annulla</button>
      </div>
    </div>
  `,e.querySelector("#export-svg").addEventListener("click",()=>{T(n),e.remove()}),e.querySelector("#export-png").addEventListener("click",()=>{O(n),e.remove()}),e.querySelector("#export-cancel").addEventListener("click",()=>{e.remove()}),e.addEventListener("click",r=>{r.target===e&&e.remove()}),document.body.appendChild(e)}function B(n,e){function r(o){const{rows:t,cols:s,diamondStrokeWidth:c,circleStrokeWidth:i,strokeColor:a,fillColor:l}=o.settings;n.innerHTML=`
      <div class="toolbar-group">
        <label>Righe</label>
        <button data-action="dec-rows">−</button>
        <span>${t}</span>
        <button data-action="inc-rows">+</button>
      </div>
      <div class="toolbar-group">
        <label>Colonne</label>
        <button data-action="dec-cols">−</button>
        <span>${s}</span>
        <button data-action="inc-cols">+</button>
      </div>
      <div class="toolbar-group">
        <label>Tratto rombo: ${c}</label>
        <input type="range" data-prop="diamondStrokeWidth" value="${c}" min="0" max="20" step="0.5" />
      </div>
      <div class="toolbar-group">
        <label>Tratto cerchio: ${i}</label>
        <input type="range" data-prop="circleStrokeWidth" value="${i}" min="0" max="20" step="0.5" />
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
    `,H(n,e)}return r(m(e)),S(e,o=>r(o))}function H(n,e){var r,o,t,s,c;(r=n.querySelector('[data-action="dec-rows"]'))==null||r.addEventListener("click",()=>x(e,-1,0)),(o=n.querySelector('[data-action="inc-rows"]'))==null||o.addEventListener("click",()=>x(e,1,0)),(t=n.querySelector('[data-action="dec-cols"]'))==null||t.addEventListener("click",()=>x(e,0,-1)),(s=n.querySelector('[data-action="inc-cols"]'))==null||s.addEventListener("click",()=>x(e,0,1)),n.querySelectorAll('input[type="range"]').forEach(i=>{i.addEventListener("input",()=>{const a=i.dataset.prop,l=parseFloat(i.value);y(e,{settings:{...m(e).settings,[a]:l}})})}),n.querySelectorAll('input[type="color"]').forEach(i=>{i.addEventListener("input",()=>{const a=i.dataset.prop,l=i.value,u=a==="fillColor"&&l==="#ffffff"?"none":l;y(e,{settings:{...m(e).settings,[a]:u}})})}),(c=n.querySelector("#export-btn"))==null||c.addEventListener("click",()=>{const i=document.querySelector(".canvas-container svg");i&&P(i)})}function x(n,e,r){const o=m(n),t=Math.max(1,o.settings.rows+e),s=Math.max(1,o.settings.cols+r),c=[];for(let i=0;i<t;i++)for(let a=0;a<s;a++){const l=o.rects.find(u=>u.row===i&&u.col===a);c.push(l||{id:`rect-${i}-${a}`,row:i,col:a,x:a*120,y:i*120,width:100,height:100,scale:1,rotation:0,type:(i+a)%2===0?"diamond":"circle"})}y(n,{settings:{...o.settings,rows:t,cols:s},rects:c})}function W(n,e,r,o,t){const s=n+r/2,c=e+o/2,i=(1-t)*r/2,a=(1-t)*o/2;return[{x:s,y:e+a},{x:n+r-i,y:c},{x:s,y:e+o-a},{x:n+i,y:c}]}function N(n,e,r){return Math.min(n,e)/2*r}function U(n,e,r){const{id:o,x:t,y:s,width:c,height:i,scale:a,rotation:l,type:u}=n,{strokeColor:g,fillColor:f,diamondStrokeWidth:h,circleStrokeWidth:p}=e,b=u==="diamond"?h:p,v=r?' class="selected"':"",k=t+c/2,E=s+i/2,M=l?` transform="rotate(${l||0}, ${k}, ${E})"`:"";let w="";if(u==="diamond")w=`  <polygon points="${W(t,s,c,i,a).map(A=>`${A.x},${A.y}`).join(" ")}" fill="${f}" stroke="${g}" stroke-width="${b}"${M}${v} />`;else{const $=N(c,i,a);w=`  <circle cx="${k}" cy="${E}" r="${$>0?$:0}" fill="${f}" stroke="${g}" stroke-width="${b}"${M}${v} />`}return`  <g data-rect-id="${o}">
${w}
  </g>`}function j(n,e,r){const o=Math.min(...n.map(a=>a.x)),t=Math.min(...n.map(a=>a.y)),s=Math.max(...n.map(a=>a.x+a.width)),c=Math.max(...n.map(a=>a.y+a.height)),i=n.map(a=>U(a,e,a.id===r));return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${o-10} ${t-10} ${s-o+20} ${c-t+20}">
${i.join(`
`)}
</svg>`}const d=8;function X(n,e){const{x:r,y:o,width:t,height:s}=e,c=[{id:"nw",x:r-d/2,y:o-d/2},{id:"n",x:r+t/2-d/2,y:o-d/2},{id:"ne",x:r+t-d/2,y:o-d/2},{id:"e",x:r+t-d/2,y:o+s/2-d/2},{id:"se",x:r+t-d/2,y:o+s-d/2},{id:"s",x:r+t/2-d/2,y:o+s-d/2},{id:"sw",x:r-d/2,y:o+s-d/2},{id:"w",x:r-d/2,y:o+s/2-d/2}],i=document.createDocumentFragment();for(const a of c){const l=document.createElementNS(n,"rect");l.setAttribute("x",a.x),l.setAttribute("y",a.y),l.setAttribute("width",d),l.setAttribute("height",d),l.setAttribute("fill","#fff"),l.setAttribute("stroke","#3b82f6"),l.setAttribute("stroke-width","1.5"),l.setAttribute("data-handle",a.id),l.style.cursor=`${a.id}-resize`,i.appendChild(l)}return i}function F(n,e,r){let o=null,t=null,s=null;n.addEventListener("mousedown",c=>{const i=c.target.closest("[data-handle]");if(!i)return;c.preventDefault();const a=m(e),l=a.rects.find(u=>u.id===a.selectedId);l&&(o=i.getAttribute("data-handle"),t={...l},s={x:c.clientX,y:c.clientY},r&&r(!0))}),window.addEventListener("mousemove",c=>{if(!o||!t||!s)return;const i=c.clientX-s.x,a=c.clientY-s.y,l=m(e);let{x:u,y:g,width:f,height:h}=t;const p=20;switch(o){case"e":f=Math.max(p,t.width+i);break;case"w":f=Math.max(p,t.width-i),u=t.x+t.width-f;break;case"s":h=Math.max(p,t.height+a);break;case"n":h=Math.max(p,t.height-a),g=t.y+t.height-h;break;case"ne":f=Math.max(p,t.width+i),h=Math.max(p,t.height-a),g=t.y+t.height-h;break;case"nw":f=Math.max(p,t.width-i),u=t.x+t.width-f,h=Math.max(p,t.height-a),g=t.y+t.height-h;break;case"se":f=Math.max(p,t.width+i),h=Math.max(p,t.height+a);break;case"sw":f=Math.max(p,t.width-i),u=t.x+t.width-f,h=Math.max(p,t.height+a);break}const b=l.rects.map(v=>v.id===t.id?{...v,x:u,y:g,width:f,height:h}:v);y(e,{rects:b})}),window.addEventListener("mouseup",()=>{o&&r&&r(!1),o=null,t=null,s=null})}let R=!1;function Y(n,e){const r=document.createElement("div");r.className="canvas-container",n.appendChild(r);function o(){if(R)return;const s=m(e),c=j(s.rects,s.settings,s.selectedId);r.innerHTML=c;const i=r.querySelector("svg");if(!i)return;D(i,e);const a=s.rects.find(l=>l.id===s.selectedId);if(a){const u=X("http://www.w3.org/2000/svg",a);i.appendChild(u)}F(i,e,l=>{R=l,l||o()})}o();const t=S(e,o);return{element:r,destroy:t}}function D(n,e){if(!n)return;const r=n.querySelectorAll("[data-rect-id]");for(const o of r)o.style.cursor="pointer",o.addEventListener("click",t=>{t.stopPropagation();const s=o.getAttribute("data-rect-id"),i=m(e).rects.find(a=>a.id===s);i&&y(e,{selectedId:i.id})})}function G(n,e){function r(o){const t=o.rects.find(s=>s.id===o.selectedId);if(!t){n.innerHTML='<h3>Proprietà</h3><p style="color:var(--text-muted);font-size:13px">Seleziona un rettangolo</p>';return}n.innerHTML=`
      <h3>Rettangolo ${t.row},${t.col} — ${t.type}</h3>
      <div class="field">
        <label>Scala: ${t.scale}</label>
        <input type="range" data-prop="scale" value="${t.scale}" min="0.1" max="1" step="0.05" />
      </div>
      <div class="field">
        <label>Rotazione: ${t.rotation}°</label>
        <input type="range" data-prop="rotation" value="${t.rotation}" min="0" max="360" step="1" />
      </div>
    `,K(n,e)}return r(m(e)),S(e,r)}function K(n,e){n.querySelectorAll('input[type="range"]').forEach(r=>{r.addEventListener("input",()=>{const o=r.dataset.prop,t=parseFloat(r.value),s=m(e),c=s.rects.map(i=>i.id===s.selectedId?{...i,[o]:t}:i);y(e,{rects:c})})})}const V=document.getElementById("app"),L=z();V.innerHTML=`
  <div class="toolbar" id="toolbar"></div>
  <div class="main-area">
    <div id="canvas-slot"></div>
    <div class="property-panel" id="property-panel"></div>
  </div>
`;B(document.getElementById("toolbar"),L);Y(document.getElementById("canvas-slot"),L);G(document.getElementById("property-panel"),L);
