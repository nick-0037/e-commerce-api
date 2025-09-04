'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn("carts", "status", "paymentStatus")
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("carts", "paymentStatus", "status")
  }
};
