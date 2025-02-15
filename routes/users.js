const userController = require('../controllers/userController');
const userValidation = require('../validations/userValidation');
const validationMiddleware = require('../middlewares/validationMiddleware');

const express = require('express');
const router = express.Router();

router.post('/register', userValidation.register, validationMiddleware, userController.register);
router.get('/login', userValidation.login, validationMiddleware, userController.login);

module.exports = router;