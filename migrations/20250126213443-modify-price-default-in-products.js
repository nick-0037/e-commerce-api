'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Products', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Products', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    });
  }
};
