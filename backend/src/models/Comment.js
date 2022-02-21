const Sequelize = require ('sequelize');

module.exports = sequelize.define("Comment", {  // ici rien de plus car defini en global precedement dans connection
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
})
