const cartService = require("./cartService");

const stripe = require("stripe")(process.env.STRIPE_SECRET);

class paymentService {
  async createPaymentIntent(userId) {
    try {
      const cart = await cartService.getCartByUser(userId);

      if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
      }

      const totalAmount = cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount * 100,
        currency: "usd",
        metadata: {
          userId: userId.toString(),
        }
      });

      return {
        clientSecret: paymentIntent.client_secret,
      };
    } catch (err) {
      throw new Error(`Failed to create payment intent: ${err.message}`);
    }
  }
}

module.exports = new paymentService();
