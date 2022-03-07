const Sequelize = require ('sequelize');

module.exports = sequelize.define("Liked", {  // ici rien de plus car defini en global precedement dans connection
  id:{
    type: Sequelize.INTEGER(11),
    allowNull : false,
    autoIncrement: true,
    primaryKey : true
  },
  post_id: { type: Sequelize.INTEGER(11), allowNull: false},
  user_id: { type: Sequelize.INTEGER(11), allowNull: false}
  
},{timestamps: false, tableName: "Liked"})
