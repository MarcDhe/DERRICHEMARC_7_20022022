'use strict';
const bcrypt = require('bcrypt');


module.exports = {
  async up (queryInterface, Sequelize) { // SOURCE: https://sequelize.org/master/manual/migrations.html#:~:text=Creating%20the%20first-,Seed,-Suppose%20we%20want
    const password = await bcrypt.hash('password',10)
        .then(hash => {return hash})
    for(let i=0; i<7 ; i++){
      await queryInterface.bulkInsert('User', [{
        username: 'boby'+i,
        passwd: password,
        avatar: `http://localhost:3000/pictures/avatars/default_avatar.png`,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
      }]);
    }
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User', null, {});
  }
};
