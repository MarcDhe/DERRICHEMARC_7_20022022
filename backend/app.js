const express = require('express');
const app = express();

const bodyParser = require('body-parser');


// CONNECT TO DATABASE
require('./src/database/connection')

// INTERCEPTE TOUT LES TYPES DE REQUETES
app.use(express.json());

// CORS 'autorisation' 'd'acces/de connexion'
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json()); // va de paire avec le bodyParser d'en haut

//ROUTE USER
const userRoutes = require('./src/routes/User');
app.use('/api/auth', userRoutes);
// ROUTES COMMENT
const commentRoutes = require('./src/routes/Comment');
app.use('/api/comment', commentRoutes);



module.exports = app;