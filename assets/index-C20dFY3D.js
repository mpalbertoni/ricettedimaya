(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(t){if(t.ep)return;t.ep=!0;const i=n(t);fetch(t.href,i)}})();function q(o,e){const n=[];for(let r=0;r<o;r++)for(let t=0;t<e;t++)n.push({id:`rect-${r}-${t}`,row:r,col:t,x:t*120,y:r*120,width:100,height:100,type:(r+t)%2===0?"diamond":"circle"});return n}function z(){return{rows:8,cols:8,diamondStrokeWidth:2,circleStrokeWidth:2,strokeColor:"#000000",fillColor:"none",scale:1,rotation:0}}function B(o){const e={...z(),...o==null?void 0:o.settings},n=e.rows,r=e.cols;return{state:{settings:e,rects:q(n,r),selectedId:null},listeners:new Set}}function g(o){return o.state}function x(o,e){Object.assign(o.state,e);for(const n of o.listeners)try{n(o.state)}catch(r){console.error(r)}}function A(o,e){return o.listeners.add(e),()=>o.listeners.delete(e)}function O(o){const e=o.cloneNode(!0);e.getAttribute("xmlns")||e.setAttribute("xmlns","http://www.w3.org/2000/svg");const r=new XMLSerializer().serializeToString(e),t=new Blob([r],{type:"image/svg+xml"});R(t,"pattern.svg")}function T(o,e=2){const n=new XMLSerializer().serializeToString(o),r=new Blob([n],{type:"image/svg+xml;charset=utf-8"}),t=URL.createObjectURL(r),i=new Image;i.onload=()=>{const a=document.createElement("canvas");a.width=i.naturalWidth*e,a.height=i.naturalHeight*e;const c=a.getContext("2d");c.scale(e,e),c.drawImage(i,0,0),a.toBlob(s=>{R(s,"pattern.png"),URL.revokeObjectURL(t)},"image/png")},i.src=t}function R(o,e){const n=document.createElement("a");n.href=URL.createObjectURL(o),n.download=e,n.click(),URL.revokeObjectURL(n.href)}function W(o){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
    <div class="modal">
      <h2>Esporta pattern</h2>
      <p style="margin-bottom:12px;color:var(--text-muted);font-size:13px">Scegli il formato:</p>
      <div class="modal-actions">
        <button id="export-svg">SVG</button>
        <button id="export-png">PNG</button>
        <button id="export-cancel">Annulla</button>
      </div>
    </div>
  `,e.querySelector("#export-svg").addEventListener("click",()=>{O(o),e.remove()}),e.querySelector("#export-png").addEventListener("click",()=>{T(o),e.remove()}),e.querySelector("#export-cancel").addEventListener("click",()=>{e.remove()}),e.addEventListener("click",n=>{n.target===e&&e.remove()}),document.body.appendChild(e)}function H(o){var e;o.innerHTML=`
    <div style="margin-left:auto">
      <button class="primary" id="export-btn">Esporta</button>
    </div>
  `,(e=o.querySelector("#export-btn"))==null||e.addEventListener("click",()=>{const n=document.querySelector(".canvas-container svg");n&&W(n)})}function N(o,e,n,r,t){const i=o+n/2,a=e+r/2,c=(1-t)*n/2,s=(1-t)*r/2;return[{x:i,y:e+s},{x:o+n-c,y:a},{x:i,y:e+r-s},{x:o+c,y:a}]}function P(o,e,n){return Math.min(o,e)/2*n}function U(o,e,n){const{id:r,x:t,y:i,width:a,height:c,type:s}=o,{strokeColor:l,fillColor:u,diamondStrokeWidth:h,circleStrokeWidth:m,scale:f,rotation:p}=e,y=s==="diamond"?h:m,v=n?' class="selected"':"",S=t+a/2,k=i+c/2,L=p?` transform="rotate(${p}, ${S}, ${k})"`:"";let w="";if(s==="diamond")w=`  <polygon points="${N(t,i,a,c,f).map(E=>`${E.x},${E.y}`).join(" ")}" fill="${u}" stroke="${l}" stroke-width="${y}"${L}${v} />`;else{const $=P(a,c,f);w=`  <circle cx="${S}" cy="${k}" r="${$>0?$:0}" fill="${u}" stroke="${l}" stroke-width="${y}"${L}${v} />`}const I=`  <rect x="${t}" y="${i}" width="${a}" height="${c}" fill="none" stroke="#ccc" stroke-width="1" />`;return`  <g data-rect-id="${r}">
${I}
${w}
  </g>`}function j(o,e,n){const r=Math.min(...o.map(s=>s.x)),t=Math.min(...o.map(s=>s.y)),i=Math.max(...o.map(s=>s.x+s.width)),a=Math.max(...o.map(s=>s.y+s.height)),c=o.map(s=>U(s,e,s.id===n));return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${r-10} ${t-10} ${i-r+20} ${a-t+20}">
${c.join(`
`)}
</svg>`}const d=8;function X(o,e){const{x:n,y:r,width:t,height:i}=e,a=[{id:"nw",x:n-d/2,y:r-d/2},{id:"n",x:n+t/2-d/2,y:r-d/2},{id:"ne",x:n+t-d/2,y:r-d/2},{id:"e",x:n+t-d/2,y:r+i/2-d/2},{id:"se",x:n+t-d/2,y:r+i-d/2},{id:"s",x:n+t/2-d/2,y:r+i-d/2},{id:"sw",x:n-d/2,y:r+i-d/2},{id:"w",x:n-d/2,y:r+i/2-d/2}],c=document.createDocumentFragment();for(const s of a){const l=document.createElementNS(o,"rect");l.setAttribute("x",s.x),l.setAttribute("y",s.y),l.setAttribute("width",d),l.setAttribute("height",d),l.setAttribute("fill","#fff"),l.setAttribute("stroke","#3b82f6"),l.setAttribute("stroke-width","1.5"),l.setAttribute("data-handle",s.id),l.style.cursor=`${s.id}-resize`,c.appendChild(l)}return c}function F(o,e,n){let r=null,t=null,i=null;o.addEventListener("mousedown",a=>{const c=a.target.closest("[data-handle]");if(!c)return;a.preventDefault();const s=g(e),l=s.rects.find(u=>u.id===s.selectedId);l&&(r=c.getAttribute("data-handle"),t={...l},i={x:a.clientX,y:a.clientY},n&&n(!0))}),window.addEventListener("mousemove",a=>{if(!r||!t||!i)return;const c=a.clientX-i.x,s=a.clientY-i.y,l=g(e);let{x:u,y:h,width:m,height:f}=t;const p=20;switch(r){case"e":m=Math.max(p,t.width+c);break;case"w":m=Math.max(p,t.width-c),u=t.x+t.width-m;break;case"s":f=Math.max(p,t.height+s);break;case"n":f=Math.max(p,t.height-s),h=t.y+t.height-f;break;case"ne":m=Math.max(p,t.width+c),f=Math.max(p,t.height-s),h=t.y+t.height-f;break;case"nw":m=Math.max(p,t.width-c),u=t.x+t.width-m,f=Math.max(p,t.height-s),h=t.y+t.height-f;break;case"se":m=Math.max(p,t.width+c),f=Math.max(p,t.height+s);break;case"sw":m=Math.max(p,t.width-c),u=t.x+t.width-m,f=Math.max(p,t.height+s);break}const y=l.rects.map(v=>v.id===t.id?{...v,x:u,y:h,width:m,height:f}:v);x(e,{rects:y})}),window.addEventListener("mouseup",()=>{r&&n&&n(!1),r=null,t=null,i=null})}let M=!1,b=null;function Y(o,e){const n=document.createElement("div");n.className="canvas-container",o.appendChild(n);function r(){if(M)return;const a=g(e),c=j(a.rects,a.settings,a.selectedId);n.innerHTML=c;const s=n.querySelector("svg");if(!s)return;s.setAttribute("width","100%"),s.setAttribute("height","100%"),D(s,e);const l=a.rects.find(u=>u.id===a.selectedId);if(l){const h=X("http://www.w3.org/2000/svg",l);s.appendChild(h)}F(s,e,u=>{M=u,u||r()})}function t(){b&&cancelAnimationFrame(b),b=requestAnimationFrame(()=>{b=null,r()})}r();const i=A(e,t);return{element:n,destroy:i}}function D(o,e){if(!o)return;const n=o.querySelectorAll("[data-rect-id]");for(const r of n)r.style.cursor="pointer",r.addEventListener("click",t=>{t.stopPropagation();const i=r.getAttribute("data-rect-id"),c=g(e).rects.find(s=>s.id===i);c&&x(e,{selectedId:c.id})})}function G(o,e){function n(r){const{diamondStrokeWidth:t,circleStrokeWidth:i,scale:a,rotation:c,strokeColor:s,fillColor:l}=r.settings;o.innerHTML=`
      <div class="field">
        <label>Tratto rombo: ${t}</label>
        <input type="range" data-prop="diamondStrokeWidth" value="${t}" min="0" max="20" step="0.5" />
      </div>
      <div class="field">
        <label>Tratto cerchio: ${i}</label>
        <input type="range" data-prop="circleStrokeWidth" value="${i}" min="0" max="20" step="0.5" />
      </div>
      <div class="field">
        <label>Scala: ${a}</label>
        <input type="range" data-prop="scale" value="${a}" min="0.1" max="1" step="0.05" />
      </div>
      <div class="field">
        <label>Rotazione: ${c}°</label>
        <input type="range" data-prop="rotation" value="${c}" min="0" max="360" step="1" />
      </div>
      <div class="field">
        <label>Colore tratto</label>
        <input type="color" data-prop="strokeColor" value="${s}" />
      </div>
      <div class="field">
        <label>Fill</label>
        <input type="color" data-prop="fillColor" value="${l!=="none"?l:"#ffffff"}" />
      </div>
    `,K(o,e)}return n(g(e)),A(e,n)}function K(o,e){o.querySelectorAll('input[type="range"]').forEach(n=>{n.addEventListener("input",()=>{const r=n.dataset.prop,t=parseFloat(n.value);x(e,{settings:{...g(e).settings,[r]:t}})})}),o.querySelectorAll('input[type="color"]').forEach(n=>{n.addEventListener("input",()=>{const r=n.dataset.prop,t=n.value,i=r==="fillColor"&&t==="#ffffff"?"none":t;x(e,{settings:{...g(e).settings,[r]:i}})})})}const V=document.getElementById("app"),C=B();V.innerHTML=`
  <div class="toolbar" id="toolbar"></div>
  <div class="main-area">
    <div id="canvas-slot"></div>
    <div class="side-panel" id="property-panel"></div>
  </div>
`;H(document.getElementById("toolbar"));Y(document.getElementById("canvas-slot"),C);G(document.getElementById("property-panel"),C);
