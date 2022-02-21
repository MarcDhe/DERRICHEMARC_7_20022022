const Sequelize = require ('sequelize');

module.exports = sequelize.define("Post", {  // ici rien de plus car defini en global precedement dans connection
  _id:{
    type: Sequelize.INTEGER(11),
    allowNull : false,
    autoIncrement: true,
    primaryKey : true
  },
  content: Sequelize.STRING(300),
  user_user_id: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
})
