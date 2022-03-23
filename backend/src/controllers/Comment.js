const Comment = require('../models/Comment');
const Liked = require('../models/Liked');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;


exports.addComment = (req, res, next) => {
  if(req.body.content == ''){
    return res.status(400).json({ error : 'Contenu obligatoire !'})
  }
  let newComment = {
    user_id: req.auth.userId,
    post_id: req.params.id,
    ...req.body
  };
  Comment.create(newComment)
    .then((createOne) => res.status(200).json(createOne))
    .catch( error => res.status(400).json({ error }))
}

exports.getAllComment = (req, res, next) => {
  Comment.findAll({where: {post_id: req.params.id}})
    .then((comments) => res.status(400).json(comments))
    .catch( error => res.status(400).json({ error }))
}

exports.deleteComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id }})
    .then((comment) => {
      if(!comment){
        return res.status(404).json({ error: 'Commentaire non trouvé !'})
      }
      if(comment.user_id !== req.auth.userId && req.auth.power !== 'admin'){
        return res.status(403).json({ error : 'Requete non autorisé !'})
      }
      comment.destroy()
      .then(()=> res.status(200).json({ message: 'Commentaire supprimé !'}))
      .catch(error => res.status(400).json({ error }))
    })
    .catch( error => res.status(500).json({ error }))
}

exports.updateComment = (req, res, next) => { // RIP CETTE ROUTE EN ATTENTE 
  if(req.body.content == ''){
    return res.status(400).json({ error : 'Contenu obligatoire !'})
  }
  Comment.findOne({where: {id: req.params.id}})
    .then(comment => {
      console.log(req.body.content)
      if(!comment){
        return res.status(200).json({ message: 'Commentaire non trouvé !'})
      }
    if(comment.user_id !== req.auth.userId && req.auth.power !== 'admin'){
      return res.status(403).json({ error : 'Requete non autorisé !'})
    }
    comment.update({content: req.body.content})
      .then(() => res.status(200).json({ message: 'Commentaire mise à jour !'}))
      .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
  }


  exports.getAllUserComment = (req, res, next) => {
    Comment.findAll({ where:{user_id: req.auth.userId},
                    order:[['createdAt', 'DESC']]})  
      .then((comments) => res.status(200).json(comments))
      .catch(error => res.status(400).json({ error }))
  }
  

    
  // Comment.findAll({
  //   where: { post_id: req.params.id}, 
  //   and: { user_id: req.auth.userId },
  //   and: {[Op.like]: '%' + request.body.content + '%'} // marche pas pour la date 
  // })
  // const test = 'select * from comment'
  // const requestSQL = `SELECT * FROM comment WHERE post_id=${req.params.id} AND user_id=${req.auth.userId} AND createdAt LIKE '%${req.body.createdAt}%' LIMIT 1`
  // const base =  sequelize.query(requestSQL)
  //   .then((comment) => {
  //     if(!comment){
  //       return res.status(404).json({ error: 'Commentaire non trouvé !'})
  //     }
  //     // if(comment.user_id !== req.auth.userId){
  //     //   return res.status(403).json({ error : 'Requete non autorisé !'})
  //     // }
  //     console.log('tat',comment[0][0])
  //     Comment.update( { where :{id: comment[Ø][0].id }},{content : req.body.content})
  //     .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))
  //     .catch( error => res.status(500).json({ error }))
  //   })
    

