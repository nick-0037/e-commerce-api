import { getUserIdFromToken } from "./utils/auth.js";

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
          <a class="user__link user__link--cart">🛒</a>
          ${
            user.role === "admin"
              ? '<a class="user__link user__link--admin" href="/admin">Admin</a>'
              : ""
          }
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
        <h3 class="product__title">${product.name}</h3>
        <img class="product__image" alt="${product.name}">
        <p>${truncateText(product.description, 100)}
          <a onclick="openDescriptionModal(${product.id})">
            <span class="no-break">See description</span>
          </a>
        </p>
        <p>Price: $${product.price}</p>
        ${
          user
            ? `<button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>`
            : ""
        }
      </div>
    `
      )
      .join("");

    document.getElementById("app").innerHTML = `
      <h1>Welcome to my online store</h1>
      <div class="user">${userHtml}</div>
      <h2>Product highlights</h2>
      <div class="product-list">${productsHtml}</div>

      <!-- Modal for Shopping Cart -->
      <div id="cart-modal" class="cart-modal cart-modal--hidden">
        <div class="cart-modal__content">
          <span class="cart-modal__close">&times;</span>
          <h2 class="cart-modal__title">Shopping Cart</h2>
          <ul id="cart-items" class="cart-modal__list"></ul>
          <p class="cart-modal__total">Total: <span id="cart-total">0</span></p>
          <button class="cart-modal__button" onclick="checkout()">Checkout</button>
        </div>
      </div>
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

  document
    .querySelector(".user__link--cart")
    .addEventListener("click", openCartModal);

  document
    .querySelector(".cart-modal__close")
    .addEventListener("click", closeCartModal);

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      addToCart(
        e.target.dataset.id,
        e.target.dataset.name,
        e.target.dataset.price
      );
    });
  });

  function openCartModal() {
    document
      .getElementById("cart-modal")
      .classList.remove("cart-modal--hidden");
    fetchCart();
  }

  function closeCartModal() {
    document.getElementById("cart-modal").classList.add("cart-modal--hidden");
  }

  async function addToCart(productId, name, price) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to sign in to add products to the cart.");
      return;
    }

    try {
      const userId = getUserIdFromToken(token);
      const response = await fetch(`/api/cart/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!response.ok) throw new Error("Failed to add product to cart");

      const data = await response.json();
      console.log("Product added:", data);

      await fetchCart();
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  }

  async function fetchCart() {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      const userId = getUserIdFromToken(token);
      const response = await fetch(`/api/cart/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) throw new Error("Failed to fetch cart");
  
      const cart = await response.json();
  
      const items = Array.isArray(cart.items) ? cart.items : [];
      const cartItems = document.getElementById("cart-items");
      const cartTotalElement = document.getElementById("cart-total");
  
      cartItems.innerHTML = items
        .map(
          (item) =>
            `<li>${item.product.name} - $${item.product.price} 
              <button onclick="removeFromCart(${item.product.id})">X</button>
            </li>`
        )
        .join("");
  
      const cartTotal = items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );

      console.log(cartTotal, "cartTotal")
  
      cartTotalElement.innerText = `$${cartTotal.toFixed(2)}`;
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  }

  async function removeFromCart(productId) {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const userId = getUserIdFromToken(token);
      const response = await fetch(`/api/cart/${userId}/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to remove product from cart");

      await fetchCart();
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  }

  async function checkout() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const userId = getUserIdFromToken(token);
      const response = await fetch(`/api/cart/checkout/${userId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Checkout failed");

      const data = await response.json();
      alert("Checkout successful!");
      closeCartModal();
    } catch (err) {
      console.error("Error during checkout:", err);
    }
  }
}

document.addEventListener("DOMContentLoaded", loadData);
