'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    return queryInterface.bulkInsert('Users', [
      {
        email: 'user1@gmail.com',
        password: await bcrypt.hash('password1', salt),
        username: 'user1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        
        email: 'user2@gmail.com',
        password: await bcrypt.hash('password2', salt),
        username: 'user2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        
        email: 'user3@gmail.com',
        password: await bcrypt.hash('password3', salt),
        username: 'user3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
