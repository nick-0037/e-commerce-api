'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      CartItem.belongsTo(models.Cart, { foreignKey: 'cartId' });
      CartItem.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  CartItem.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'carts',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};