'use strict';
const bcrypt = require('bcrypt');
const { BLOB } = require('sequelize/types');


module.exports = {
  async up (queryInterface, Sequelize) { // SOURCE: https://sequelize.org/master/manual/migrations.html#:~:text=Creating%20the%20first-,Seed,-Suppose%20we%20want
    const password = await bcrypt.hash('password',10)
        .then(hash => {return hash})
    for(let i=0; i<7 ; i++){
      await queryInterface.bulkInsert('User', [{
        username: 'boby'+i,
        passwd: password,
        lastname: bob, 
        firstname: dylan, 
        avatar: `http://localhost:3000/pictures/avatars/default_avatar.png`,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
      }]);
    }
    const adminPassword = await bcrypt.hash('admin',10)
    .then(hash => {return hash});

    await queryInterface.bulkInsert('User', [{
      username: 'admin',
      passwd: adminPassword,
      avatar: `http://localhost:3000/pictures/avatars/default_avatar.png`,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
      power: 'admin'
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User', null, {});
  }
};
