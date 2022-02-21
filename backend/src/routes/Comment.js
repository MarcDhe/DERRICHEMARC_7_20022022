const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/Comment');

router.post("/", commentCtrl.addComment);
router.get('/', commentCtrl.getAllComment);

module.exports = router;