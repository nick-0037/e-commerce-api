const { body, query } = require('express-validator');

const productValidation = {
  addProduct: [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required'),
    body('description')
      .trim()
      .notEmpty()
      .withMessage('Description is required'),
    body('price')
      .optional()
      .isDecimal({ decimal_digits: '1,2' })
      .withMessage('Price must be a valid decimal number with up to two decimal places')
      .isFloat({ min: 0 })
      .withMessage('Price must be equal to or greater than 0'),
    body('stock')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Stock must be an integer greater than or equal to 0')
  ],
  updatePrice: [
    body('price')
      .notEmpty()
      .withMessage('Price is required')
      .isDecimal({ decimal_digits: '1,2' })
      .withMessage('Price must be a valid decimal number with up to two decimal places')
      .isFloat({ min: 0 })
      .withMessage('Price must be equal to or greater than 0')
  ],
  updateInventory: [
    body('stock')
      .notEmpty()
      .withMessage('Stock is required')
      .isInt({ min: 0 })
      .withMessage('Stock must be an integer greater than or equal to 0')
  ],
  searchProducts: [
    query('q')
      .notEmpty()
      .withMessage('Search query is required')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Search query cannot be empty')
  ]
}

module.exports = productValidation;