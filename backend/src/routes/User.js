const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/User');
const auth = require('../middleware/auth');
//ATTENTION IMPORTATION DUN AUTRE MULTER QUI ENVOI VERS LES /PICTURES/AVATARS
const multerAvatar = require('../middleware/multer-avatar');

router.post("/signup", userCtrl.signUp);
router.post('/login', userCtrl.login);
router.get('/user', auth, userCtrl.foundUser);  
router.post('/user/avatar', auth, multerAvatar, userCtrl.updateAvatar);
router.post('/user/password', auth, userCtrl.changePassword)
router.delete('/user/delete', auth, userCtrl.deleteUser);
router.post('/message', auth, userCtrl.toUserMessage);

module.exports = router;