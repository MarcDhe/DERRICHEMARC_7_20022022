const Comment = require('../models/Comment');

exports.addComment = (req, res, next) => {
  let newComment = {content: req.body.content};
  Comment.create(newComment)
    .then(() => res.status(200).json({ message: ' Commentaire crée ! '}))
    .catch( error => res.status(400).json({ error }))
}

exports.getAllComment = (req, res, next) => {
  Comment.findAll()
    .then((comments) => res.status(400).json(comments))
    .catch( error => res.status(400).json({ error }))
}