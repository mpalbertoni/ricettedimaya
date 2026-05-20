(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(t){if(t.ep)return;t.ep=!0;const i=n(t);fetch(t.href,i)}})();function B(r,e){const n=[];for(let o=0;o<r;o++)for(let t=0;t<e;t++)n.push({id:`rect-${o}-${t}`,row:o,col:t,x:t*120,y:o*120,width:100,height:100,type:(o+t)%2===0?"diamond":"circle"});return n}function T(){return{rows:8,cols:8,diamondStrokeWidth:2,circleStrokeWidth:2,strokeColor:"#000000",fillColor:"none",scale:1,rotation:0,blend:0,canvasColor:"#ffffff",rectColor:"none"}}function H(r){const e={...T(),...r==null?void 0:r.settings},n=e.rows,o=e.cols;return{state:{settings:e,rects:B(n,o),selectedId:null},listeners:new Set}}function y(r){return r.state}function S(r,e){Object.assign(r.state,e);for(const n of r.listeners)try{n(r.state)}catch(o){console.error(o)}}function A(r,e){return r.listeners.add(e),()=>r.listeners.delete(e)}function N(r){const e=r.cloneNode(!0);e.getAttribute("xmlns")||e.setAttribute("xmlns","http://www.w3.org/2000/svg");const o=new XMLSerializer().serializeToString(e),t=new Blob([o],{type:"image/svg+xml"});R(t,"pattern.svg")}function W(r,e=2){const n=new XMLSerializer().serializeToString(r),o=new Blob([n],{type:"image/svg+xml;charset=utf-8"}),t=URL.createObjectURL(o),i=new Image;i.onload=()=>{const c=document.createElement("canvas");c.width=i.naturalWidth*e,c.height=i.naturalHeight*e;const l=c.getContext("2d");l.scale(e,e),l.drawImage(i,0,0),c.toBlob(s=>{R(s,"pattern.png"),URL.revokeObjectURL(t)},"image/png")},i.src=t}function R(r,e){const n=document.createElement("a");n.href=URL.createObjectURL(r),n.download=e,n.click(),URL.revokeObjectURL(n.href)}function F(r){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
    <div class="modal">
      <h2>Esporta pattern</h2>
      <p style="margin-bottom:12px;color:var(--text-muted);font-size:13px">Scegli il formato:</p>
      <div class="modal-actions">
        <button id="export-svg">SVG</button>
        <button id="export-png">PNG</button>
        <button id="export-cancel">Annulla</button>
      </div>
    </div>
  `,e.querySelector("#export-svg").addEventListener("click",()=>{N(r),e.remove()}),e.querySelector("#export-png").addEventListener("click",()=>{W(r),e.remove()}),e.querySelector("#export-cancel").addEventListener("click",()=>{e.remove()}),e.addEventListener("click",n=>{n.target===e&&e.remove()}),document.body.appendChild(e)}function U(r){var e;r.innerHTML=`
    <div style="margin-left:auto">
      <button class="primary" id="export-btn">Esporta</button>
    </div>
  `,(e=r.querySelector("#export-btn"))==null||e.addEventListener("click",()=>{const n=document.querySelector(".canvas-container svg");n&&F(n)})}function j(r,e,n,o,t){const i=r+n/2,c=e+o/2,l=(1-t)*n/2,s=(1-t)*o/2;return[{x:i,y:e+s},{x:r+n-l,y:c},{x:i,y:e+o-s},{x:r+l,y:c}]}function X(r,e,n){return Math.min(r,e)/2*n}function Y(r,e,n){const{id:o,x:t,y:i,width:c,height:l,type:s}=r,{strokeColor:a,fillColor:d,diamondStrokeWidth:h,circleStrokeWidth:p,scale:m,rotation:f,blend:v}=e,g=n?' class="selected"':"",L=t+c/2,E=i+l/2,b=f?` transform="rotate(${f}, ${L}, ${E})"`:"",O=e.rectColor||"none",P=a,M=j(t,i,c,l,m).map(w=>`${w.x},${w.y}`).join(" "),x=X(c,l,m);let $="";if((v<=0||s==="diamond"&&v<1)&&($=`  <polygon points="${M}" fill="${d}" stroke="${a}" stroke-width="${s==="diamond"?h:p}"${b}${g} />`),(v>=1||s==="circle"&&v>0)&&($=`  <circle cx="${L}" cy="${E}" r="${x>0?x:0}" fill="${d}" stroke="${a}" stroke-width="${s==="circle"?p:h}"${b}${g} />`),v>0&&v<1){const w=s==="diamond"?1-v:v,z=s==="circle"?v:1-v;$=`  <polygon points="${M}" fill="${d}" stroke="${a}" stroke-width="${h}" opacity="${w}"${b}${g} />
  <circle cx="${L}" cy="${E}" r="${x>0?x:0}" fill="${d}" stroke="${a}" stroke-width="${p}" opacity="${z}"${b}${g} />`}const q=`  <rect x="${t}" y="${i}" width="${c}" height="${l}" fill="${O}" stroke="${P}" stroke-width="1" />`;return`  <g data-rect-id="${o}">
${q}
${$}
  </g>`}function D(r,e,n){const o=Math.min(...r.map(a=>a.x)),t=Math.min(...r.map(a=>a.y)),i=Math.max(...r.map(a=>a.x+a.width)),c=Math.max(...r.map(a=>a.y+a.height)),l=e.canvasColor||"#ffffff",s=r.map(a=>Y(a,e,a.id===n));return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${o-10} ${t-10} ${i-o+20} ${c-t+20}" style="background:${l}">
${s.join(`
`)}
</svg>`}const u=8;function G(r,e){const{x:n,y:o,width:t,height:i}=e,c=[{id:"nw",x:n-u/2,y:o-u/2},{id:"n",x:n+t/2-u/2,y:o-u/2},{id:"ne",x:n+t-u/2,y:o-u/2},{id:"e",x:n+t-u/2,y:o+i/2-u/2},{id:"se",x:n+t-u/2,y:o+i-u/2},{id:"s",x:n+t/2-u/2,y:o+i-u/2},{id:"sw",x:n-u/2,y:o+i-u/2},{id:"w",x:n-u/2,y:o+i/2-u/2}],l=document.createDocumentFragment();for(const s of c){const a=document.createElementNS(r,"rect");a.setAttribute("x",s.x),a.setAttribute("y",s.y),a.setAttribute("width",u),a.setAttribute("height",u),a.setAttribute("fill","#fff"),a.setAttribute("stroke","#3b82f6"),a.setAttribute("stroke-width","1.5"),a.setAttribute("data-handle",s.id),a.style.cursor=`${s.id}-resize`,l.appendChild(a)}return l}function K(r,e,n){let o=null,t=null,i=null;r.addEventListener("mousedown",c=>{const l=c.target.closest("[data-handle]");if(!l)return;c.preventDefault();const s=y(e),a=s.rects.find(d=>d.id===s.selectedId);a&&(o=l.getAttribute("data-handle"),t={...a},i={x:c.clientX,y:c.clientY},n&&n(!0))}),window.addEventListener("mousemove",c=>{if(!o||!t||!i)return;const l=c.clientX-i.x,s=c.clientY-i.y,a=y(e);let{x:d,y:h,width:p,height:m}=t;const f=20;switch(o){case"e":p=Math.max(f,t.width+l);break;case"w":p=Math.max(f,t.width-l),d=t.x+t.width-p;break;case"s":m=Math.max(f,t.height+s);break;case"n":m=Math.max(f,t.height-s),h=t.y+t.height-m;break;case"ne":p=Math.max(f,t.width+l),m=Math.max(f,t.height-s),h=t.y+t.height-m;break;case"nw":p=Math.max(f,t.width-l),d=t.x+t.width-p,m=Math.max(f,t.height-s),h=t.y+t.height-m;break;case"se":p=Math.max(f,t.width+l),m=Math.max(f,t.height+s);break;case"sw":p=Math.max(f,t.width-l),d=t.x+t.width-p,m=Math.max(f,t.height+s);break}const v=a.rects.map(g=>g.id===t.id?{...g,x:d,y:h,width:p,height:m}:g);S(e,{rects:v})}),window.addEventListener("mouseup",()=>{o&&n&&n(!1),o=null,t=null,i=null})}let C=!1,k=null;function V(r,e){const n=document.createElement("div");n.className="canvas-container",r.appendChild(n);function o(){if(C)return;const c=y(e),l=D(c.rects,c.settings,c.selectedId);n.innerHTML=l;const s=n.querySelector("svg");if(!s)return;s.setAttribute("width","100%"),s.setAttribute("height","100%"),Z(s,e);const a=c.rects.find(d=>d.id===c.selectedId);if(a){const h=G("http://www.w3.org/2000/svg",a);s.appendChild(h)}K(s,e,d=>{C=d,d||o()})}function t(){k&&cancelAnimationFrame(k),k=requestAnimationFrame(()=>{k=null,o()})}o();const i=A(e,t);return{element:n,destroy:i}}function Z(r,e){if(!r)return;const n=r.querySelectorAll("[data-rect-id]");for(const o of n)o.style.cursor="pointer",o.addEventListener("click",t=>{t.stopPropagation();const i=o.getAttribute("data-rect-id"),l=y(e).rects.find(s=>s.id===i);l&&S(e,{selectedId:l.id})})}function _(r,e){function n(o){const{diamondStrokeWidth:t,circleStrokeWidth:i,scale:c,rotation:l,strokeColor:s,fillColor:a,blend:d,canvasColor:h,rectColor:p}=o.settings;r.innerHTML=`
      <div class="field">
        <label>Tratto rombo: ${t}</label>
        <input type="range" data-prop="diamondStrokeWidth" value="${t}" min="0" max="20" step="0.5" />
      </div>
      <div class="field">
        <label>Tratto cerchio: ${i}</label>
        <input type="range" data-prop="circleStrokeWidth" value="${i}" min="0" max="20" step="0.5" />
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
        <input type="color" data-prop="strokeColor" value="${s}" />
      </div>
      <div class="field">
        <label>Fill</label>
        <input type="color" data-prop="fillColor" value="${a!=="none"?a:"#ffffff"}" />
      </div>
      <div class="field">
        <label>Rettangoli</label>
        <input type="color" data-prop="rectColor" value="${p!=="none"?p:"#ffffff"}" />
      </div>
      <div class="field">
        <label>Sfondo canvas</label>
        <input type="color" data-prop="canvasColor" value="${h}" />
      </div>
    `,J(r,e)}return n(y(e)),A(e,n)}function J(r,e){r.querySelectorAll('input[type="range"]').forEach(n=>{n.addEventListener("input",()=>{const o=n.dataset.prop,t=parseFloat(n.value);S(e,{settings:{...y(e).settings,[o]:t}})})}),r.querySelectorAll('input[type="color"]').forEach(n=>{n.addEventListener("input",()=>{const o=n.dataset.prop,t=n.value,i=(o==="fillColor"||o==="rectColor")&&t==="#ffffff"?"none":t;S(e,{settings:{...y(e).settings,[o]:i}})})})}const Q=document.getElementById("app"),I=H();Q.innerHTML=`
  <div class="toolbar" id="toolbar"></div>
  <div class="main-area">
    <div id="canvas-slot"></div>
    <div class="side-panel" id="property-panel"></div>
  </div>
`;U(document.getElementById("toolbar"));V(document.getElementById("canvas-slot"),I);_(document.getElementById("property-panel"),I);
