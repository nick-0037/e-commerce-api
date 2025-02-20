const cartService = require("../services/cartService");

class cartController {
  async addToCart(req, res, next) {
    try {
      const { userId } = req.params;
      const { productId, quantity } = req.body;
      const item = await cartService.addToCart(userId, productId, quantity);

      res.status(200).json({
        message: "Product added to cart",
        item,
      });
    } catch (err) {
      next(err);
    }
  }

  async getCart(req, res) {
    try {
      const { userId } = req.params;
      const cart = await cartService.getCart(userId);
  
      res.status(200).json({
        message: "Cart fetched successfully",
        cart,
      });
    } catch (err) {
      next(err);
    }
  }

  async removeFromCart(req, res) {
    try {
      const { userId, productId } = req.params;
      await cartService.removeFromCart(userId, productId);

      res.status(200).json({
        message: "Product removed from cart successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async clearCart(req, res) {
    try {
      const { userId } = req.params;
      await cartService.clearCart(userId);

      res.status(200).json({
        message: "Cart cleared successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async checkout(req, res) {
    try {
      const { userId } = req.params;
      const { paymentIntent } = await cartService.checkout(userId);

      res.status(200).json({
        message: "Checkout successfully",
        paymentIntent,
      });
    } catch (err) {
      next(err);
    }
  }

  async completedCheckout(req, res) {
    try {
      const { userId } = req.params;
      const { cart } = await cartService.completedCheckout(userId);

      res.status(200).json({
        message: "Checkout completed successfully",
        cart,
      });
    } catch (err) {
      next(err);
    }
  }

  async cancelledCheckout(req, res) {
    try {
      const { userId } = req.params;
      const { cart } = await cartService.cancelCart(userId);

      res.status(200).json({
        message: "Cart cancelled successfully",
        cart,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new cartController();
