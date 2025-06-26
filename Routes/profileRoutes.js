const express = require('express');
const { me } = require('../controller/profileController');
const protect = require('../middleware/auth');
const router = express.Router();

router.get('/me', protect, me);

module.exports = router;
