export function renderAdminProducts(products) {
  const tBody = document.querySelector(".admin-panel__table-body");
  tBody.innerHTML = products
    .map(
      (product) => `
      <tr class="admin-panel__table-row" data-id="${product.id}" data-description="${product.description}">
        <td class="admin-panel__table-cell">${product.id}</td>
        <td class="admin-panel__table-cell">${product.name}</td>
        <td class="admin-panel__table-cell ">$${product.price}</td>
        <td class="admin-panel__table-cell">
          <button class="admin-panel__button admin-panel__button--decrease" data-action="decrease" data-product-id="${product.id}" ">-</button>
          <span class="admin-panel__stock">${product.stock}</span>
          <button class="admin-panel__button admin-panel__button--increase" data-action="increase" data-product-id="${product.id}">+</button>
        </td>
        <td class="admin-panel__table-cell">
          <button class="admin-panel__button admin-panel__button--view-desc" data-action="view-desc" data-product-id="${product.id}">
            See description
          </button>  
        </td>
        <td class="admin-panel__table-cell">
          <button class="admin-panel__button admin-panel__button--edit-price" data-action="edit-price" data-product-id="${product.id}">Edit Price</button>
        </td>
      </tr>
    `
    )
    .join("");
}

export function openModal(modalId) {
  document.getElementById(modalId).classList.add("show");
}

export function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("show");
}

export function openDescriptionModal(productId) {
  const product = document.querySelector(`tr[data-id="${productId}"]`);
  const description = product.getAttribute("data-description");
  document.getElementById("modalDescription").textContent = description;
  openModal("descriptionModal");
  document.body.classList.add("modal-open");
}

export function openEditPriceModal(productId) {
  const product = document.querySelector(`tr[data-id="${productId}"]`);
  const currentPrice = product.querySelector(`td:nth-child(3)`).textContent.replace("$", "");
  document.getElementById("newProductPrice").value = currentPrice;
  document.getElementById("saveEditPriceButton").dataset.productId = productId;
  
  openModal("editPriceModal");
  document.body.classList.remove("modal-open");
}

