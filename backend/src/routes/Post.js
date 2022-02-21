const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/Post');

router.post("/", postCtrl.addPost);
router.get('/', postCtrl.getAllPost);

module.exports = router;