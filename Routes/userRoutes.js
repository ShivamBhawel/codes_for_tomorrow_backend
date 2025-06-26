const express = require('express');
const {signup,login,forgot,reset} = require('../controller/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgot);
router.post('/reset-password/:token', reset);


module.exports = router;
