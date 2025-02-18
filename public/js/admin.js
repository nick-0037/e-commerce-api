async function loadProducts() {
  try {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error("Error loading products");
    }

    const products = await response.json();
    renderProducts(products);
  } catch (err) {
    console.error("Error", err);
    document.querySelector(".admin-panel__table-body").innerHTML = `
      <tr><td colspan="4" class="admin-panel__table-cell">Failed to load products</td></tr>
    `;
  }
}

function renderProducts(products) {
  const tBody = document.querySelector(".admin-panel__table-body");
  tBody.innerHTML = products
    .map(
      (product) => `
    <tr class="admin-panel__table-row" data-id="${product.id}" data-description="${product.description}">
      <td class="admin-panel__table-cell">${product.id}</td>
      <td class="admin-panel__table-cell">${product.name}</td>
      <td class="admin-panel__table-cell ">$${product.price}</td>
      <td class="admin-panel__table-cell">
        <button class="admin-panel__button admin-panel__button--decrease" onclick="updateStock(${product.id}, -1)">-</button>
        <span class="admin-panel__stock">${product.stock}</span>
        <button class="admin-panel__button admin-panel__button--increase" onclick="updateStock(${product.id}, 1)">+</button>
      </td>
      <td class="admin-panel__table-cell">
        <button class="admin-panel__button admin-panel__button--view-desc" onclick="openDescriptionModal(${product.id})">
          See description
        </button>  
      </td>
      <td class="admin-panel__table-cell">
        <button class="admin-panel__button admin-panel__button--edit-price" onclick="openEditPriceModal(${product.id})">Edit Price</button>
      </td>
    </tr>
  `
    )
    .join("");
}

async function addProduct() {
  const name = document.getElementById("productName").value;
  const price = parseFloat(document.getElementById("productPrice").value) || 0;
  const stock = parseInt(document.getElementById("productStock").value) || 0;
  const description = document.getElementById("productDescription").value;

  if (!name) {
    alert("Invalid input");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description, price, stock }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Error adding product");
    }

    closeAddProductModal();
    loadProducts();
  } catch (err) {
    console.error("Error:", err);
    alert("Error adding product");
  }
}

async function updatePrice(id, price) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`/api/products/${id}/price`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ price }),
    });

    if (!response.ok) throw new Error("Error updating price");
  } catch (err) {
    console.error("Error:", err);
    alert("Error updating price");
  }
}

async function updateStock(id, change) {
  const row = document.querySelector(`tr[data-id="${id}"]`);
  if (!row) return;

  const stockElement = row.querySelector(".admin-panel__stock");
  let newStock = parseInt(stockElement.textContent) + change;

  if (newStock < 0) return;

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`/api/products/${id}/inventory`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ stock: newStock }),
    });

    if (!response.ok) throw new Error("Error updating stock");

    stockElement.textContent = newStock;
  } catch (err) {
    console.error("Error:", err);
    alert("Error updating stock");
  }
}

let currentEditingProductId = null;

const saveButton = document.querySelector(
  "#editPriceModal .modal__button--save"
);

saveButton.addEventListener("click", () => {
  if (currentEditingProductId !== null) {
    handleSaveClick(currentEditingProductId);
  }
});

function openEditPriceModal(id) {
  currentEditingProductId = id;
  const product = document.querySelector(`tr[data-id="${id}"]`);
  const currentPrice = product
    .querySelector("td:nth-child(3)")
    .textContent.replace("$", "");

  document.getElementById("newProductPrice").value = currentPrice;
  document.getElementById("editPriceModal").classList.add("show");
}

async function handleSaveClick(id) {
  const newPrice = parseFloat(document.getElementById("newProductPrice").value);
  if (isNaN(newPrice) || newPrice <= 0) {
    alert("Invalid price");
    return;
  }

  await updatePrice(id, newPrice);

  const productRow = document.querySelector(`tr[data-id="${id}"]`);
  const priceCell = productRow.querySelector("td:nth-child(3)");
  priceCell.textContent = `$${newPrice.toFixed(2)}`;

  closeEditPriceModal();
  currentEditingProductId = null;
}

function closeEditPriceModal() {
  document.getElementById("editPriceModal").classList.remove("show");
}

function openAddProductModal() {
  document.getElementById("addProductModal").classList.add("show");
}

function closeAddProductModal() {
  document.getElementById("addProductModal").classList.remove("show");
}

function openDescriptionModal(id) {
  const productRow = document.querySelector(`tr[data-id="${id}"]`);
  const description = productRow.getAttribute("data-description");

  document.getElementById("modalDescription").textContent = description;
  document.getElementById("descriptionModal").classList.add("show");
  document.body.classList.add("modal-open");
}

function closeDescriptionModal() {
  document.getElementById("descriptionModal").classList.remove("show");
  document.body.classList.remove("modal-open");
}

document.addEventListener("DOMContentLoaded", loadProducts);
