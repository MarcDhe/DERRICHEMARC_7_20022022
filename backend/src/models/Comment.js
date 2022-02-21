const Sequelize = require ('sequelize');

module.exports = sequelize.define("Comment", {  // ici rien de plus car defini en global precedement dans connection
  id:{
    type: Sequelize.INTEGER(11),
    allowNull : false,
    autoIncrement: true,
    primaryKey : true
  },
  content: Sequelize.STRING(300),
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
})
