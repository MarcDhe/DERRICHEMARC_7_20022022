
const Comment = require('../models/Comment');
const User = require('../models/User')
const Post = require('../models/Post');
const Liked = require('../models/Liked');


// // RELATION  ON TO MANY user --> comment
User.hasMany(Comment, {as : "Comment", foreignKey : 'user_id', onDelete:'CASCADE'});
Comment.belongsTo(User, { as: 'User', foreignKey: 'user_id', });

// RELATION  ON TO MANY user --> post
User.hasMany(Post, {as : "Post", foreignKey : 'user_id', onDelete:'CASCADE'});
Post.belongsTo(User, { as: 'User', foreignKey: 'user_id'});

// // RELATION  ON TO MANY post --> comment
Post.hasMany(Comment, {as : "Comment", foreignKey : 'post_id', onDelete: 'CASCADE'});
Comment.belongsTo(Post, { as: 'Post', foreignKey: 'post_id'});

// RELATION MANY TO MANY user <--> liked
// User.belongsToMany(Liked , {as: "Liked", foreignKey: "liked_user_id"})
// Liked.belongsToMany(User, {as: "Liked", foreignKey: "liked_user_id"})

// RELATION One TO MANY post --> liked
Post.hasMany(Liked , {as: "Liked", foreignKey:'post_id'})
Liked.belongsTo(Post, {as: "Post", foreignKey: 'post_id'})

// // RELATION  ON TO MANY USER --> LIKE
User.hasMany(Liked, {as: "Liked", foreignKey:'user_id', onDelete:'CASCADE'});
Liked.belongsTo(User, {as: "User", foreignKey: 'user_id'})

