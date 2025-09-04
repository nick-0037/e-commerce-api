export function renderHomeProducts(products, user) {
  return products
    .map(
      (product) => `
      <div class="product">
        <h3 class="product__title">${product.name}</h3>
        <img class="product__image">
        <p>${truncateText(product.description, 100)}
          <a onclick="openDescriptionModal(${product.id})">
            <span class="no-break">See description</span>
          </a>
        </p>
        <p>Price: $${product.price}</p>
        ${user ? `<button class="add-to-cart-button" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
          Add to Cart
        </button>` : ""}
      </div>
    `
    )
    .join("");
}

function truncateText(text, maxLength) {
  return text.length > maxLength
    ? text.substring(0, maxLength).trimEnd() + "..."
    : text;
}