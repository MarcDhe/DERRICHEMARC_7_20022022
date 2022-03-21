const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/Message');
const auth = require('../middleware/auth');

router.post('/new', auth, messageCtrl.newMessage),
router.get('/', auth, messageCtrl.getAllMyMessage),
router.get('/:id', auth, messageCtrl.getConversation)
router.get('/:id/read', auth, messageCtrl.markReaded)
module.exports = router;
