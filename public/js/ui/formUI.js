export function showError(message, selector) {
  const msgError = document.querySelector(selector);
  if (!msgError) return;

  msgError.textContent = message;
  msgError.style.display = "block";
}