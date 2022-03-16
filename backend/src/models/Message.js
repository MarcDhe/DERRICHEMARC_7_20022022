const Sequelize = require ('sequelize');

module.exports = sequelize.define("Liked", {  // ici rien de plus car defini en global precedement dans connection

  from_id: { type: Sequelize.INTEGER(11), allowNull: false,primaryKey : true},
  to_id: { type: Sequelize.INTEGER(11), allowNull: false,primaryKey : true},
  content:{ type: Sequelize.STRING(300), required: true}
  
},{timestamps: false, tableName: "Liked"})