const Sequelize = require('sequelize');

const sequelize = new Sequelize("groupomania", "landser", "",
{
  host : "127.0.0.1",
  dialect: "mysql",
});

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})


// sequelize.sync({ force: false })  // FORCE A CREER LES TABLES SI ELLES NE LE SONT PAS 
// .then(() => {                       // probleme crée automatiquement createdAT et updateAt meme sur le user
//     console.log('yes re-sync done!')
// })

module.exports = sequelize;
global.sequelize = sequelize; // mis en global pour ne pas avoir a le declarer systematiqeuement