document.addEventListener("DOMContentLoaded", function () {
  // Obtener los valores de los parámetros de la URL
  let parametros = new URLSearchParams(window.location.search);
  let imagen = parametros.get("imagen");
  let nombre = parametros.get("nombre");
  let precio = parametros.get("precio");

  // Mostrar la imagen, nombre y precio del producto
  document.getElementById("imagen-detalle").src = imagen;
  document.getElementById("nombre-producto").textContent = nombre;
  document.getElementById("precio-producto").textContent = "S/. " + precio;

  //para añadir la cantidad de productos al carro
  const decreaseQuantityBtn = document.getElementById("decrease-quantity");
  const increaseQuantityBtn = document.getElementById("increase-quantity");
  const quantityInput = document.getElementById("quantity");

  decreaseQuantityBtn.addEventListener("click", function () {
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
      quantityInput.value = currentQuantity - 1;
    }
  });

  increaseQuantityBtn.addEventListener("click", function () {
    let currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = currentQuantity + 1;
  });

  // Manejo del carrito
  const cartCountElement = document.getElementById("cart-count");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const updateCartCount = () => {
    const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
    cartCountElement.textContent = totalItems;
  };

  const saveCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const addToCartButton = document.getElementById("add-to-cart-btn");

  addToCartButton.addEventListener("click", () => {
    const quantity = parseInt(quantityInput.value);
    const product = {
      nombre: nombre,
      precio: precio,
      imagen: imagen,
      cantidad: quantity,
    };

    const existingProduct = cart.find((item) => item.nombre === product.nombre);
    if (existingProduct) {
      existingProduct.cantidad += quantity;
    } else {
      cart.push(product);
    }

    updateCartCount();
    saveCartToLocalStorage();
  });

  updateCartCount();
});

// Función para obtener el valor de un parámetro de la URL
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Obtener el nombre del producto desde la URL
var nombreProducto = getParameterByName("nombre");

// Actualizar el título del documento
if (nombreProducto) {
  document.title = nombreProducto;
}
