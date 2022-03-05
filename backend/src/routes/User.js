const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/User');
const auth = require('../middleware/auth');

router.post("/signup", userCtrl.signUp);
router.post('/login', userCtrl.login);
router.get('/user', auth, userCtrl.foundUser); // attention remettre la route des auth 

module.exports = router;