'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      return queryInterface.createTable("Posts",{
        _id:{
          type: Sequelize.INTEGER(11),
          allowNull : false,
          autoIncrement: true,
          primaryKey : true
        },
        title: Sequelize.STRING(125),
        content: Sequelize.STRING(300),
        user_user_id: Sequelize.INTEGER,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("Posts");
  }
};
