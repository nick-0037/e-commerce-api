const db = require("../models");
const Cart = db.Cart;
const CartItem = db.CartItem;
const Product = db.Product;
const paymentService = require("../services/paymentService");

class cartService {
  static async getCartByUser(userId) {
    let cart = await Cart.findOne({
      where: { userId },
      include: {
        model: CartItem,
        as: "items",
        include: { model: Product, as: "product" },
      },
    });

    if (!cart) {
      cart = await Cart.create({ userId, status: "pending" });
    }

    return cart;
  }

  async addToCart(userId, productId, quantity = 1) {
    const cart = await cartService.getCartByUser(userId);
    const [item, created] = await CartItem.findOrCreate({
      where: { cartId: cart.id, productId },
      defaults: { quantity },
    });
    if (!created) {
      item.quantity += quantity;
      await item.save();
    }

    return item;
  }

  async removeFromCart(userId, productId) {
    const cart = await cartService.getCartByUser(userId);
    const item = await CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    if (!item) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    await item.destroy();
  }

  async clearCart(userId) {
    const cart = await cartService.getCartByUser(userId);
    await CartItem.destroy({ where: { cartId: cart.id } });
  }

  async checkout(userId) {
    const cart = await cartService.getCartByUser(userId);

    if (!cart.items || cart.items.length === 0) {
      const error = new Error("Cart is empty");
      error.status = 400;
      throw error;
    }

    const paymentIntent = await paymentService.createPaymentIntent(cart);

    return paymentIntent;
  }

  async completedCheckout(userId) {
    const cart = await cartService.getCartByUser(userId);

    if (!cart.items || cart.items.length === 0) {
      const error = new Error("Cart is empty");
      error.status = 400;
      throw error;
    }

    cart.status = "completed";
    await cart.save();

    return cart;
  }

  async cancelledCheckout(userId) {
    const cart = await cartService.getCartByUser(userId);

    if (cart.status === "pending") {
      cart.status = "cancelled";
      await cart.save();
    }
  }
}

module.exports = new cartService();
