const Post = require('../models/Post');
const fs = require('fs'); // package fs ( FileSysteme)  systeme de fichier

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

// exports.addPost = (req, res, next) => {
//   const postObject = req.body;
//   const post = new Post ({
//     ...postObject,
//     // imageUrl: `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}` 
//   })
//   post.save()
//   .then(() => res.status(201).json({ message: 'Post enregistrée !'}))
//     .catch(error => res.status(400).json({ error }));
// }

exports.getAllPost = (req, res, next) => {
  Post.findAll()
  .then((comments) => res.status(200).json(comments))
  .catch(error => res.status(400).json({ error }))
}