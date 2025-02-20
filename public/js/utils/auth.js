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