const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/auth');

const express = require('express');
const router = express.Router();

router.post('/cart/:userId',authMiddleware, cartController.addToCart);
router.get('/cart/:userId', authMiddleware, cartController.getCartByUser)
router.delete('/cart/:userId/:productId', authMiddleware, cartController.removeFromCart);
router.get('/cart/:userId/clear', authMiddleware, cartController.clearCart);

module.exports = router;