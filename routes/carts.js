const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/auth');

const express = require('express');
const router = express.Router();

router.post('/cart/:userId',authMiddleware, cartController.addToCart);
router.delete('/cart/:userId/:productId', authMiddleware, cartController.removeFromCart);
router.get('/cart/:userId/clear', authMiddleware, cartController.clearCart);

router.post('/cart/:userId/checkout', cartController.checkout);
router.post('/cart/:userId/checkout/completed', cartController.completedCheckout);
router.post('/cart/:userId/checkout/cancelled', cartController.cancelledCheckout);

module.exports = router;