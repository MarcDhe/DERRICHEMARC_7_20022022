const Post = require('../models/Post');
const Comment = require('../models/Comment')
const fs = require('fs'); // package fs ( FileSysteme)  systeme de fichier

// // Post.hasMany(Comment , {as :"Comment", foreignKey: 'post_id'});
// // Comment.belongsTo(Post, {as: "Post", foreignKey: "post_id"});
// Post.hasMany(Comment, {as : "Comment", foreignKey : 'post_id'});
// Comment.belongsTo(Post, { as: 'Post', foreignKey: 'post_id'});

exports.addPost = (req, res, next) => {
  console.log('limage est ', req.file)
  const postObject = req.file ?
  {
    ...req.body,
    user_id: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}`
  } : { 
    ...req.body,
    user_id: req.auth.userId
  }
  Post.create(postObject)
    .then(() => res.status(200).json({ message: ' Poste crée ! '}))
    .catch(error => res.status(400).json({ error }))
}

exports.getOnePost = (req, res, next) => {
  Post.findAll({where : {_id: req.params.id}, include:[ {model : Comment, as: 'Comment' }] })
  .then((post) => {
    // if(post.length === 0 ){ // fait crash le serveur
    //   console.log('post est :',post);
    //   res.status(404).json({ error : 'Post Inexistant !'})
    // }
    res.status(200).json(post)
  })
  .catch(error => res.status(400).json({ error }))
}

exports.getAllPost = (req, res, next) => {
  Post.findAll()
  .then((posts) => res.status(200).json(posts))
  .catch(error => res.status(400).json({ error }))
}