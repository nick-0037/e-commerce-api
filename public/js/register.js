document.querySelector(".register__form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = { username, email , password };

  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const responseJson = await response.json();

  if (response.ok) {
    e.target.reset();
    window.location.href = "/login";
  } else {
    document.querySelector(".register__error-message").textContent = responseJson.error || "An error occurred.";
  }
})