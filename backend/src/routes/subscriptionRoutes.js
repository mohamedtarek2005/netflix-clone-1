const express = require('express');
const subscriptionController = require('../controller/subscriptionController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/plans', subscriptionController.getPlans);
router.get('/me', authenticate, subscriptionController.getMySubscription);
router.post('/', authenticate, subscriptionController.createSubscription);

module.exports = router;
