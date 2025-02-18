async function loadData() {
  try {
    const token = localStorage.getItem("token");

    const productsPromise = await fetch("/api/products").then((response) => {
      if (!response.ok) throw new Error("Error fetching products");
      return response.json();
    });

    let userPromise = Promise.resolve(null);
    if (typeof token === "string" && token.trim() !== "") {
      userPromise = fetch("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Error fetching user");
          return response.json();
        })
        .catch(() => null);
    }

    const [products, user] = await Promise.all([productsPromise, userPromise]);

    let userHtml = user
      ? `
        <p class="user__message">Welcome, ${user.username}!</p>
        <div class="user__actions">
          <a class="user__link user__link--logout">Logout</a>
          <a class="user__link user__link--admin" href="/admin">Admin</a>
        </div>
      `
      : `
        <div class="user__actions">
          <a class="user__link user__link--register" href="/register">Register</a>
          <a class="user__link user__link--login" href="/login">Sign in</a>
        </div>
      `;

    function truncateText(text, maxLength) {
      return text.length > maxLength
        ? text.substring(0, maxLength).trimEnd() + "..."
        : text;
    }

    const productsHtml = products
      .map(
        (product) => `
      <div class="product">
        <h3 class="product__tittle">${product.name}</h3>
        <img class="product__image" alt="${
          product.name
        }">
        <p>${truncateText(product.description, 100)}
          <a onclick="openDescriptionModal(${product.id})">
            <span class="no-break">See description</span>
          </a>
        </p>
        <p>Price: $${product.price}</p>
      </div>
    `
      )
      .join("");

    document.getElementById("app").innerHTML = `
      <h1>Welcome to my online store</h1>
      <div class="user">${userHtml}</div>
      <h2>Product highlights</h2>
      <div class="product-list">${productsHtml}</div>
    `;
  } catch (err) {
    console.error("Error loading data:", err);
    document.getElementById("app").innerHTML =
      "<p>Error loading data. Please try again later.</p>";
  }

  const logoutButton = document.querySelector(".user__link--logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }
}
document.addEventListener("DOMContentLoaded", loadData);