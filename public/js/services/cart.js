import { fetchData } from './api.js';
import { getToken, getUserIdFromToken } from '../utils/auth.js';

export async function fetchCart() {
  const token = getToken();
  const userId = getUserIdFromToken(token);

  return await fetchData(`/api/cart/${userId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
}

export async function addToCart(productId, quantity = 1) {
  const token = getToken();
  const userId = getUserIdFromToken(token);

  return await fetchData(`/api/cart/${userId}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity })
  });
}

export async function removeFromCart(productId) {
  const token = getToken();
  const userId = getUserIdFromToken(token);

  return await fetchData(`/api/cart/${userId}/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
}

export async function clearCart() {
  const token = getToken();
  const userId = getUserIdFromToken(token);

  return await fetchData(`/api/cart/${userId}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
}