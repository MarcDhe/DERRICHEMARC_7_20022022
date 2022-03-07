'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("Liked",{
      id:{
        type: Sequelize.INTEGER(11),
        allowNull : false,
        autoIncrement: true,
        primaryKey : true
      },
      post_id: { type: Sequelize.INTEGER(11), allowNull: false },
      user_id: { type: Sequelize.INTEGER(11), allowNull: false }

  });
}, 

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("Liked");

  }
};
