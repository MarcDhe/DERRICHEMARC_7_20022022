const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


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
  User.findOne({ username: req.body.username })
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
            userId: user._id,
            token: jwt.sign( // CREATION DU TOKEN
              {userId: user._id}, // user du token
              `TEST_TOKEN`, // A MODIF AVANT PRODUCTION
              {expiresIn: '24h'} // A MODIF AVANT PRODUCTION
            )
          })
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}