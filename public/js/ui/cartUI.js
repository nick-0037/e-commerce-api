import { removeFromCart } from "../services/cart.js";
import { fetchCart, addToCart } from "../services/cart.js";
import { closePaymentModal } from "../payment/paymentUI.js";
import { checkout } from "../payment/checkout.js";

export function renderCart(cart) {
  const items = Array.isArray(cart.items) ? cart.items : [];
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  cartItemsContainer.innerHTML = items
    .map(
      (item) => `
          <li id="cart-item-${item.productId}">
            ${item.product.name} - $${item.product.price} (x${item.quantity})
            <button data-item-product-id="${item.productId}" class="remove-from-cart-button">X</button>
          </li>
        `
    )
    .join("");

  const cartTotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  cartTotalElement.innerText = `$${cartTotal.toFixed(2)}`;

  const removeButtons = document.querySelectorAll(".remove-from-cart-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const productId = event.target.dataset.itemProductId;

      try {
        const cartItem = document.getElementById(`cart-item-${productId}`);
        if (cartItem) {
          cartItem.remove();
        }

        await removeFromCart(productId)

        const updateCart = await fetchCart();
        renderCart(updateCart);
      } catch (err) {
        console.error("Error removing item from cart:", err);
        alert("Failed to remove item from cart. Please try again.");
      }
    });
  });
}

export function setupCartUI() {
  const checkoutButton = document.getElementById("checkout-button");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      checkout();
    });
  }

  const paymentCloseButton = document.querySelector('.payment-modal__close');
  if (paymentCloseButton) {
    paymentCloseButton.addEventListener('click', closePaymentModal);
  }
}

export function setupAddCartButtons() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
  
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const productId = button.dataset.id;
      
      await addToCart(productId, 1);
      
      const updateCart = await fetchCart();
      renderCart(updateCart);
    });
  });
}

export async function toggleCartModal() {
  const cartModal = document.getElementById('cart-modal');
  cartModal.classList.toggle('cart-modal--hidden');

  if(!cartModal.classList.contains('cart-modal--hidden')) {
    try {
      const cart = await fetchCart();
      renderCart(cart);
    } catch (err) {
      console.error("Error fetching or rendering the cart:", err);
      alert("Failed to load cart items. Please try again.");
    }
  }
}