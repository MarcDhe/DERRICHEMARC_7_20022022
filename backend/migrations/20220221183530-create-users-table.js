'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("User", {
      _id:{
        type: Sequelize.INTEGER(11),
        allowNull : false,
        autoIncrement: true,
        primaryKey : true
      },
      username: {
        type: Sequelize.STRING(35),
        allowNull: false,
        unique: true
      },
      passwd: {
        type: Sequelize.STRING(65),
        allowNull: false,
      },
      avatar:  Sequelize.STRING(),
      createdAt: Sequelize.DATE(),
      
    }); //https://stackoverflow.com/questions/21114499/how-to-make-sequelize-use-singular-table-names
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("User");
  }
};
