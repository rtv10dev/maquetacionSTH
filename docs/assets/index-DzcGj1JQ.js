(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector(".hamburguesa"),o=document.getElementById("menu");n.addEventListener("click",()=>{const e=o.classList.toggle("activo");n.setAttribute("aria-expanded",e)}),o.querySelectorAll("a").forEach(e=>{e.addEventListener("click",()=>{o.classList.remove("activo"),n.setAttribute("aria-expanded",!1)})}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(o.classList.remove("activo"),n.setAttribute("aria-expanded",!1))})});function A(){const n=document.getElementById("galeria-json");n&&fetch("data/gallery.json").then(o=>o.json()).then(o=>{n.innerHTML=o.map(e=>e.src.type==="image"?`
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
`).join("")}).catch(o=>console.error("Error cargando galería:",o))}function x(){const n=document.getElementById("galeria-json");if(!n)return;const o=document.querySelectorAll(".btn-filtro"),e=document.getElementById("buscar"),a=document.getElementById("ordenar");document.querySelector(".galeria-vacia");let t="todos",r="",i="reciente";function d(s){return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}function f(){const s=Array.from(n.querySelectorAll(".item"));let l=s.filter(c=>{const u=c.dataset.categoria.split(",").map(v=>v.trim().toLowerCase()),p=c.dataset.etiquetas.split(",").map(v=>v.trim().toLowerCase()),L=c.querySelector("figcaption").innerText,q=t==="todos"||u.includes(t.toLowerCase()),S=!r||d(L).includes(d(r))||p.some(v=>d(v).includes(d(r)));return q&&S});i==="az"?l.sort((c,u)=>c.querySelector("figcaption").innerText.trim().localeCompare(u.querySelector("figcaption").innerText.trim(),"es",{sensitivity:"base"})):i==="vistos"?l.sort((c,u)=>parseInt(u.dataset.vistas||"0",10)-parseInt(c.dataset.vistas||"0",10)):l.sort((c,u)=>new Date(u.dataset.fecha||"1970-01-01")-new Date(c.dataset.fecha||"1970-01-01")),s.forEach(c=>{l.includes(c)?c.style.display="inline-block":c.style.display="none"}),l.forEach(c=>n.appendChild(c))}o.forEach(s=>s.addEventListener("click",()=>{o.forEach(l=>l.classList.remove("activo")),s.classList.add("activo"),t=s.dataset.categoria,f()})),e.addEventListener("input",s=>{r=s.target.value,f()}),a.addEventListener("change",s=>{i=s.target.value,f()}),f()}function w(){const n=document.getElementById("promo-btn"),o=document.getElementById("clickbtn"),e=document.getElementById("promo-modal"),a=e.querySelector(".cerrar"),t=e.querySelector(".promo-contenido");let r=null;function i(){r=document.activeElement,e.classList.add("activo"),e.setAttribute("aria-hidden","false"),t.setAttribute("tabindex","-1"),t.focus(),f(e)}function d(){e.classList.remove("activo"),e.setAttribute("aria-hidden","true"),t.removeAttribute("tabindex"),r&&r.focus()}n.addEventListener("click",i),a.addEventListener("click",d),o.addEventListener("click",i),document.addEventListener("keydown",s=>{s.key==="Escape"&&e.classList.contains("activo")&&d()});function f(s){const l=s.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),c=l[0],u=l[l.length-1];s.addEventListener("keydown",p=>{p.key==="Tab"&&(p.shiftKey?document.activeElement===c&&(p.preventDefault(),u.focus()):document.activeElement===u&&(p.preventDefault(),c.focus()))})}}document.addEventListener("DOMContentLoaded",()=>{document.querySelector(".btn-arriba").addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})});let m,y,b=0;function g(n){m.forEach((o,e)=>{const a=o.querySelector("video");e===n?(o.classList.add("activo"),a&&(a.currentTime=0,a.play())):(o.classList.remove("activo"),a&&(a.pause(),a.currentTime=0)),y&&y[e]&&y[e].setAttribute("aria-selected",e===n?"true":"false")}),b=n}function h(){g((b+1)%m.length)}function E(){g((b-1+m.length)%m.length)}function k(){m=document.querySelectorAll(".slide");const n=document.querySelector(".flecha.izquierda"),o=document.querySelector(".flecha.derecha"),e=document.getElementById("puntos");!m.length||!e||(e.innerHTML="",m.forEach((a,t)=>{const r=document.createElement("button");r.setAttribute("role","tab"),r.setAttribute("aria-label",`Ir a la diapositiva ${t+1}`),r.setAttribute("aria-selected",t===0?"true":"false"),e.appendChild(r),r.addEventListener("click",()=>g(t))}),y=e.querySelectorAll("button"),o.addEventListener("click",h),n.addEventListener("click",E),m.forEach(a=>{const t=a.querySelector("video");t&&t.addEventListener("ended",h)}),g(0))}function $(n,o){const e=document.querySelector(n);if(!e)return;const a=e.querySelector(o);function t(r){if(!e.classList.contains("activo"))return;const i=e.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),d=i[0],f=i[i.length-1];r.key==="Tab"&&(r.shiftKey?document.activeElement===d&&(r.preventDefault(),f.focus()):document.activeElement===f&&(r.preventDefault(),d.focus())),r.key==="Escape"&&(e.classList.remove("activo"),e.setAttribute("aria-hidden","true"),a.focus())}document.addEventListener("keydown",t)}function T(n,o,e){const a=document.querySelector(n);if(!a)return;let t=0,r=0;a.addEventListener("touchstart",i=>{t=i.touches[0].clientX}),a.addEventListener("touchend",i=>{r=i.changedTouches[0].clientX;const d=r-t;Math.abs(d)>50&&(d<0?o():e())})}document.addEventListener("DOMContentLoaded",async()=>{await A(),x(),k(),w(),$("#promo-modal",".cerrar"),T("#slider",h,E)});
