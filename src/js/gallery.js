// Función que carga la galería desde el JSON y genera HTML
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
                
                <img 
                  src="${item.src.jpg}" 
                  srcset="${item.src.small} 600w, ${item.src.jpg} 1200w"
                  alt="${item.title}" 
                  width="${item.width}" 
                  height="${item.height}" 
                  loading="lazy">
                
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
                
                <video autoplay muted loop playsinline poster="${item.src.poster || ""}">
                  <source src="${item.src.mp4}" type="video/mp4">
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
