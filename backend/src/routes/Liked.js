const express = require('express');
const router = express.Router();

const ctrlLike = require('../controllers/Liked');
const auth = require('../middleware/auth');

router.post('/:id', auth, ctrlLike.manageLike)

module.exports = router;
