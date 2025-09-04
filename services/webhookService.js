const cartService = require("../services/cartService");

class webhookService {
  async handleStripeWebHook(event) {
    const paymentIntent = event.data.object;
    const userId = paymentIntent.metadata.userId;

    console.log(`userid recibido: ${userId}`);

    if (!userId) {
      console.error("⚠ Payment intent without userId in metadata");
      return;
    }

    console.log(`Received Stripe event: ${event.type} for user: ${userId}`);

    if (event.type === "payment_intent.succeeded") {
      await cartService.updateCartPaymentStatus(userId, "completed");
      console.log(`✅ Payment completed to user: ${userId}`);
    } else if (event.type === "payment_intent.payment_failed") {
      await cartService.updateCartPaymentStatus(userId, "cancelled");
      console.log(`❌ Payment failed to user: ${userId}`);
    } else {
      console.log(`ℹ️ Unhandled Stripe event: ${event.type}`);
    }
  }
}

module.exports = new webhookService();