
const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');

// // RELATION  ON TO MANY user --> comment
User.hasMany(Comment, {as : "Comment", foreignKey : 'user_id'});
Comment.belongsTo(User, { as: 'User', foreignKey: 'user_id'});

// RELATION  ON TO MANY user --> post
User.hasMany(Post, {as : "Post", foreignKey : 'user_id'});
Post.belongsTo(User, { as: 'User', foreignKey: 'user_id'});

// // RELATION  ON TO MANY post --> comment
Post.hasMany(Comment, {as : "Comment", foreignKey : 'post_id'});
Comment.belongsTo(Post, { as: 'Post', foreignKey: 'post_id'});

// A REVOIR est ellt utile egalement ?
// RELATION  ON TO MANY post --> comment  une post plusieur id d'utilisateur via les commentaires
// Post.hasMany(Comment, {as : "Comment", foreignKey : 'user_id'});
// Comment.belongsTo(Post, { as: 'Post', foreignKey: 'post_user_id'});

