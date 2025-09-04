export function generatePaymentForm() {
  const container = document.getElementById("payment-form-container");
  container.innerHTML = `
    <form id="payment-form">
      <div id="payment-element"></div>
      <button id="submit" type="submit">
        <div class="spinner hidden" id="spinner"></div>
        <span id="button-text">Pay now</span>
      </button>
      <div id="payment-message" class="hidden"></div>
    </form>
  `;
}

export function setLoading(isLoading) {
  const submitButton = document.getElementById("submit");
  const spinner = document.getElementById("spinner");
  const buttonText = document.getElementById("button-text");

  if (isLoading) {
    submitButton.disabled = true;
    spinner.classList.remove("hidden");
    buttonText.classList.add("hidden");
  } else {
    submitButton.disabled = false;
    spinner.classList.add("hidden");
    buttonText.classList.remove("hidden");
  }
}

export function openPaymentModal() {
  const paymentModal = document.getElementById("payment-modal");
  paymentModal.classList.remove("payment-modal--hidden")
}

export function closePaymentModal() {
  const paymentModal = document.getElementById("payment-modal");
  paymentModal.classList.add("payment-modal--hidden")
}