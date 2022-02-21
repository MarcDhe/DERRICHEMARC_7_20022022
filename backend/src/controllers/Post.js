const Post = require('../models/Post');

exports.addPost = (req, res, next) => {
  let newPost = {content: req.body.content};
  Post.create(newPost)
    .then(() => res.status(200).json({ message: ' Poste crée ! '}))
    .catch( error => res.status(400).json({ error }))
}

exports.getAllPost = (req, res, next) => {
  Post.findAll()
  .then((comments) => res.status(400).json(comments))
  .catch( error => res.status(400).json({ error }))
}