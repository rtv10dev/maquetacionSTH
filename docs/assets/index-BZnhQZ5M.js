(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(r){if(r.ep)return;r.ep=!0;const t=e(r);fetch(r.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{const o=document.querySelector(".hamburguesa"),n=document.getElementById("menu");o.addEventListener("click",()=>{const e=n.classList.toggle("activo");o.setAttribute("aria-expanded",e)}),n.querySelectorAll("a").forEach(e=>{e.addEventListener("click",()=>{n.classList.remove("activo"),o.setAttribute("aria-expanded",!1)})}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(n.classList.remove("activo"),o.setAttribute("aria-expanded",!1))})});function S(){const o=document.getElementById("galeria-json");o&&fetch("data/gallery.json").then(n=>n.json()).then(n=>{o.innerHTML=n.map(e=>e.src.type==="image"?`
              <figure class="item"
                data-categoria="${e.category}"
                data-etiquetas="${e.tags.join(",")}"
                data-vistas="${e.views}"
                data-fecha="${e.createdAt}">
                
                <picture>
                  <!--pantallas<= 768px-->
                  <source srcset="${e.src.small}" media="(max-width: 768px)">
                  <img 
                    src="${e.src.jpg}" 
                    alt="${e.title}" 
                    width="${e.width}" 
                    height="${e.height}" 
                    loading="lazy">
                </picture>

                <figcaption>${e.title}</figcaption>
              </figure>
            `:`
  <figure class="item"
    data-categoria="${e.category}"
    data-etiquetas="${e.tags.join(",")}"
    data-vistas="${e.views}"
    data-fecha="${e.createdAt}">
    
    <video autoplay muted loop playsinline poster="${e.src.poster||""}">
      <!-- Versión móvil -->
      <source src="${e.src.small}" type="video/mp4" media="(max-width: 768px)">
      <!-- Versión escritorio -->
      <source src="${e.src.mp4}" type="video/mp4" media="(min-width: 769px)">
      Tu navegador no soporta el video.
    </video>
    
    <figcaption>${e.title}</figcaption>
  </figure>
`).join("")}).catch(n=>console.error("Error cargando galería:",n))}function x(){const o=document.getElementById("galeria-json");if(!o)return;const n=document.querySelectorAll(".btn-filtro"),e=document.getElementById("buscar"),s=document.getElementById("ordenar");document.querySelector(".galeria-vacia");let r="todos",t="",a="reciente";function l(c){return c.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}function f(){const c=Array.from(o.querySelectorAll(".item"));let d=c.filter(i=>{const u=i.dataset.categoria.split(",").map(v=>v.trim().toLowerCase()),p=i.dataset.etiquetas.split(",").map(v=>v.trim().toLowerCase()),L=i.querySelector("figcaption").innerText,q=r==="todos"||u.includes(r.toLowerCase()),A=!t||l(L).includes(l(t))||p.some(v=>l(v).includes(l(t)));return q&&A});a==="az"?d.sort((i,u)=>i.querySelector("figcaption").innerText.trim().localeCompare(u.querySelector("figcaption").innerText.trim(),"es",{sensitivity:"base"})):a==="vistos"?d.sort((i,u)=>parseInt(u.dataset.vistas||"0",10)-parseInt(i.dataset.vistas||"0",10)):d.sort((i,u)=>new Date(u.dataset.fecha||"1970-01-01")-new Date(i.dataset.fecha||"1970-01-01")),c.forEach(i=>{d.includes(i)?i.style.display="inline-block":i.style.display="none"}),d.forEach(i=>o.appendChild(i))}n.forEach(c=>c.addEventListener("click",()=>{n.forEach(d=>d.classList.remove("activo")),c.classList.add("activo"),r=c.dataset.categoria,f()})),e.addEventListener("input",c=>{t=c.target.value,f()}),s.addEventListener("change",c=>{a=c.target.value,f()}),f()}function w(){const o=document.getElementById("promo-btn"),n=document.getElementById("clickbtn"),e=document.getElementById("promo-modal"),s=e.querySelector(".cerrar"),r=e.querySelector(".promo-contenido");let t=null;function a(){t=document.activeElement,e.classList.add("activo"),e.setAttribute("aria-hidden","false"),r.setAttribute("tabindex","-1"),r.focus(),f(e)}function l(){e.classList.remove("activo"),e.setAttribute("aria-hidden","true"),r.removeAttribute("tabindex"),t&&t.focus()}o.addEventListener("click",a),s.addEventListener("click",l),n.addEventListener("click",a),document.addEventListener("keydown",c=>{c.key==="Escape"&&e.classList.contains("activo")&&l()});function f(c){const d=c.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),i=d[0],u=d[d.length-1];c.addEventListener("keydown",p=>{p.key==="Tab"&&(p.shiftKey?document.activeElement===i&&(p.preventDefault(),u.focus()):document.activeElement===u&&(p.preventDefault(),i.focus()))})}}document.addEventListener("DOMContentLoaded",()=>{document.querySelector(".btn-arriba").addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})});let m,g,h=0;function y(o){m.forEach((n,e)=>{e===o?n.classList.add("activo"):n.classList.remove("activo"),g&&g[e]&&g[e].setAttribute("aria-selected",e===o?"true":"false")}),h=o}function b(){y((h+1)%m.length)}function E(){y((h-1+m.length)%m.length)}function k(){m=document.querySelectorAll(".slide");const o=document.querySelector(".flecha.izquierda"),n=document.querySelector(".flecha.derecha"),e=document.getElementById("puntos");!m.length||!e||(e.innerHTML="",m.forEach((s,r)=>{const t=document.createElement("button");t.setAttribute("role","tab"),t.setAttribute("aria-label",`Ir a la diapositiva ${r+1}`),t.setAttribute("aria-selected",r===0?"true":"false"),e.appendChild(t),t.addEventListener("click",()=>y(r))}),g=e.querySelectorAll("button"),n.addEventListener("click",b),o.addEventListener("click",E),y(0))}function $(o,n){const e=document.querySelector(o);if(!e)return;const s=e.querySelector(n);function r(t){if(!e.classList.contains("activo"))return;const a=e.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),l=a[0],f=a[a.length-1];t.key==="Tab"&&(t.shiftKey?document.activeElement===l&&(t.preventDefault(),f.focus()):document.activeElement===f&&(t.preventDefault(),l.focus())),t.key==="Escape"&&(e.classList.remove("activo"),e.setAttribute("aria-hidden","true"),s.focus())}document.addEventListener("keydown",r)}function C(o,n,e){const s=document.querySelector(o);if(!s)return;let r=0,t=0;s.addEventListener("touchstart",a=>{r=a.touches[0].clientX}),s.addEventListener("touchend",a=>{t=a.changedTouches[0].clientX;const l=t-r;Math.abs(l)>50&&(l<0?n():e())})}document.addEventListener("DOMContentLoaded",async()=>{await S(),x(),k(),w(),$("#promo-modal",".cerrar"),C("#slider",b,E)});
