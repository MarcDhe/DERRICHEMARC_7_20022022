const Message = require('../models/Message');

const Sequelize = require('sequelize');
const sequelize = require('../database/connection');
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
  sequelize.query('SELECT DISTINCT CASE WHEN to_id = 2 THEN from_id ELSE to_id END AS to_id, COUNT(case when readedAt = null then 1 else 0 end) as not_read  from MESSAGE  where from_id = 2 group by to_id LEFT OUTER JOIN User AS User ON to_id = user.id')
  //ATTENTION ON RECOIT 2 TABLEAU
  .then((messages) => res.status(200).json(messages[0]))
  .catch(error => res.status(400).json({ error }))
}

// exports.getAllMyMessage = (req, res, next ) => {
//   Message.findAll({
//     where: {
//       [Op.or]: [ {to_id: req.auth.userId}, {from_id: req.auth.userId} ]  //SOURCE https://sequelize.org/master/manual/model-querying-basics.html
//     }})
//   .then((messages) => res.status(200).json(messages))
//   .catch(error => res.status(400).json({ error }))
// }


// SELECT DISTINCT CASE WHEN to_id = 2 THEN from_id ELSE to_id END, COUNT(case when readedAt = null then 1 else 0 end) as not_read  from MESSAGE  where from_id = 2 group by to_id;