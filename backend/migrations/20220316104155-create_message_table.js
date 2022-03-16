'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("Message",{

      from_id: { type: Sequelize.INTEGER(11), allowNull: false,primaryKey : true},
      to_id: { type: Sequelize.INTEGER(11), allowNull: false,primaryKey : true},
      content:{ type: Sequelize.STRING(300), required: true}

    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("Message");
  }
};
