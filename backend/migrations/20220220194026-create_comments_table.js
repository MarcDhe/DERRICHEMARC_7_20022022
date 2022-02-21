'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("Comments",{
      _id:{
        type: Sequelize.INTEGER(11),
        allowNull : false,
        autoIncrement: true,
        primaryKey : true
      },
      content: Sequelize.STRING(300),
      post_id: Sequelize.INTEGER,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
    
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.dropTable("Comments");
  }
};
