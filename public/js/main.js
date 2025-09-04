import { renderHomeProducts } from "./ui/homeUI.js";
import { setupAddCartButtons, setupCartUI, toggleCartModal } from "./ui/cartUI.js";
import { renderUser } from "./ui/userUI.js";
import { fetchProducts } from "./services/products.js";
import { fetchUser } from "./services/auth.js";

function renderApp(user, products) {
  const appElement = document.getElementById("app");
  appElement.innerHTML = `
    <h1>Welcome to my online store</h1>
    <div class="user">${renderUser(user)}</div>
    <h2>Product highlights</h2>
    <div class="product-list">${renderHomeProducts(products, user)}</div>

    <!-- Modal for Shopping Cart -->
    <div id="cart-modal" class="cart-modal cart-modal--hidden">
      <div class="cart-modal__content">
        <span class="cart-modal__close">&times;</span>
        <h2 class="cart-modal__title">Shopping Cart</h2>
        <ul id="cart-items" class="cart-modal__list"></ul>
        <p class="cart-modal__total">Total: <span id="cart-total">0</span></p>
        <button class="cart-modal__button" id="checkout-button">Checkout</button>
      </div>
    </div>

    <!-- Modal for Payment Form -->
    <div id="payment-modal" class="payment-modal payment-modal--hidden">
      <div class="payment-modal__content">
        <span class="payment-modal__close">&times;</span>
        <h2 class="payment-modal__title">Complete your payment</h2>
        <div id="payment-form-container"></div>
      </div>
    </div>
  `;

  const logoutButton = document.querySelector('.user__link--logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', handleLogout);
  }
  
  const cartButton = document.querySelector('.user__link--cart');
  if (cartButton) {
    cartButton.addEventListener('click', toggleCartModal);
  }
  
  const cartCloseButton = document.querySelector('.cart-modal__close');
  if (cartCloseButton) {
    cartCloseButton.addEventListener('click', toggleCartModal);
  }
  
  setupAddCartButtons();
  setupCartUI();
}

function handleLogout(event) {
  event.preventDefault();
  localStorage.removeItem("token");

  window.location.reload();
}

async function loadData() {
  try {
    const user = await fetchUser();

    const products = await fetchProducts();

    renderApp(user, products);
  } catch (error) {
    console.error("Error loading data:", error);
    document.getElementById("app").innerHTML = "<p>Error loading data. Please try again later.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadData);