const Post = require('../models/Post');

exports.addPost = (req, res, next) => {
console.log('le user ID est ', req.auth.userId)  // on recupere le user id suit au req.auth = passé dans le middle authorisation
  let newPost = {
    ...req.body,
    user_id: req.auth.userId
  };
  Post.create(newPost)
    .then(() => res.status(200).json({ message: ' Poste crée ! '}))
    .catch(error => res.status(400).json({ error }))
}

exports.getAllPost = (req, res, next) => {
  Post.findAll()
  .then((comments) => res.status(200).json(comments))
  .catch(error => res.status(400).json({ error }))
}