const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


exports.signUp = (req, res, next) => {
  bcrypt.hash(req.body.passwd, 10) // renvoi une promesse
    .then(hash=> {
       user = new User ({
        username: req.body.username,
        passwd: hash
      });
      user.save()
        .then(() => res.status(201).json({ message : 'Utilisateur crée !'}))
        .catch(error => res.status(400).json({ error }));
    })
  .catch( error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {

}