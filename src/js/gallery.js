//Función que carga la galería desde el JSON y genera HTML
export function cargarGaleria() {
  const grid = document.getElementById("galeria-json");
  if (!grid) return;

  fetch("data/gallery.json")
    .then(res => res.json())
    .then(data => {
      grid.innerHTML = data
        .map((item) => {
          if (item.src.type === "image") {
            return `
              <figure class="item"
                data-categoria="${item.category}"
                data-etiquetas="${item.tags.join(",")}"
                data-vistas="${item.views}"
                data-fecha="${item.createdAt}">
                
                <picture>
                  <!--pantallas<= 768px-->
                  <source srcset="${item.src.small}" media="(max-width: 768px)">
                  <img 
                    src="${item.src.jpg}" 
                    alt="${item.title}" 
                    width="${item.width}" 
                    height="${item.height}" 
                    loading="lazy">
                </picture>

                <figcaption>${item.title}</figcaption>
              </figure>
            `;
          } else {
return `
  <figure class="item"
    data-categoria="${item.category}"
    data-etiquetas="${item.tags.join(",")}"
    data-vistas="${item.views}"
    data-fecha="${item.createdAt}">
    
    <video
      muted loop playsinline
      preload="none"
      poster="${item.src.poster || ""}"
      width="${item.width || 1920}" height="${item.height || 1080}">
      <source src="${item.src.small}" type="video/mp4" media="(max-width: 768px)">
      <source src="${item.src.mp4}"   type="video/mp4" media="(min-width: 769px)">
      Tu navegador no soporta el video.
    </video>
    
    <figcaption>${item.title}</figcaption>
  </figure>
`;

          }
        })
        .join("");
    })
    .catch((err) => console.error("Error cargando galería:", err));
}
const lazyPlay = new IntersectionObserver((entries) => {
  entries.forEach(({isIntersecting, target}) => {
    if (isIntersecting) {
      // fuerza al navegador a elegir la fuente y empezar a reproducir
      if (target.readyState < 2) target.load();
      if (!target.hasAttribute('autoplay')) target.setAttribute('autoplay','');
      target.play().catch(()=>{});
    } else {
      target.pause();
    }
  });
}, { rootMargin: "200px 0px" });

document.querySelectorAll('#galeria-json video').forEach(v => lazyPlay.observe(v));
