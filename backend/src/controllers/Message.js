const Message = require('../models/Message');
const User= require('../models/User')
const Post=require('../models/Post')

const Sequelize = require('sequelize');
const sequelize = require('../database/connection');
const Op = Sequelize.Op;

exports.newMessage = (req, res, next) => {
  if(req.body.content == ""){
    return res.status(400).json({ error })
  }
  const message = {
    ...req.body,
    from_id : req.auth.userId
  }
  Message.create(message)
    .then(() => res.status(200).json({ message: 'Message envoyé !'}))
    .catch(error => res.status(400).json({ error }))
}

exports.getConversation = (req, res, next) => {
  Message.findAll({
    where: {
      [Op.or]: [ {to_id: req.params.id, from_id:req.auth.userId}, {from_id: req.params.id, to_id: req.auth.userId} ],  //SOURCE https://sequelize.org/master/manual/model-querying-basics.html
      },
    order:[['createdAt', 'DESC']],
    limit: req.body.limit
    })
    .then((conversation) => {
      if(!conversation[0]){
       return res.status(404).json({ error : 'Aucune Conversation trouvée'})
      }
      return res.status(200).json(conversation)
    })
    .catch((error) => res.status(400).json({ error }))
}

exports.markReaded = (req, res, next) => {
  Message.findAll({ where: {from_id: req.params.id, to_id: req.auth.userId, readedAt:null }})
    .then((messages) => {
      const localTime = new Date();
      for(let i in messages){
        messages[i].update({ readedAt: localTime})
          .catch((error) => {return res.status(400).json({ error })})
      }
      return res.status(200).json({ message : 'Message(s) marqué(s) lu(s) !'})
    })
}

exports.lastMessages = (req, res, next) => {
  sequelize.query(`
  SELECT * FROM 
  (SELECT 
    DISTINCT CASE WHEN to_id = ${req.auth.userId} THEN from_id ELSE to_id END AS user_id,
    CASE WHEN from_id = ${req.auth.userId} THEN 'sended' ELSE 'received' END as status, 
    content, createdAt, id 
  FROM message 
  WHERE to_id=${req.auth.userId} OR from_id=${req.auth.userId} 
  ORDER BY createdAt DESC)
  AS message
  LEFT JOIN (SELECT username, avatar, id AS user_id  FROM User )
  AS User  
  ON message.user_id = User.user_id
  ORDER BY createdAt DESC`)
    .then((messages) =>res.status(200).json(messages[0]))
    .catch((error) => res.status(400).json({ error }))
}

// exports.getAllMyMessage = (req, res, next ) => {
//   sequelize.query(`
// SELECT * FROM message M
// LEFT OUTER JOIN User AS User  ON M.from_id = User.id 
//  						 AND M.to_id = 4
//  					 OR M.to_id = User.id
// 					  	AND M.from_id = 4`)
//   //ATTENTION ON RECOIT 2 TABLEAU
//   .then((messages) => res.status(200).json(messages))
//   .catch(error => res.status(400).json({ error }))
// }


exports.getAllMyMessage = (req, res, next ) => { //https://stackoverflow.com/questions/3057746/how-to-count-null-values-in-mysql
  console.log('user est ',req.auth.userId)
  sequelize.query(`  
  SELECT * FROM 
    (SELECT 
      DISTINCT CASE WHEN to_id = ${req.auth.userId} THEN from_id ELSE to_id END AS user_id, 
      MAX(createdAt) as createdAt,sum(case when readedAt IS null AND to_id= ${req.auth.userId} then 1 else 0 end) as not_read 
      FROM message 
      WHERE to_id=${req.auth.userId} OR from_id=${req.auth.userId}
	    GROUP BY user_id
	    ORDER BY createdAt DESC ) 
    AS message 
  LEFT JOIN (SELECT username, avatar, id AS user_id  FROM User )
  AS User  
  ON message.user_id = User.user_id;`)
  //ATTENTION ON RECOIT 2 TABLEAU
  .then((messages) => res.status(200).json(messages[0]))
  .catch(error => res.status(400).json({ error }))
}
// SELECT 
// DISTINCT CASE WHEN to_id = ${req.auth.userId} THEN from_id ELSE to_id END AS user_id,
// MAX(createdAt) as createdAt,sum(case when readedAt IS null AND to_id= ${req.auth.userId} then 1 else 0 end) as not_read 
// FROM message group by user_id ORDER BY createdAt desc;

// sequelize.query(`   // AVANT MODIF
// SELECT
//   DISTINCT CASE WHEN to_id = ${req.auth.userId} THEN from_id ELSE to_id END AS user_id,
//   SUM(CASE WHEN readedAt IS null AND to_id = ${req.auth.userId} THEN 1 else 0 END) AS not_read,
//   MAX(createdAt) AS createdAt  
// FROM Message  WHERE from_id = ${req.auth.userId} 
// GROUP BY to_id ORDER BY createdAt desc`)
// exports.getAllMyMessage = (req, res, next ) => {
//   Message.findAll({
//     where: {
//       [Op.or]: [ {to_id: req.auth.userId}, {from_id: req.auth.userId} ]  //SOURCE https://sequelize.org/master/manual/model-querying-basics.html
//     }})
//   .then((messages) => res.status(200).json(messages))
//   .catch(error => res.status(400).json({ error }))
// }


// SELECT DISTINCT CASE WHEN to_id = 2 THEN from_id ELSE to_id END, COUNT(case when readedAt = null then 1 else 0 end) as not_read  from MESSAGE  where from_id = 2 group by to_id;