'use strict';

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

      return queryInterface.bulkInsert('Users', [{
        firstName: 'Sudharsan',
        lastName: 'Admin',
        email: 'sudharsan@yopmail.com',
        user_type: 2,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Sudharsan',
        lastName: 'Staff',
        email: 'sudharsanstaff@yopmail.com',
        user_type: 1,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Sudharsan',
        lastName: 'Student',
        email: 'sudharsanstudent@yopmail.com',
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
