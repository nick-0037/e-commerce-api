import { createPaymentIntent } from "./paymentApi.js";
import { clearCart, fetchCart } from "../services/cart.js";
import { closePaymentModal, openPaymentModal, generatePaymentForm, setLoading } from "./paymentUi.js";

export async function checkout() {
  try {
    const { clientSecret } = await createPaymentIntent();
    openPaymentModal();
    generatePaymentForm();

    const appearance = { theme: "stripe" };
    const stripe = Stripe(
      "pk_test_51QjQutRuZbBcqS1xwcTOPHaRxpJqAXlezu84hAA3Gr4Wfw9D9O7oPZZXnbYUOYYNSbugfkpW8VqxKCwOr6jwF0FR009U4NSkt5"
    );
    const elements = stripe.elements({ appearance, clientSecret });
    const paymentElement = elements.create("payment", { layout: "tabs" });
    paymentElement.mount("#payment-element"); 
  
    document
      .getElementById("payment-form")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        setLoading(true);

        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: "http://localhost:3000",
          },
        });

        if (error) {
          console.error("Error processing payment:", error);
          alert("Payment failed: " + error.message);
        } else {
          alert("Payment succeeded!");
          await clearCart();
          await fetchCart();
          closePaymentModal();
        }

        setLoading(false);
      });
  } catch (err) {
    console.error("Error during checkout:", err);
  }
}