document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const productCountElement = document.getElementById("product-count");
  const productTotalElement = document.getElementById("product-total");
  const totalCostElement = document.getElementById("total-cost");
  const shippingCostElement = document.getElementById("shipping-cost");
  let shippingCost = 0;
  let cart = JSON.parse(localStorage.getItem("checkoutCart")) || [];

  const updateCartSummary = () => {
    cartItemsContainer.innerHTML = "";
    let productTotal = 0;
    let productCount = 0;

    cart.forEach((product) => {
      const total = parseFloat(product.precio) * product.cantidad;
      productTotal += total;
      productCount += product.cantidad;
      if (productCount > 3) {
        shippingCost = 20.0;
      } else if (productCount > 2) {
        shippingCost = 15.0;
      } else {
        shippingCost = 10.0;
      }

      const cartItem = document.createElement("div");
      cartItem.classList.add("list-group-item");
      cartItem.innerHTML = `
              <div class="d-flex w-100 justify-content-between">
                  <img src="${product.imagen}" alt="${
        product.nombre
      }" style="width: 50px; height: 50px; margin-right: 10px;">
                  <div class="ms-2 me-auto">
                      <div class="fw-bold">${product.nombre}</div>
                      Cantidad: ${product.cantidad}
                  </div>
                  <small>S/. ${total.toFixed(2)}</small>
              </div>
          `;
      cartItemsContainer.appendChild(cartItem);
    });
    shippingCostElement.innerText = shippingCost.toFixed(2);
    productCountElement.textContent = productCount;
    productTotalElement.textContent = productTotal.toFixed(2);
    totalCostElement.textContent = (productTotal + shippingCost).toFixed(2);
  };

  updateCartSummary();
});
