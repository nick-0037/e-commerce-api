import { fetchData } from "../services/api.js";
import { getToken, getUserIdFromToken } from "../utils/auth.js";

export async function createPaymentIntent() {
  const token = getToken();
  const userId = getUserIdFromToken(token);

  return fetchData(`/api/create-payment-intent/${userId}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ userId })
  });
}

