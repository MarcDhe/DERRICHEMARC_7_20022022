'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      return queryInterface.createTable("Post",{
        _id:{
          type: Sequelize.INTEGER(11),
          allowNull : false,
          autoIncrement: true,
          primaryKey : true
        },
        title: Sequelize.STRING(125),
        content: Sequelize.STRING(300),
        imageUrl: Sequelize.STRING(255),
        likes: Sequelize.INTEGER(10),
        userLiked: Sequelize.JSON(), 
        user_id: Sequelize.INTEGER(11),
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("Post");
  }
};
