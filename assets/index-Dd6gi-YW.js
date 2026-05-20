(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();function B(o,e){const n=[];for(let i=0;i<o;i++)for(let t=0;t<e;t++)n.push({id:`rect-${i}-${t}`,row:i,col:t,x:t*120,y:i*120,width:100,height:100,type:(i+t)%2===0?"diamond":"circle"});return n}function T(){return{rows:8,cols:8,diamondStrokeWidth:2,circleStrokeWidth:2,strokeColor:"#000000",fillColor:"none",scale:1,rotation:0,blend:0,canvasColor:"#ffffff"}}function H(o){const e={...T(),...o==null?void 0:o.settings},n=e.rows,i=e.cols;return{state:{settings:e,rects:B(n,i),selectedId:null},listeners:new Set}}function y(o){return o.state}function S(o,e){Object.assign(o.state,e);for(const n of o.listeners)try{n(o.state)}catch(i){console.error(i)}}function C(o,e){return o.listeners.add(e),()=>o.listeners.delete(e)}function N(o){const e=o.cloneNode(!0);e.getAttribute("xmlns")||e.setAttribute("xmlns","http://www.w3.org/2000/svg");const i=new XMLSerializer().serializeToString(e),t=new Blob([i],{type:"image/svg+xml"});R(t,"pattern.svg")}function W(o,e=2){const n=new XMLSerializer().serializeToString(o),i=new Blob([n],{type:"image/svg+xml;charset=utf-8"}),t=URL.createObjectURL(i),r=new Image;r.onload=()=>{const c=document.createElement("canvas");c.width=r.naturalWidth*e,c.height=r.naturalHeight*e;const l=c.getContext("2d");l.scale(e,e),l.drawImage(r,0,0),c.toBlob(a=>{R(a,"pattern.png"),URL.revokeObjectURL(t)},"image/png")},r.src=t}function R(o,e){const n=document.createElement("a");n.href=URL.createObjectURL(o),n.download=e,n.click(),URL.revokeObjectURL(n.href)}function F(o){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
    <div class="modal">
      <h2>Esporta pattern</h2>
      <p style="margin-bottom:12px;color:var(--text-muted);font-size:13px">Scegli il formato:</p>
      <div class="modal-actions">
        <button id="export-svg">SVG</button>
        <button id="export-png">PNG</button>
        <button id="export-cancel">Annulla</button>
      </div>
    </div>
  `,e.querySelector("#export-svg").addEventListener("click",()=>{N(o),e.remove()}),e.querySelector("#export-png").addEventListener("click",()=>{W(o),e.remove()}),e.querySelector("#export-cancel").addEventListener("click",()=>{e.remove()}),e.addEventListener("click",n=>{n.target===e&&e.remove()}),document.body.appendChild(e)}function U(o){var e;o.innerHTML=`
    <div style="margin-left:auto">
      <button class="primary" id="export-btn">Esporta</button>
    </div>
  `,(e=o.querySelector("#export-btn"))==null||e.addEventListener("click",()=>{const n=document.querySelector(".canvas-container svg");n&&F(n)})}function j(o,e,n,i,t){const r=o+n/2,c=e+i/2,l=(1-t)*n/2,a=(1-t)*i/2;return[{x:r,y:e+a},{x:o+n-l,y:c},{x:r,y:e+i-a},{x:o+l,y:c}]}function X(o,e,n){return Math.min(o,e)/2*n}function Y(o,e,n){const{id:i,x:t,y:r,width:c,height:l,type:a}=o,{strokeColor:s,fillColor:d,diamondStrokeWidth:h,circleStrokeWidth:f,scale:m,rotation:p,blend:v}=e,g=n?' class="selected"':"",L=t+c/2,E=r+l/2,b=p?` transform="rotate(${p}, ${L}, ${E})"`:"",O=d!=="none"?d:"none",P=s,M=j(t,r,c,l,m).map(w=>`${w.x},${w.y}`).join(" "),x=X(c,l,m);let $="";if((v<=0||a==="diamond"&&v<1)&&($=`  <polygon points="${M}" fill="${d}" stroke="${s}" stroke-width="${a==="diamond"?h:f}"${b}${g} />`),(v>=1||a==="circle"&&v>0)&&($=`  <circle cx="${L}" cy="${E}" r="${x>0?x:0}" fill="${d}" stroke="${s}" stroke-width="${a==="circle"?f:h}"${b}${g} />`),v>0&&v<1){const w=a==="diamond"?1-v:v,z=a==="circle"?v:1-v;$=`  <polygon points="${M}" fill="${d}" stroke="${s}" stroke-width="${h}" opacity="${w}"${b}${g} />
  <circle cx="${L}" cy="${E}" r="${x>0?x:0}" fill="${d}" stroke="${s}" stroke-width="${f}" opacity="${z}"${b}${g} />`}const q=`  <rect x="${t}" y="${r}" width="${c}" height="${l}" fill="${O}" stroke="${P}" stroke-width="1" />`;return`  <g data-rect-id="${i}">
${q}
${$}
  </g>`}function D(o,e,n){const i=Math.min(...o.map(s=>s.x)),t=Math.min(...o.map(s=>s.y)),r=Math.max(...o.map(s=>s.x+s.width)),c=Math.max(...o.map(s=>s.y+s.height)),l=e.canvasColor||"#ffffff",a=o.map(s=>Y(s,e,s.id===n));return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${i-10} ${t-10} ${r-i+20} ${c-t+20}" style="background:${l}">
${a.join(`
`)}
</svg>`}const u=8;function G(o,e){const{x:n,y:i,width:t,height:r}=e,c=[{id:"nw",x:n-u/2,y:i-u/2},{id:"n",x:n+t/2-u/2,y:i-u/2},{id:"ne",x:n+t-u/2,y:i-u/2},{id:"e",x:n+t-u/2,y:i+r/2-u/2},{id:"se",x:n+t-u/2,y:i+r-u/2},{id:"s",x:n+t/2-u/2,y:i+r-u/2},{id:"sw",x:n-u/2,y:i+r-u/2},{id:"w",x:n-u/2,y:i+r/2-u/2}],l=document.createDocumentFragment();for(const a of c){const s=document.createElementNS(o,"rect");s.setAttribute("x",a.x),s.setAttribute("y",a.y),s.setAttribute("width",u),s.setAttribute("height",u),s.setAttribute("fill","#fff"),s.setAttribute("stroke","#3b82f6"),s.setAttribute("stroke-width","1.5"),s.setAttribute("data-handle",a.id),s.style.cursor=`${a.id}-resize`,l.appendChild(s)}return l}function K(o,e,n){let i=null,t=null,r=null;o.addEventListener("mousedown",c=>{const l=c.target.closest("[data-handle]");if(!l)return;c.preventDefault();const a=y(e),s=a.rects.find(d=>d.id===a.selectedId);s&&(i=l.getAttribute("data-handle"),t={...s},r={x:c.clientX,y:c.clientY},n&&n(!0))}),window.addEventListener("mousemove",c=>{if(!i||!t||!r)return;const l=c.clientX-r.x,a=c.clientY-r.y,s=y(e);let{x:d,y:h,width:f,height:m}=t;const p=20;switch(i){case"e":f=Math.max(p,t.width+l);break;case"w":f=Math.max(p,t.width-l),d=t.x+t.width-f;break;case"s":m=Math.max(p,t.height+a);break;case"n":m=Math.max(p,t.height-a),h=t.y+t.height-m;break;case"ne":f=Math.max(p,t.width+l),m=Math.max(p,t.height-a),h=t.y+t.height-m;break;case"nw":f=Math.max(p,t.width-l),d=t.x+t.width-f,m=Math.max(p,t.height-a),h=t.y+t.height-m;break;case"se":f=Math.max(p,t.width+l),m=Math.max(p,t.height+a);break;case"sw":f=Math.max(p,t.width-l),d=t.x+t.width-f,m=Math.max(p,t.height+a);break}const v=s.rects.map(g=>g.id===t.id?{...g,x:d,y:h,width:f,height:m}:g);S(e,{rects:v})}),window.addEventListener("mouseup",()=>{i&&n&&n(!1),i=null,t=null,r=null})}let A=!1,k=null;function V(o,e){const n=document.createElement("div");n.className="canvas-container",o.appendChild(n);function i(){if(A)return;const c=y(e),l=D(c.rects,c.settings,c.selectedId);n.innerHTML=l;const a=n.querySelector("svg");if(!a)return;a.setAttribute("width","100%"),a.setAttribute("height","100%"),Z(a,e);const s=c.rects.find(d=>d.id===c.selectedId);if(s){const h=G("http://www.w3.org/2000/svg",s);a.appendChild(h)}K(a,e,d=>{A=d,d||i()})}function t(){k&&cancelAnimationFrame(k),k=requestAnimationFrame(()=>{k=null,i()})}i();const r=C(e,t);return{element:n,destroy:r}}function Z(o,e){if(!o)return;const n=o.querySelectorAll("[data-rect-id]");for(const i of n)i.style.cursor="pointer",i.addEventListener("click",t=>{t.stopPropagation();const r=i.getAttribute("data-rect-id"),l=y(e).rects.find(a=>a.id===r);l&&S(e,{selectedId:l.id})})}function _(o,e){function n(i){const{diamondStrokeWidth:t,circleStrokeWidth:r,scale:c,rotation:l,strokeColor:a,fillColor:s,blend:d,canvasColor:h}=i.settings;o.innerHTML=`
      <div class="field">
        <label>Tratto rombo: ${t}</label>
        <input type="range" data-prop="diamondStrokeWidth" value="${t}" min="0" max="20" step="0.5" />
      </div>
      <div class="field">
        <label>Tratto cerchio: ${r}</label>
        <input type="range" data-prop="circleStrokeWidth" value="${r}" min="0" max="20" step="0.5" />
      </div>
      <div class="field">
        <label>Scala: ${c}</label>
        <input type="range" data-prop="scale" value="${c}" min="0.1" max="1" step="0.05" />
      </div>
      <div class="field">
        <label>Rotazione: ${l}°</label>
        <input type="range" data-prop="rotation" value="${l}" min="0" max="360" step="1" />
      </div>
      <div class="field">
        <label>Fusione: ${d}</label>
        <input type="range" data-prop="blend" value="${d}" min="0" max="1" step="0.05" />
      </div>
      <div class="field">
        <label>Colore tratto</label>
        <input type="color" data-prop="strokeColor" value="${a}" />
      </div>
      <div class="field">
        <label>Fill</label>
        <input type="color" data-prop="fillColor" value="${s!=="none"?s:"#ffffff"}" />
      </div>
      <div class="field">
        <label>Sfondo canvas</label>
        <input type="color" data-prop="canvasColor" value="${h}" />
      </div>
    `,J(o,e)}return n(y(e)),C(e,n)}function J(o,e){o.querySelectorAll('input[type="range"]').forEach(n=>{n.addEventListener("input",()=>{const i=n.dataset.prop,t=parseFloat(n.value);S(e,{settings:{...y(e).settings,[i]:t}})})}),o.querySelectorAll('input[type="color"]').forEach(n=>{n.addEventListener("input",()=>{const i=n.dataset.prop,t=n.value,r=i==="fillColor"&&t==="#ffffff"?"none":t;S(e,{settings:{...y(e).settings,[i]:r}})})})}const Q=document.getElementById("app"),I=H();Q.innerHTML=`
  <div class="toolbar" id="toolbar"></div>
  <div class="main-area">
    <div id="canvas-slot"></div>
    <div class="side-panel" id="property-panel"></div>
  </div>
`;U(document.getElementById("toolbar"));V(document.getElementById("canvas-slot"),I);_(document.getElementById("property-panel"),I);
