const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/Post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post("/",auth, multer, postCtrl.addPost);
router.get('/', postCtrl.getAllPost);
router.get('/:id', postCtrl.getOnePost)

module.exports = router;