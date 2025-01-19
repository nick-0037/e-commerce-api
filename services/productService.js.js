const { Product } = require('../models/product');

class productService {
  async addProduct(productData) {
    return await Product.create(productData);
  }

  async updatePrice(productId, newPrice) {
    const product = await Product.findByPk(productId);
    if(!product) {
      throw new Error('Product not found');
    }
    product.price = newPrice;
    await product.save();
    return product;
  }

  async updateInventory(productId, newStock) {
    const product = await Product.findByPk(productId);
    if(!product) {
      throw new Error('Product not found');
    }
    product.stock = newStock;
    await product.save();
    return product;
  }
}

module.exports = new productService();