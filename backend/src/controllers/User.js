const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const fs = require('fs');



exports.signUp = (req, res, next) => {
  bcrypt.hash(req.body.passwd, 10) // renvoi une promesse
    .then(hash=> {
       const user = new User ({   // ATENTION  PROBLEME VEUT ABSOLUMENT CR2E UNE DATE updated created
        username: req.body.username,
        passwd: hash
      });
      user.save()
        .then(() => res.status(201).json({ message : 'Utilisateur crée !'}))
        .catch(error => res.status(400).json({ error }));
    })
  .catch( error => res.status(500).json({ error }))
}

// exports.login = (req, res, next ) => {    // TEST FORMAT DU USER 
//   User.findOne({ username: req.body.username })
//     .then((userss) => res.status(200).json(userss))
// }

exports.login = (req, res, next) => {
  User.findOne({where: {username: req.body.username}}) // ATTENTION ICI UTILISATION DU WHERE !NOSQL
    .then(user => {
      if(!user){
        return res.status(401).json({ error : 'Utilisateur non trouvé !'});
      }
      bcrypt.compare(req.body.passwd, user.passwd)
        .then(valid => {
          if(!valid){
            return res.status(401).json({ error : 'Mot de passe incorect !'});
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign( // CREATION DU TOKEN
              {userId: user.id}, // user du token
              `TEST_TOKEN`, // A MODIF AVANT PRODUCTION
              {expiresIn: '24h'} // A MODIF AVANT PRODUCTION
            )
          })
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}

exports.foundUser = ( req, res, next)=>{  
  User.findOne({where:{id : req.auth.userId}}) // attention ici modif pour test
    .then((user) => {
      const userInfo = {  // pour ne pas transmetter le mot de passe
        id : user.id,
        username : user.username,
        avatar : user.avatar,
        createdAt : user.createdAt
      }
      res.status(200).json(userInfo)})
}

exports.updateAvatar = (req, res, next ) => {
  User.findOne({where:{id : req.auth.userId}})
  .then((user) => {
    if(!user){
      return res.status(404).json({ error: "Utilisateur inexistant !"})
    } 
    // passage du userId dans le req.auth donc automatiquement le proprietaire
    const userAvatar = { avatar: `${req.protocol}://${req.get('host')}/pictures/avatars/${req.file.filename}`}
      if(user.avatar !== `http://localhost:3000/pictures/avatars/default_avatar.png`){
        const filename = user.avatar.split('/pictures/avatars/')[1]; // recup du nom du fichier pour le supprimé
        console.log("filname est :", filename)
        fs.unlink(`pictures/avatars/${filename}`, () => {
        console.log('File is deleted ')  // voir pour remove plus tard une fois essay concluent
        })
    }
    User.update(userAvatar,{where: {id : req.auth.userId}}) // ATTENTION ICI ORDRE DIFFERENT DE MONGODB
        .then(() => res.status(200).json({ message: 'Avatar modifié!'}))
        .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(400).json({ error }))
}

exports.changePassword = (req, res, next) => {
  User.findOne({where:{id : req.auth.userId}})
  .then((user) => {
    if(!user){
      return res.status(404).json({ error: "Utilisateur inexistant !"})
    }
    if(req.body.newPassword !== req.body.newPasswordCheck || req.body.newPassword == ""){
      return res.status(400).json({ error: "Nouveau mot de passe incorrecte"})
    }
    bcrypt.compare(req.body.currentPassword, user.passwd)
        .then(valid => {
          if(!valid){
            return res.status(401).json({ error : 'Mot de passe incorect !'});
          }
          bcrypt.hash(req.body.newPassword, 10) // renvoi une promesse
          .then(hash=> {
            const userPassword = { passwd: hash };
            user.update(userPassword)
              .then(() => res.status(200).json({ message: 'Mot de passe modifié !'}))
              .catch( error => res.status(400).json({ error })); 
          })
          .catch( error => res.status(500).json({ error }));
        })
        .catch( error => res.status(500).json({ error }));  
  })
  .catch( error => res.status(500).json({ error }));  
}

exports.deleteUser = (req, res, next) => {
  User.findOne({where:{id : req.auth.userId}})
    .then((user) => {
      if(!user){
        return res.status(404).json({ error: "Utilisateur inexistant !"})
      }
      if(user.avatar !== `http://localhost:3000/pictures/avatars/default_avatar.png`){
        const filename = user.avatar.split('/pictures/avatars/')[1]; // recup du nom du fichier pour le supprimé
        fs.unlink(`pictures/avatars/${filename}`, () => {
        console.log('File is deleted ')  // voir pour remove plus tard une fois essay concluent
        })

      }
      user.destroy()
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(400).json({ error }))
}
