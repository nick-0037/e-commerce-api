require('dotenv').config();
const express = require('express');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController')

const app = express();

app.use(express.json());

const router = express.Router();

router.get('/register', userController.register);
router.post('/login', userController.login);

router.post('/admin/products/:id', productController.addProduct);
router.patch('/admin/products/:id/price', productController.updatePrice);
router.patch('/admin/products/:id/inventory', productController.updateInventory);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});