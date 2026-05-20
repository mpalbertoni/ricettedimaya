(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(t){if(t.ep)return;t.ep=!0;const i=n(t);fetch(t.href,i)}})();function z(r,e){const n=[];for(let o=0;o<r;o++)for(let t=0;t<e;t++)n.push({id:`rect-${o}-${t}`,row:o,col:t,x:t*120,y:o*120,width:100,height:100,type:(o+t)%2===0?"diamond":"circle"});return n}function B(){return{rows:8,cols:8,strokeWidth:2,strokeColor:"#000000",fillColor:"none",scale:1,rotation:0,blend:0,canvasColor:"#ffffff",rectColor:"none"}}function T(r){const e={...B(),...r==null?void 0:r.settings},n=e.rows,o=e.cols;return{state:{settings:e,rects:z(n,o),selectedId:null},listeners:new Set}}function g(r){return r.state}function L(r,e){Object.assign(r.state,e);for(const n of r.listeners)try{n(r.state)}catch(o){console.error(o)}}function C(r,e){return r.listeners.add(e),()=>r.listeners.delete(e)}function H(r){const e=r.cloneNode(!0);e.getAttribute("xmlns")||e.setAttribute("xmlns","http://www.w3.org/2000/svg");const o=new XMLSerializer().serializeToString(e),t=new Blob([o],{type:"image/svg+xml"});A(t,"pattern.svg")}function N(r,e=2){const n=new XMLSerializer().serializeToString(r),o=new Blob([n],{type:"image/svg+xml;charset=utf-8"}),t=URL.createObjectURL(o),i=new Image;i.onload=()=>{const c=document.createElement("canvas");c.width=i.naturalWidth*e,c.height=i.naturalHeight*e;const l=c.getContext("2d");l.scale(e,e),l.drawImage(i,0,0),c.toBlob(a=>{A(a,"pattern.png"),URL.revokeObjectURL(t)},"image/png")},i.src=t}function A(r,e){const n=document.createElement("a");n.href=URL.createObjectURL(r),n.download=e,n.click(),URL.revokeObjectURL(n.href)}function F(r){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
    <div class="modal">
      <h2>Esporta pattern</h2>
      <p style="margin-bottom:12px;color:var(--text-muted);font-size:13px">Scegli il formato:</p>
      <div class="modal-actions">
        <button id="export-svg">SVG</button>
        <button id="export-png">PNG</button>
        <button id="export-cancel">Annulla</button>
      </div>
    </div>
  `,e.querySelector("#export-svg").addEventListener("click",()=>{H(r),e.remove()}),e.querySelector("#export-png").addEventListener("click",()=>{N(r),e.remove()}),e.querySelector("#export-cancel").addEventListener("click",()=>{e.remove()}),e.addEventListener("click",n=>{n.target===e&&e.remove()}),document.body.appendChild(e)}function U(r){var e;r.innerHTML=`
    <div style="margin-left:auto">
      <button class="primary" id="export-btn">Esporta</button>
    </div>
  `,(e=r.querySelector("#export-btn"))==null||e.addEventListener("click",()=>{const n=document.querySelector(".canvas-container svg");n&&F(n)})}function j(r,e,n,o,t){const i=r+n/2,c=e+o/2,l=(1-t)*n/2,a=(1-t)*o/2;return[{x:i,y:e+a},{x:r+n-l,y:c},{x:i,y:e+o-a},{x:r+l,y:c}]}function W(r,e,n){return Math.min(r,e)/2*n}function X(r,e,n){const{id:o,x:t,y:i,width:c,height:l,type:a}=r,{strokeColor:s,fillColor:u,strokeWidth:p,scale:m,rotation:h,blend:d}=e,y=n?' class="selected"':"",v=t+c/2,S=i+l/2,b=h?` transform="rotate(${h}, ${v}, ${S})"`:"",I=e.rectColor||"none",O=s,E=j(t,i,c,l,m).map(w=>`${w.x},${w.y}`).join(" "),x=W(c,l,m);let $="";if((d<=0||a==="diamond"&&d<1)&&(a==="diamond"?diamondStrokeWidth:circleStrokeWidth,$=`  <polygon points="${E}" fill="${u}" stroke="${s}" stroke-width="${p}"${b}${y} />`),(d>=1||a==="circle"&&d>0)&&($=`  <circle cx="${v}" cy="${S}" r="${x>0?x:0}" fill="${u}" stroke="${s}" stroke-width="${p}"${b}${y} />`),d>0&&d<1){const w=a==="diamond"?1-d:d,q=a==="circle"?d:1-d;$=`  <polygon points="${E}" fill="${u}" stroke="${s}" stroke-width="${p}" opacity="${w}"${b}${y} />
  <circle cx="${v}" cy="${S}" r="${x>0?x:0}" fill="${u}" stroke="${s}" stroke-width="${p}" opacity="${q}"${b}${y} />`}const P=`  <rect x="${t}" y="${i}" width="${c}" height="${l}" fill="${I}" stroke="${O}" stroke-width="1" />`;return`  <g data-rect-id="${o}">
${P}
${$}
  </g>`}function Y(r,e,n){const o=Math.min(...r.map(s=>s.x)),t=Math.min(...r.map(s=>s.y)),i=Math.max(...r.map(s=>s.x+s.width)),c=Math.max(...r.map(s=>s.y+s.height)),l=e.canvasColor||"#ffffff",a=r.map(s=>X(s,e,s.id===n));return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${o-10} ${t-10} ${i-o+20} ${c-t+20}" style="background:${l}">
${a.join(`
`)}
</svg>`}const f=8;function D(r,e){const{x:n,y:o,width:t,height:i}=e,c=[{id:"nw",x:n-f/2,y:o-f/2},{id:"n",x:n+t/2-f/2,y:o-f/2},{id:"ne",x:n+t-f/2,y:o-f/2},{id:"e",x:n+t-f/2,y:o+i/2-f/2},{id:"se",x:n+t-f/2,y:o+i-f/2},{id:"s",x:n+t/2-f/2,y:o+i-f/2},{id:"sw",x:n-f/2,y:o+i-f/2},{id:"w",x:n-f/2,y:o+i/2-f/2}],l=document.createDocumentFragment();for(const a of c){const s=document.createElementNS(r,"rect");s.setAttribute("x",a.x),s.setAttribute("y",a.y),s.setAttribute("width",f),s.setAttribute("height",f),s.setAttribute("fill","#fff"),s.setAttribute("stroke","#3b82f6"),s.setAttribute("stroke-width","1.5"),s.setAttribute("data-handle",a.id),s.style.cursor=`${a.id}-resize`,l.appendChild(s)}return l}function G(r,e,n){let o=null,t=null,i=null;r.addEventListener("mousedown",c=>{const l=c.target.closest("[data-handle]");if(!l)return;c.preventDefault();const a=g(e),s=a.rects.find(u=>u.id===a.selectedId);s&&(o=l.getAttribute("data-handle"),t={...s},i={x:c.clientX,y:c.clientY},n&&n(!0))}),window.addEventListener("mousemove",c=>{if(!o||!t||!i)return;const l=c.clientX-i.x,a=c.clientY-i.y,s=g(e);let{x:u,y:p,width:m,height:h}=t;const d=20;switch(o){case"e":m=Math.max(d,t.width+l);break;case"w":m=Math.max(d,t.width-l),u=t.x+t.width-m;break;case"s":h=Math.max(d,t.height+a);break;case"n":h=Math.max(d,t.height-a),p=t.y+t.height-h;break;case"ne":m=Math.max(d,t.width+l),h=Math.max(d,t.height-a),p=t.y+t.height-h;break;case"nw":m=Math.max(d,t.width-l),u=t.x+t.width-m,h=Math.max(d,t.height-a),p=t.y+t.height-h;break;case"se":m=Math.max(d,t.width+l),h=Math.max(d,t.height+a);break;case"sw":m=Math.max(d,t.width-l),u=t.x+t.width-m,h=Math.max(d,t.height+a);break}const y=s.rects.map(v=>v.id===t.id?{...v,x:u,y:p,width:m,height:h}:v);L(e,{rects:y})}),window.addEventListener("mouseup",()=>{o&&n&&n(!1),o=null,t=null,i=null})}let M=!1,k=null;function K(r,e){const n=document.createElement("div");n.className="canvas-container",r.appendChild(n);function o(){if(M)return;const c=g(e),l=Y(c.rects,c.settings,c.selectedId);n.innerHTML=l;const a=n.querySelector("svg");if(!a)return;a.setAttribute("width","100%"),a.setAttribute("height","100%"),V(a,e);const s=c.rects.find(u=>u.id===c.selectedId);if(s){const p=D("http://www.w3.org/2000/svg",s);a.appendChild(p)}G(a,e,u=>{M=u,u||o()})}function t(){k&&cancelAnimationFrame(k),k=requestAnimationFrame(()=>{k=null,o()})}o();const i=C(e,t);return{element:n,destroy:i}}function V(r,e){if(!r)return;const n=r.querySelectorAll("[data-rect-id]");for(const o of n)o.style.cursor="pointer",o.addEventListener("click",t=>{t.stopPropagation();const i=o.getAttribute("data-rect-id"),l=g(e).rects.find(a=>a.id===i);l&&L(e,{selectedId:l.id})})}function Z(r,e){function n(o){const{strokeWidth:t,scale:i,rotation:c,strokeColor:l,fillColor:a,blend:s,canvasColor:u,rectColor:p}=o.settings;r.innerHTML=`
      <div class="field">
        <label>Tratto: ${t}</label>
        <input type="range" data-prop="strokeWidth" value="${t}" min="0" max="20" step="0.5" />
      </div>
      <div class="field">
        <label>Scala: ${i}</label>
        <input type="range" data-prop="scale" value="${i}" min="0.1" max="1" step="0.05" />
      </div>
      <div class="field">
        <label>Rotazione: ${c}°</label>
        <input type="range" data-prop="rotation" value="${c}" min="0" max="360" step="1" />
      </div>
      <div class="field">
        <label>Fusione: ${s}</label>
        <input type="range" data-prop="blend" value="${s}" min="0" max="1" step="0.05" />
      </div>
      <div class="field">
        <label>Colore tratto</label>
        <input type="color" data-prop="strokeColor" value="${l}" />
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
        <input type="color" data-prop="canvasColor" value="${u}" />
      </div>
    `,_(r,e)}return n(g(e)),C(e,n)}function _(r,e){r.querySelectorAll('input[type="range"]').forEach(n=>{n.addEventListener("input",()=>{const o=n.dataset.prop,t=parseFloat(n.value);L(e,{settings:{...g(e).settings,[o]:t}})})}),r.querySelectorAll('input[type="color"]').forEach(n=>{n.addEventListener("input",()=>{const o=n.dataset.prop,t=n.value,i=(o==="fillColor"||o==="rectColor")&&t==="#ffffff"?"none":t;L(e,{settings:{...g(e).settings,[o]:i}})})})}const J=document.getElementById("app"),R=T();J.innerHTML=`
  <div class="toolbar" id="toolbar"></div>
  <div class="main-area">
    <div id="canvas-slot"></div>
    <div class="side-panel" id="property-panel"></div>
  </div>
`;U(document.getElementById("toolbar"));K(document.getElementById("canvas-slot"),R);Z(document.getElementById("property-panel"),R);
