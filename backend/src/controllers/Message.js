const Message = require('../models/Message');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.newMessage = (req, res, next) => {
  const message = {
    ...req.body,
    from_id : req.auth.userId
  }
  Message.create(message)
    .then(() => res.status(200).json({ message: 'Message envoyé !'}))
    .catch(error => res.status(400).json({ error }))
}

exports.getAllMyMessage = (req, res, next ) => {
  Message.findAll({
    where: {
      [Op.or]: [ {to_id: req.auth.userId}, {from_id: req.auth.userId} ]  //SOURCE https://sequelize.org/master/manual/model-querying-basics.html
    }})
  .then((messages) => res.status(200).json(messages))
  .catch(error => res.status(400).json({ error }))
}