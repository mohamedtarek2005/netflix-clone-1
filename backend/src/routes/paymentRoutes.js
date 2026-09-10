const express = require('express');
const paymentController = require('../controller/paymentController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.use(authenticate);
router.post('/', paymentController.createPayment);
router.get('/me', paymentController.getMyPayments);

module.exports = router;
