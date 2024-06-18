document.addEventListener("DOMContentLoaded", () => {
  // Limpiar localStorage para desarrollo

  const cartCountElement = document.getElementById("cart-count");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const updateCartCount = () => {
    const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
    cartCountElement.textContent = totalItems;
  };

  const saveCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const imagen = button.getAttribute("data-imagen");
      const nombre = button.getAttribute("data-nombre");
      const precio = button.getAttribute("data-precio");

      const product = {
        imagen,
        nombre,
        precio,
        cantidad: 1,
      };

      const existingProduct = cart.find(
        (item) => item.nombre === product.nombre
      );
      if (existingProduct) {
        existingProduct.cantidad += 1;
      } else {
        cart.push(product);
      }

      updateCartCount();
      saveCartToLocalStorage();

      // Cambiar el texto del botón a "Producto Agregado" temporalmente
      button.textContent = "Producto agregado";
      setTimeout(() => {
        // Volver al texto original "Agregar" después de 1 segundo
        button.textContent = "Agregar";
        button.innerHTML = "Agregar";
        button.innerHTML += ' <i class="fas fa-shopping-cart"></i>';
      }, 500);
    });
  });

  updateCartCount();

  // Funcionalidad de redireccionamiento condicional
  const cartLink = document.querySelector(
    '.nav-links a[href="ShoppingCart/shoppingCart.html"]'
  );
  const emptyCartLink = document.querySelector(
    '.nav-links a[href="ShoppingCart/shoppingCartEmpty.html"]'
  );

  cartLink.addEventListener("click", (event) => {
    if (cart.length === 0) {
      event.preventDefault();
      window.location.href = "ShoppingCart/shoppingCartEmpty.html";
    }
  });

  emptyCartLink.addEventListener("click", (event) => {
    if (cart.length !== 0) {
      event.preventDefault();
      window.location.href = "ShoppingCart/shoppingCart.html";
    }
  });
});
