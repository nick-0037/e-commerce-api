const webhookService = require("../services/webhookService");

const stripe = require("stripe")(process.env.STRIPE_SECRET);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

class webhookController {
  async stripeWebhook(req, res, next) {
    const sig = req.headers["stripe-signature"];
    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        endpointSecret
      );

      await webhookService.handleStripeWebHook(event);

      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new webhookController();
