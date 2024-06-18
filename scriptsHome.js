document.addEventListener("DOMContentLoaded", function () {
  // Inicializar el carrusel de Bootstrap
  const myCarousel = document.querySelector("#carouselExampleCaptions");
  const carousel = new bootstrap.Carousel(myCarousel, {
    interval: 3000, // Cambia de imagen cada 3 segundos (ajustable según preferencias)
    wrap: true, // Permite que el carrusel se reinicie desde el principio cuando alcanza la última diapositiva
  });
});
