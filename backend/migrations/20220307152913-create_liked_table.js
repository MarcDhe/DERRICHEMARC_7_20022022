'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("Liked",{
      
      post_id: { type: Sequelize.INTEGER(11), allowNull: false, primaryKey : true },
      user_id: { type: Sequelize.INTEGER(11), allowNull: false, primaryKey : true }

  });
}, 

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("Liked");

  }
};
