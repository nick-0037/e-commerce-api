require('dotenv').config();
const express = require('express');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const cartController = require('./controllers/cartController');
const userValidation = require('./validations/userValidation');
const validationMiddleware = require('./middlewares/validationMiddleware');
const errorHandler = require('./middlewares/errorHandler');
const productValidation = require('./validations/productValidation');
const isAdmin = require('./middlewares/admin');
const authMiddleware = require('./middlewares/auth');

const app = express();

app.use(express.json());

const router = express.Router();

router.post('/register', userValidation.register, validationMiddleware, userController.register);
router.get('/login', userValidation.login, validationMiddleware, userController.login);

router.post('/products', isAdmin, productValidation.addProduct, validationMiddleware, productController.addProduct);
router.patch('/products/:id/price', isAdmin, productValidation.updatePrice, validationMiddleware, productController.updatePrice);
router.patch('/products/:id/inventory', isAdmin, productValidation.updateInventory, validationMiddleware, productController.updateInventory);

router.get('/products', authMiddleware, validationMiddleware, productController.getAllProducts);
router.get('/products/search', authMiddleware, productValidation.searchProducts, validationMiddleware, productController.searchProducts);

router.post('/cart/:userId', cartController.addToCart);
router.delete('/cart/:userId/:productId', cartController.removeFromCart);
router.get('/cart/:userId/clear', cartController.clearCart);

router.post('/cart/:userId/checkout', cartController.checkout);
router.post('/cart/:userId/checkout/completed', cartController.completedCheckout);
router.post('/cart/:userId/checkout/cancelled', cartController.cancelledCheckout);

app.use('/api', router);

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});