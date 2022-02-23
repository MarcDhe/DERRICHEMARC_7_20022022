const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/Comment');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/:id',auth, multer, commentCtrl.addComment);
router.get('/:id', commentCtrl.getAllComment);

module.exports = router;