const productService = require("../services/productService.js");

class productController {
  async addProduct(req, res, next) {
    try {
      const productData = req.body;
      const product = await productService.addProduct(productData);
      res.status(201).json({
        message: "Product added successfully",
        product,
      });
    } catch (err) {
      next(err);
    }
  }

  async updatePrice(req, res, next) {
    try {
      const productId = req.params.id;
      const productPrice = req.body.price;

      const product = await productService.updatePrice(productId, productPrice);
      res.status(200).json({
        message: "Product price updated successfully",
        product,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateInventory(req, res, next) {
    try {
      const productId = req.params.id;
      const productInventory = req.body.stock;

      const product = await productService.updateInventory(
        productId,
        productInventory
      );
      res.status(200).json({
        message: "Product inventory updated successfully",
        product,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllProducts(req, res, next) {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  async searchProducts(req, res, next) {
    try {
      const { q } = req.query;
      const products = await productService.searchProducts(q);

      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new productController();
