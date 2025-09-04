const paymentService = require("../services/paymentService");

class paymentController {
  async createPaymentIntent(req, res, next) {
    try {
      const { userId } = req.params;
      const response = await paymentService.createPaymentIntent(userId);
      
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new paymentController();