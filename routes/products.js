const productController = require('../controllers/productController');
const productValidation = require('../validations/productValidation');
const validationMiddleware = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/auth');

const isAdmin = require('../middlewares/admin');

const express = require('express');
const router = express.Router();

router.post('/products', isAdmin, productValidation.addProduct, validationMiddleware, productController.addProduct);
router.patch('/products/:id/price', isAdmin, productValidation.updatePrice, validationMiddleware, productController.updatePrice);
router.patch('/products/:id/inventory', isAdmin, productValidation.updateInventory, validationMiddleware, productController.updateInventory);

router.get('/products', authMiddleware, productController.getAllProducts);
router.get('/products/search', authMiddleware, productValidation.searchProducts, validationMiddleware, productController.searchProducts);

module.exports = router;