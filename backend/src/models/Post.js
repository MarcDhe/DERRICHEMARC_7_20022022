const Sequelize = require ('sequelize');

module.exports = sequelize.define("Post", {  // ici rien de plus car defini en global precedement dans connection
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
  // userLiked: Sequelize.ARRAY(Sequelize.STRING), // attention ici pour le test , va manqué de place a mon avis
  user_id: Sequelize.INTEGER(11),

},{tableName: "post"})
