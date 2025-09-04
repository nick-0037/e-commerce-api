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

  async getCartByUser(req, res, next) {
    try {
      const { userId } = req.params;
      const cart = await cartService.getCartByUser(userId);

      res.status(200).json({
        message: "Cart fetched successfully",
        cart,
        items: cart.items,
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

  async updateCartPaymentStatus(req, res) {
    try {
      const { userId } = req.params;
      const { status } = req.body;

      await cartService.updateCartPaymentStatus(userId, status);
      res.status(200).json({
        message: "Cart payment status updated",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new cartController();
