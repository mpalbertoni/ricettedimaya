(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(t){if(t.ep)return;t.ep=!0;const i=n(t);fetch(t.href,i)}})();function C(r,e){const n=[];for(let o=0;o<r;o++)for(let t=0;t<e;t++)n.push({id:`rect-${o}-${t}`,row:o,col:t,x:t*120,y:o*120,width:100,height:100,type:(o+t)%2===0?"diamond":"circle"});return n}function I(){return{rows:8,cols:8,diamondStrokeWidth:2,circleStrokeWidth:2,strokeColor:"#000000",fillColor:"none",scale:1,rotation:0}}function q(r){const e={...I(),...r==null?void 0:r.settings},n=e.rows,o=e.cols;return{state:{settings:e,rects:C(n,o),selectedId:null},listeners:new Set}}function m(r){return r.state}function y(r,e){Object.assign(r.state,e);for(const n of r.listeners)try{n(r.state)}catch(o){console.error(o)}}function $(r,e){return r.listeners.add(e),()=>r.listeners.delete(e)}function z(r){const e=r.cloneNode(!0);e.getAttribute("xmlns")||e.setAttribute("xmlns","http://www.w3.org/2000/svg");const o=new XMLSerializer().serializeToString(e),t=new Blob([o],{type:"image/svg+xml"});R(t,"pattern.svg")}function O(r,e=2){const n=new XMLSerializer().serializeToString(r),o=new Blob([n],{type:"image/svg+xml;charset=utf-8"}),t=URL.createObjectURL(o),i=new Image;i.onload=()=>{const c=document.createElement("canvas");c.width=i.naturalWidth*e,c.height=i.naturalHeight*e;const a=c.getContext("2d");a.scale(e,e),a.drawImage(i,0,0),c.toBlob(s=>{R(s,"pattern.png"),URL.revokeObjectURL(t)},"image/png")},i.src=t}function R(r,e){const n=document.createElement("a");n.href=URL.createObjectURL(r),n.download=e,n.click(),URL.revokeObjectURL(n.href)}function T(r){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
    <div class="modal">
      <h2>Esporta pattern</h2>
      <p style="margin-bottom:12px;color:var(--text-muted);font-size:13px">Scegli il formato:</p>
      <div class="modal-actions">
        <button id="export-svg">SVG</button>
        <button id="export-png">PNG</button>
        <button id="export-cancel">Annulla</button>
      </div>
    </div>
  `,e.querySelector("#export-svg").addEventListener("click",()=>{z(r),e.remove()}),e.querySelector("#export-png").addEventListener("click",()=>{O(r),e.remove()}),e.querySelector("#export-cancel").addEventListener("click",()=>{e.remove()}),e.addEventListener("click",n=>{n.target===e&&e.remove()}),document.body.appendChild(e)}function B(r,e){function n(o){const{diamondStrokeWidth:t,circleStrokeWidth:i}=o.settings;r.innerHTML=`
      <div class="toolbar-group">
        <label>Tratto rombo: ${t}</label>
        <input type="range" data-prop="diamondStrokeWidth" value="${t}" min="0" max="20" step="0.5" />
      </div>
      <div class="toolbar-group">
        <label>Tratto cerchio: ${i}</label>
        <input type="range" data-prop="circleStrokeWidth" value="${i}" min="0" max="20" step="0.5" />
      </div>
      <div style="margin-left:auto">
        <button class="primary" id="export-btn">Esporta</button>
      </div>
    `,W(r,e)}return n(m(e)),$(e,o=>n(o))}function W(r,e){var n;r.querySelectorAll('input[type="range"]').forEach(o=>{o.addEventListener("input",()=>{const t=o.dataset.prop,i=parseFloat(o.value);y(e,{settings:{...m(e).settings,[t]:i}})})}),(n=r.querySelector("#export-btn"))==null||n.addEventListener("click",()=>{const o=document.querySelector(".canvas-container svg");o&&T(o)})}function H(r,e,n,o,t){const i=r+n/2,c=e+o/2,a=(1-t)*n/2,s=(1-t)*o/2;return[{x:i,y:e+s},{x:r+n-a,y:c},{x:i,y:e+o-s},{x:r+a,y:c}]}function N(r,e,n){return Math.min(r,e)/2*n}function P(r,e,n){const{id:o,x:t,y:i,width:c,height:a,type:s}=r,{strokeColor:l,fillColor:h,diamondStrokeWidth:g,circleStrokeWidth:f,scale:p,rotation:u}=e,b=s==="diamond"?g:f,v=n?' class="selected"':"",L=t+c/2,k=i+a/2,E=u?` transform="rotate(${u}, ${L}, ${k})"`:"";let x="";if(s==="diamond")x=`  <polygon points="${H(t,i,c,a,p).map(M=>`${M.x},${M.y}`).join(" ")}" fill="${h}" stroke="${l}" stroke-width="${b}"${E}${v} />`;else{const w=N(c,a,p);x=`  <circle cx="${L}" cy="${k}" r="${w>0?w:0}" fill="${h}" stroke="${l}" stroke-width="${b}"${E}${v} />`}return`  <g data-rect-id="${o}">
${x}
  </g>`}function U(r,e,n){const o=Math.min(...r.map(s=>s.x)),t=Math.min(...r.map(s=>s.y)),i=Math.max(...r.map(s=>s.x+s.width)),c=Math.max(...r.map(s=>s.y+s.height)),a=r.map(s=>P(s,e,s.id===n));return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${o-10} ${t-10} ${i-o+20} ${c-t+20}">
${a.join(`
`)}
</svg>`}const d=8;function j(r,e){const{x:n,y:o,width:t,height:i}=e,c=[{id:"nw",x:n-d/2,y:o-d/2},{id:"n",x:n+t/2-d/2,y:o-d/2},{id:"ne",x:n+t-d/2,y:o-d/2},{id:"e",x:n+t-d/2,y:o+i/2-d/2},{id:"se",x:n+t-d/2,y:o+i-d/2},{id:"s",x:n+t/2-d/2,y:o+i-d/2},{id:"sw",x:n-d/2,y:o+i-d/2},{id:"w",x:n-d/2,y:o+i/2-d/2}],a=document.createDocumentFragment();for(const s of c){const l=document.createElementNS(r,"rect");l.setAttribute("x",s.x),l.setAttribute("y",s.y),l.setAttribute("width",d),l.setAttribute("height",d),l.setAttribute("fill","#fff"),l.setAttribute("stroke","#3b82f6"),l.setAttribute("stroke-width","1.5"),l.setAttribute("data-handle",s.id),l.style.cursor=`${s.id}-resize`,a.appendChild(l)}return a}function X(r,e,n){let o=null,t=null,i=null;r.addEventListener("mousedown",c=>{const a=c.target.closest("[data-handle]");if(!a)return;c.preventDefault();const s=m(e),l=s.rects.find(h=>h.id===s.selectedId);l&&(o=a.getAttribute("data-handle"),t={...l},i={x:c.clientX,y:c.clientY},n&&n(!0))}),window.addEventListener("mousemove",c=>{if(!o||!t||!i)return;const a=c.clientX-i.x,s=c.clientY-i.y,l=m(e);let{x:h,y:g,width:f,height:p}=t;const u=20;switch(o){case"e":f=Math.max(u,t.width+a);break;case"w":f=Math.max(u,t.width-a),h=t.x+t.width-f;break;case"s":p=Math.max(u,t.height+s);break;case"n":p=Math.max(u,t.height-s),g=t.y+t.height-p;break;case"ne":f=Math.max(u,t.width+a),p=Math.max(u,t.height-s),g=t.y+t.height-p;break;case"nw":f=Math.max(u,t.width-a),h=t.x+t.width-f,p=Math.max(u,t.height-s),g=t.y+t.height-p;break;case"se":f=Math.max(u,t.width+a),p=Math.max(u,t.height+s);break;case"sw":f=Math.max(u,t.width-a),h=t.x+t.width-f,p=Math.max(u,t.height+s);break}const b=l.rects.map(v=>v.id===t.id?{...v,x:h,y:g,width:f,height:p}:v);y(e,{rects:b})}),window.addEventListener("mouseup",()=>{o&&n&&n(!1),o=null,t=null,i=null})}let A=!1;function F(r,e){const n=document.createElement("div");n.className="canvas-container",r.appendChild(n);function o(){if(A)return;const i=m(e),c=U(i.rects,i.settings,i.selectedId);n.innerHTML=c;const a=n.querySelector("svg");if(!a)return;a.setAttribute("width","100%"),a.setAttribute("height","100%"),Y(a,e);const s=i.rects.find(l=>l.id===i.selectedId);if(s){const h=j("http://www.w3.org/2000/svg",s);a.appendChild(h)}X(a,e,l=>{A=l,l||o()})}o();const t=$(e,o);return{element:n,destroy:t}}function Y(r,e){if(!r)return;const n=r.querySelectorAll("[data-rect-id]");for(const o of n)o.style.cursor="pointer",o.addEventListener("click",t=>{t.stopPropagation();const i=o.getAttribute("data-rect-id"),a=m(e).rects.find(s=>s.id===i);a&&y(e,{selectedId:a.id})})}function D(r,e){function n(o){const{scale:t,rotation:i,strokeColor:c,fillColor:a}=o.settings;r.innerHTML=`
      <div class="field">
        <label>Scala: ${t}</label>
        <input type="range" data-prop="scale" value="${t}" min="0.1" max="1" step="0.05" />
      </div>
      <div class="field">
        <label>Rotazione: ${i}°</label>
        <input type="range" data-prop="rotation" value="${i}" min="0" max="360" step="1" />
      </div>
      <div class="field">
        <label>Colore tratto</label>
        <input type="color" data-prop="strokeColor" value="${c}" />
      </div>
      <div class="field">
        <label>Fill</label>
        <input type="color" data-prop="fillColor" value="${a!=="none"?a:"#ffffff"}" />
      </div>
    `,G(r,e)}return n(m(e)),$(e,n)}function G(r,e){r.querySelectorAll('input[type="range"]').forEach(n=>{n.addEventListener("input",()=>{const o=n.dataset.prop,t=parseFloat(n.value);y(e,{settings:{...m(e).settings,[o]:t}})})}),r.querySelectorAll('input[type="color"]').forEach(n=>{n.addEventListener("input",()=>{const o=n.dataset.prop,t=n.value,i=o==="fillColor"&&t==="#ffffff"?"none":t;y(e,{settings:{...m(e).settings,[o]:i}})})})}const K=document.getElementById("app"),S=q();K.innerHTML=`
  <div class="toolbar" id="toolbar"></div>
  <div class="main-area">
    <div id="canvas-slot"></div>
    <div class="side-panel" id="property-panel"></div>
  </div>
`;B(document.getElementById("toolbar"),S);F(document.getElementById("canvas-slot"),S);D(document.getElementById("property-panel"),S);
