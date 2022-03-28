const sequelize = require("../database/connection");
const { QueryTypes } = require('@sequelize/core'); // BESOIN D'INSTALLER npm i @sequelize/core , résout aussi le problème de double tableau envoyé 

exports.searchSomething = async (req, res, next ) => {
  let allResult = []
  await  sequelize.query(`SELECT id, username, avatar, firstname, lastname FROM User WHERE username LIKE :search_content OR lastname LIKE :search_content OR firstname LIKE :search_content `,
                          {
                            replacements: {search_content : `%${req.body.term}%`},
                            type: QueryTypes.SELECT
                          })
    .then((users) => {
       allResult.push({User: users})
    })
    .catch((error) => res.status(400).json({ error }))
  await  sequelize.query(`
  SELECT * FROM (SELECT id, title, content, imageUrl, createdAt, user_id FROM Post WHERE title LIKE :search_content OR content LIKE :search_content )AS Post 
  LEFT JOIN (SELECT id as userId, username, avatar From User) AS User ON Post.user_id = User.userId
  ORDER BY createdAt DESC`,
  {
    replacements: {search_content : `%${req.body.term}%`},
    type: QueryTypes.SELECT
  })
    .then((posts) => {
      allResult.push({Post: posts})
    })
    .catch((error) => res.status(400).json({ error }))
  await sequelize.query(`
  SELECT * FROM ( SELECT * FROM Comment WHERE content LIKE :search_content ) AS Comment
  LEFT JOIN ( SELECT id AS userId, username, avatar from User) AS User ON Comment.user_id = User.userId
  ORDER BY createdAt DESC`,
  {
    replacements: {search_content : `%${req.body.term}%`},
    type: QueryTypes.SELECT
  })
  .then((comments) => {
    allResult.push({Comment: comments})
  })
  .catch((error) => res.status(400).json({ error }))
    return res.status(200).json(allResult)
  }
// exports.searchSomething = (req, res, next ) => {
//   sequelize.query(`SELECT id AS id, 'User' as 'table' ,  username AS content  FROM User WHERE username LIKE '%${req.body.term}%' 
//   UNION 
//   SELECT id AS id , 'Post' AS 'table', content AS content  FROM Post WHERE content LIKE '%${req.body.term}%'  
//   UNION 
//   SELECT id AS id, 'Comment' AS 'table', content AS content FROM Comment WHERE content LIKE '%${req.body.term}%' `)
//     .then((found) => {
//       if(!found[0][0]){
//         console.log('huit')
//         return res.status(404).json({ error : 'Aucune correspondance trouvée !'})
//       }
//         return res.status(200).json(found[0])
//     })
//     .catch((error) => res.status(400).json({ error }))
// }