document.addEventListener("DOMContentLoaded", () => {
  const cartCountElement = document.getElementById("cart-count");
  // Recuperamos el carrito del localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const updateCartCount = () => {
    const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
    cartCountElement.textContent = totalItems;
  };

  const saveCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  // Seleccionamos el botón de agregar al carrito
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      // Recopilamos los datos del producto desde los atributos data
      const imagen = button.getAttribute("data-imagen");
      const nombre = button.getAttribute("data-nombre");
      const precio = button.getAttribute("data-precio");

      // Creamos un objeto de producto
      const product = {
        imagen,
        nombre,
        precio,
        cantidad: 1,
      };
      // Buscamos si el producto ya está en el carrito
      const existingProduct = cart.find(
        (item) => item.nombre === product.nombre
      );
      // Si el producto ya está en el carrito, incrementamos la cantidad
      if (existingProduct) {
        existingProduct.cantidad += 1;
      }
      // Si el producto no está en el carrito, lo agregamos
      else {
        cart.push(product);
      }
      //Actualizamos la cantidad de items en el carrito del navbar Carrito(count)
      updateCartCount();
      // Guardamos el carrito actualizado en el localStorage
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
