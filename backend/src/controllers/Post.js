const Post = require('../models/Post');
const User = require('../models/User');

const Comment = require('../models/Comment')
const fs = require('fs'); // package fs ( FileSysteme)  systeme de fichier

// // Post.hasMany(Comment , {as :"Comment", foreignKey: 'post_id'});
// // Comment.belongsTo(Post, {as: "Post", foreignKey: "post_id"});
// Post.hasMany(Comment, {as : "Comment", foreignKey : 'post_id'});
// Comment.belongsTo(Post, { as: 'Post', foreignKey: 'post_id'});

exports.addPost = (req, res, next) => {
  console.log('limage est ', req.file)
  console.log('l id_user est:', req.auth.user_id)
  const postObject = req.file ?
  {
    ...req.body,
    user_id: req.auth.user_id,
    imageUrl: `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}`
  } : { 
    ...req.body,
    user_id: req.auth.user_id
  }
  Post.create(postObject)
    .then(() => res.status(200).json({ message: ' Poste crée ! '}))
    .catch(error => res.status(400).json({ error }))
}

exports.getOnePost = (req, res, next) => { // ATTENTION ENVOI LES MDP
  Post.findOne({where : {_id: req.params.id}, include:[ {model: User, as:"User"},{model : Comment, as: 'Comment', include:[{model: User, as: 'User' } ] }] }) // FAIRE TRES ATTENTION A LA NOTATION PREMIER USER POUR USER_ID DU POST DEUXIEME POOUR LES COMMENTAIRES
  // User.findAll({ where: {_id: req.params.id}, include: [{model : Post, as: 'Post'}] })
  .then((post) => {
    // if(post.length === 0 ){ // fait crash le serveur
    //   console.log('post est :',post);
    //   res.status(404).json({ error : 'Post Inexistant !'})
    // }
    res.status(200).json(post)
  })
  .catch(error => {
    console.log(error)
    return res.status(400).json({ error })})
}

exports.getAllPost = (req, res, next) => {
  Post.findAll()
  .then((posts) => res.status(200).json(posts))
  .catch(error => res.status(400).json({ error }))
}