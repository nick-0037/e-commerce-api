import { getToken } from "../utils/auth.js";
import { fetchData } from "./api.js";

export async function fetchProducts() {
  const response = await fetchData("/api/products");
  return response.products
}

export async function addProduct(product) {
  const token = getToken();

  return await fetchData("/api/products", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
}

export async function updatePrice(id, newPrice) {
  const token = getToken();

  return await fetchData(`/api/products/${id}/price`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ price: newPrice }),
  });
}

export async function updateStock(id, newStock) {
  const token = getToken();

  return await fetchData(`/api/products/${id}/inventory`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ stock: newStock }),
  });
}