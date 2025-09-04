import { renderAdminProducts, openModal, closeModal, openDescriptionModal, openEditPriceModal } from "./ui/adminUI.js";
import { fetchProducts, addProduct, updatePrice, updateStock } from "./services/products.js";

document.addEventListener("DOMContentLoaded", async () => {
  const products = await fetchProducts();
  renderAdminProducts(products);

  document.querySelector(".admin-panel__table")
    .addEventListener("click", handleTableClick);
  
  document.getElementById("saveProductButton")
    .addEventListener("click", handleSaveProduct);
  
  document.getElementById("saveEditPriceButton")
    .addEventListener("click", handleSaveEditPrice);

  document.getElementById("addProductButton")
    .addEventListener("click", () => openModal("addProductModal"));
    
  document.getElementById("cancelAddProductButton")
    .addEventListener("click", () => closeModal("addProductModal"));
  
  document.getElementById("cancelEditPriceButton")
    .addEventListener("click", () => closeModal("editPriceModal"));
  
  document.getElementById("closeDescriptionButton")
    .addEventListener("click", () => closeModal("descriptionModal"));
});

export function handleTableClick(event) {
  const button = event.target.closest("button");
  if (!button) return;

  const action = button.dataset.action;
  const productId = parseInt(button.dataset.productId);

  if (action && !isNaN(productId)) {
    switch (action) {
      case "increase":
        updateStockDOM(productId, 1);
        break;
      case "decrease":
        updateStockDOM(productId, -1);
        break;
      case "view-desc":
        openDescriptionModal(productId);
        break;
      case "edit-price":
        openEditPriceModal(productId);
        break;
    }
  }
}

async function handleSaveProduct() {
  const name = document.getElementById("productName").value.trim();
  const price = parseFloat(document.getElementById("productPrice").value) || 0;
  const stock = parseInt(document.getElementById("productStock").value) || 0;
  const description = document.getElementById("productDescription").value.trim();

  if (!name || !description) {
    alert("Product name and description are required");
    return;
  }

  try {
    const response = await addProduct({ name, description, price, stock });

    if (response.success) {
      const products = await fetchProducts();
      renderAdminProducts(products);
      closeModal("addProductModal");
    } else {
      throw new Error("Failed to add product")
    }

  } catch (err) {
    console.error("Error adding product:", err);
    alert("Error adding product");
  }
}

async function handleSaveEditPrice() {
  const productId = document.getElementById("saveEditPriceButton").dataset.productId;
  const newPrice = parseFloat(
    document.getElementById("newProductPrice").value
  );
  if (isNaN(newPrice) || newPrice <= 0) {
    alert("Invalid price");
    return;
  }

  try {
    await updatePrice(productId, newPrice);
    
    const productRow = document.querySelector(`tr[data-id="${productId}"]`);
    const priceCell = productRow.querySelector("td:nth-child(3)");
    priceCell.textContent = `$${newPrice.toFixed(2)}`;

    closeModal("editPriceModal")
  } catch (err) {
    console.error("Error updating price:", err);
    alert("Error updating price");
  }
}

async function updateStockDOM(productId, change) {
  const row = document.querySelector(`tr[data-id="${productId}"]`);
  const stockSpan = row.querySelector(".admin-panel__stock");
  const currentStock = parseInt(stockSpan.textContent);
  const newStock = currentStock + change;

  if (newStock < 0) return

  try { 
    await updateStock(productId, newStock);
    stockSpan.textContent = newStock;
  } catch (err) {
    console.error("Error updating stock:", err);
    alert("Error updating stock");
  }
}