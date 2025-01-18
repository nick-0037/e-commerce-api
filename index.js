require('dotenv').config();
const express = require('express');
const userController = require('./controllers/userController');

const app = express();

app.use(express.json());

const router = express.Router();

router.get('/register', userController.register);
router.post('/login', userController.login);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});