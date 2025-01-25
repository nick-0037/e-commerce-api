require('dotenv').config();
const express = require('express');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const cartController = require('./controllers/cartController');
const userValidation = require('./validations/userValidation');
const validationMiddleware = require('./middlewares/validationMiddleware');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

const router = express.Router();

router.post('/register', userValidation.register, validationMiddleware, userController.register);
router.get('/login', userValidation.login, validationMiddleware, userController.login);

router.post('/products/:id', productController.addProduct);
router.patch('/products/:id/price', productController.updatePrice);
router.patch('/products/:id/inventory', productController.updateInventory);

router.get('/products', productController.getAllProducts);
router.get('/products/search', productController.searchProducts);

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