const { body } = require('express-validator');

const userValidation = {
  register: [
    body('email')
      .isEmail().withMessage('Invalid email format')
      .notEmpty().withMessage('Email is required'),
      
    body('username')
      .notEmpty().withMessage('Username is required'),

    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6, max: 10 }).withMessage('Password must be between 6 and 10 characters long'),
  ],

  login: [
    body('username')
      .notEmpty().withMessage('Username is required'),

    body('password')
      .notEmpty().withMessage('Password is required')
  ]
};

module.exports = userValidation;