const api = {
  async register(username, email, password) {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const responseJson = await response.json();

      if (!responseJson.success) {
        throw new Error(responseJson.message || "Registration error")
      }

      return responseJson;
    } catch (err) {
      throw new Error(err.message);
    }
  }
};

const registerForm = document.querySelector(".register__form");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!username || !email || !password) {
    showError("Please enter username, email, and password");
    return;
  }

  try {
    const response = await api.register(username, email, password);
    
    event.target.reset();
    window.location.href = "/login";
    return response;
  } catch (err) {
    showError(err.message);
  }
});

function showError(message) {
  const errorMessage = document.querySelector(".register__error-message");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}