document.addEventListener("DOMContentLoaded", () => {
  const cartTableBody = document.getElementById("cart-table-body");
  const cartSubtotal = document.getElementById("cart-subtotal");
  const cartTotal = document.getElementById("cart-total");
  const checkoutButton = document.querySelector(".btn a"); // Selecciona el botón de checkout
  // Recuperamos el carrito del localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const updateCartDisplay = () => {
    cartTableBody.innerHTML = "";
    let subtotal = 0;

    cart.forEach((product, index) => {
      const total = parseFloat(product.precio) * product.cantidad;
      subtotal += total;

      const row = document.createElement("tr");
      row.innerHTML = `
              <td style="display: flex; align-items: center;">
                  <img src="${product.imagen}" alt="${
        product.nombre
      }" style="width: 50px; height: 50px; margin-right: 10px;">
                  <span>${product.nombre}</span>
              </td>
              <td>${product.cantidad}</td>
              <td>S/. ${total.toFixed(2)}</td>
              <td class="btn-custom">
                  <button class="btn delete-product" data-index="${index}">
                      <i class="fas fa-trash-alt"></i>
                  </button>
              </td>
          `;
      cartTableBody.appendChild(row);
    });

    cartSubtotal.textContent = `Subtotal: S/. ${subtotal.toFixed(2)}`;
    cartTotal.textContent = `Total: S/. ${subtotal.toFixed(2)}`;

    const deleteButtons = document.querySelectorAll(".delete-product");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productIndex = parseInt(event.target.getAttribute("data-index"));
        cart.splice(productIndex, 1);
        saveCartToLocalStorage();
        updateCartDisplay();
      });
    });

    if (cart.length === 0) {
      window.location.href = "shoppingCartEmpty.html";
    }
  };

  const saveCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  checkoutButton.addEventListener("click", () => {
    localStorage.setItem("checkoutCart", JSON.stringify(cart));
  });

  updateCartDisplay();
});
