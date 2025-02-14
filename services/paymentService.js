const stripe = require("stripe")(process.env.STRIPE_SECRET);

class paymentService {
  async createPaymentIntent(cart) {
    try {
      const flattenedItems = cart.items.flat();

      const totalAmount = flattenedItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount * 100,
        currency: "usd",
      });

      return paymentIntent;
    } catch (err) {
      throw new Error(`Failed to create payment intent: ${err.message}`);
    }
  }
}

module.exports = new paymentService();
