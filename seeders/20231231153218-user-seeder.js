'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash('123', salt);

      return queryInterface.bulkInsert('Users', [{
        firstName: 'Sudharsan',
        lastName: 'Admin',
        email: 'sudharsan@yopmail.com',
        password: passwordHashed,
        user_type: 2,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Sudharsan',
        lastName: 'Staff',
        email: 'sudharsanstaff@yopmail.com',
        password: passwordHashed,
        user_type: 1,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Sudharsan',
        lastName: 'Student',
        email: 'sudharsanstudent@yopmail.com',
        password: passwordHashed,
        user_type: 0,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
