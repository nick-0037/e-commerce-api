const productService = require('../services/productService.js');

class productController {
  
  async addProduct(req, res) {
    try {
      const productData = req.body;
      const product = await productService.addProduct(productData);
      res.status(201).json({ 
        message: 'Product added successfully', 
        product 
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  async updatePrice(req, res) {
    try {
      const productId = req.params.id;
      const productPrice = req.body.price;

      const product = await productService.updatePrice(productId, productPrice);
      res.status(200).json({ 
        message: 'Product price updated successfully',
        product
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  async updateInventory(req, res) {
    try {
      const productId = req.params.id;
      const productInventory = req.body.stock;

      const product = await productService.updateInventory(productId, productInventory);
      res.status(200).json({
        message: 'Product inventory updated successfully',
        product
      })
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
};

module.exports = new productController();