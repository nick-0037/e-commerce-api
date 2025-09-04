import { extractUser, getToken } from "../utils/auth.js";
import { fetchData } from "./api.js";

export async function login(username, password) {
  return await fetchData("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
}

export async function register(username, email, password) {
  return await fetchData("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
}

export async function fetchUser() {
  const token = getToken();
  if (!token) return null;

  const response = await fetchData("/api/user", {
    method: "GET",
    headers: { 
      "Authorization": `Bearer ${token}`
    }
  });

  return extractUser(response);
}