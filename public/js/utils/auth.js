export function getUserIdFromToken(token) {
  if (!token) return null;

  try {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7);
    }
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));

    return decodedPayload.userId;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

export function getToken() {
  return localStorage.getItem("token");
}

export function extractUser(response) {
  if (response && response.user) {
    return response.user;
  }
  return null;
}