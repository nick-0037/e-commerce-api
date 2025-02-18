document.querySelector(".login__form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const data = { username, password };

  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const responseJson = await response.json();

  if (response.ok) {
    localStorage.setItem('token', responseJson.token);
    e.target.reset();
    window.location.href = "/";
  } else {
    document.querySelector(".login__error-message").textContent = responseJson.message || "An error occurred.";
    document.querySelector(".login__error-message").style.display = "block";
  }
})