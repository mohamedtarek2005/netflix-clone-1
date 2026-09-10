const express = require('express');
const userController = require('../controller/userController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/me', authenticate, userController.me);

module.exports = router;
