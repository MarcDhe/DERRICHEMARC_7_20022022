const sequelize = require("../database/connection")

exports.searchSomething = (req, res, next ) => {
  sequelize.query(`SELECT id AS id, 'User' as 'table' ,  username AS content  FROM User WHERE username LIKE '%${req.body.term}%' 
  UNION 
  SELECT id AS id , 'Post' AS 'table', content AS content  FROM Post WHERE content LIKE '%${req.body.term}%'  
  UNION 
  SELECT id AS id, 'Comment' AS 'table', content AS content FROM Comment WHERE content LIKE '%${req.body.term}%' `)
    .then((found) => {
      if(!found[0][0]){
        console.log('huit')
        return res.status(404).json({ error : 'Aucune correspondance trouvée !'})
      }
        return res.status(200).json(found[0])
    })
    .catch((error) => res.status(400).json({ error }))
}