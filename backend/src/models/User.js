const Sequelize = require ('sequelize');

module.exports = sequelize.define("User", {  // ici rien de plus car defini en global precedement dans connection
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
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
})
