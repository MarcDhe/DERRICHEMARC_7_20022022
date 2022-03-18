const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/Message');
const auth = require('../middleware/auth');

router.post('/new', auth, messageCtrl.newMessage),
router.get('/', auth, messageCtrl.getAllMyMessage),

module.exports = router;
