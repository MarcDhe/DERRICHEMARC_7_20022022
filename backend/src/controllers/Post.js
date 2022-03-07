const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment')

const fs = require('fs'); // package fs ( FileSysteme)  systeme de fichier
const Liked = require('../models/Liked');


exports.addPost = (req, res, next) => {
  console.log('limage est ', req.file)
  const postObject = req.file ?
  {
    ...JSON.parse(req.body.post),
    user_id: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}`
  } : { 
    ...JSON.parse(req.body.post),
    user_id: req.auth.userId
  }
  Post.create(postObject)
    .then(() => res.status(200).json({ message: ' Poste crée ! '}))
    .catch(error => res.status(400).json({ error }))
}

exports.getOnePost = (req, res, next) => { // ATTENTION ENVOI LES MDP
  Post.findOne({where: {id: req.params.id}, include:[{model: Liked, as:"Liked"},{model: User, as:"User"},{model : Comment, as: 'Comment', include:[{model: User, as: 'User' } ] }] }) // FAIRE TRES ATTENTION A LA NOTATION PREMIER USER POUR USER_ID DU POST DEUXIEME POOUR LES COMMENTAIRES
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

exports.updateOne = (req, res, next ) => {
  Post.findOne({where: {id: req.params.id}})
    .then((post) => {
      if(!post){
        res.status(404).json({ error: 'Post non trouvé !'})
      }
      if(post.user_id !== req.auth.userId){
        res.status(403).json({ error: 'requete non autorisé !'})
      }else{
        console.log('tata',req.body.post)
      const postObject = req.file? 
        {
          ...JSON.parse(req.body.post),  // attention ici l'info n'arrive pas de la meme façon que la P6
          imageUrl: `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}`
        } 
        : { ...JSON.parse(req.body.post) };
      if(req.file){
        console.log('dans le delete img')
        const filename = post.imageUrl.split('/pictures')[1]; // recup du nom du fichier pour le supprimé
        fs.unlink(`pictures/${filename}`, () => {
          console.log('File is deleted ')  // voir pour remove plus tard une fois essay concluent 
        })
      }
      Post.update({...postObject},{where: {id : req.params.id}}) // ATTENTION ICI ORDRE DIFFERENT DE MONGODB
        .then(() => res.status(200).json({ message: 'Post modifié!'}))
        .catch(error => res.status(400).json({ error }));
    }
    })
    .catch(error => res.status(500).json({ error }));
}

exports.deleteOnePost = (req, res, next) => {
  Post.findOne({where: {id: req.params.id}})
    .then((post) => {
      if(!post){
        res.status(404).json({ error: 'Post non trouvée !'})
      }
      if(post.user_id !== req.auth.userId){
        res.status(403).json({ error: 'Requête non authorisée !'})
      }
      const filename = post.imageUrl.split('/pictures')[1]; // recup du nom du fichier pour le supprimé
      fs.unlink(`pictures/${filename}`, () => {
      console.log('File is deleted ')  // voir pour remove plus tard une fois essay concluent
      })
      Post.destroy({where: {id : req.params.id}})
      .then(()=> res.status(200).json({ message : 'Post supprimé !'}))
      .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error })); 
}


// ATTENTION ICI POUR LA GESTION TABLEAU 
// exports.addLike = (req, res, next) => {
//   Post.findOne({ where: {id: req.params.id}})
//   .then(post => {
//   if(like === 1 && post.likes.include(req.auth.userId)){
//     Post
//   }
//   }
// }

// exports.tryUpFile = (req, res, next) => {
//   console.log('limage est ', req.file)
//   const postObject = 
//   {
//     user_id: req.auth.userId,
//     imageUrl: `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}`
//   } 
//   Post.create(postObject)
//     .then(() => res.status(200).json({ message: ' Poste crée ! '}))
//     .catch(error => res.status(400).json({ error }))
// }