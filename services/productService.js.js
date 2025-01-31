const db = require('../models');
const Product = db.Product;
const { Op } = require('sequelize');

class productService {
  async addProduct(productData) {
    const { name, description, price = 0, stock = 0 } = productData;
    return await Product.create({
      name, description, price, stock
    });
  };

  async updatePrice(productId, newPrice) {
    const product = await Product.findByPk(productId);
    if(!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    product.price = newPrice;
    await product.save();
    return product;
  };

  async updateInventory(productId, newStock) {
    const product = await Product.findByPk(productId);
    if(!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    product.stock = newStock;
    await product.save();
    return product;
  };

  async getAllProducts() {
    const products = await Product.findAll();
    return products;
  };

  async searchProducts(query) {
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%`}},
          { description: { [Op.like]: `%${query}%`}}
        ]
      }
    });
    return products;
  };
}

module.exports = new productService();