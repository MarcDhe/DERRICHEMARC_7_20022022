const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/User');

router.post("/signup", userCtrl.signUp);
router.post('/login', userCtrl.login);
// router.post('/user', userCtrl.foundUser);

module.exports = router;