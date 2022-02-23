'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("Comment",{
      _id:{
        type: Sequelize.INTEGER(11),
        allowNull : false,
        autoIncrement: true,
        primaryKey : true
      },
      content: Sequelize.STRING(300),
      imageUrl: Sequelize.STRING(255),
      user_id: Sequelize.INTEGER(11),
      post_id: Sequelize.INTEGER(11),
      post_user_id : Sequelize.INTEGER(11),
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
    
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.dropTable("Comment");
  }
};
