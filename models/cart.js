'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: 'userId'})
      Cart.belongsToMany(models.Product, { through: 'CartItem', foreignKey: 'cartId'})
    }
  }
  Cart.init({
    status: DataTypes.ENUM,
    values: ['pending', 'completed', 'cancelled'],
    defaultValue: 'pending'
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};