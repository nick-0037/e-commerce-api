const db = require("../models");
const Cart = db.Cart;
const CartItem = db.CartItem;
const Product = db.Product;

class cartService {
  async getCartByUser(userId) {
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
    const cart = await this.getCartByUser(userId);
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
    const cart = await this.getCartByUser(userId);
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
    const cart = await this.getCartByUser(userId);
    await CartItem.destroy({ where: { cartId: cart.id } });
  }

  async updateCartPaymentStatus(userId, status) {
    const cart = await this.getCartByUser(userId);

    if (!cart) {
      const error = new Error("Cart not found");
      error.status = 404;
      throw error;
    }

    cart.paymentStatus = status;
    await cart.save();

    console.log(`Cart payment status updated for user ${userId}: ${status}`);

    return cart;
  }
}

module.exports = new cartService();
