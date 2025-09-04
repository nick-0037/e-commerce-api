import { login } from "./services/auth.js";

const loginForm = document.querySelector(".login__form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    showError("Please enter username and password");
    return;
  }

  try {
    const response = await login(username, password);

    if (response && response.token) {
      localStorage.setItem("token", response.token);
      event.target.reset();
      window.location.href = "/";
    }
  } catch (err) {
    console.error("Login error:", err);
    showError(err.message);
  }
});

function showError(message) {
  const errorMessage = document.querySelector(".login__error-message");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}