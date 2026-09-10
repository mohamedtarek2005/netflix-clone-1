const paymentService = require('../service/paymentService');
const { success, failure } = require('../utils/apiResponse');

async function createPayment(req, res, next) {
  try {
    const { subscriptionId } = req.body;
    if (!subscriptionId) {
      return failure(res, 'subscriptionId is required', 400);
    }

    const result = await paymentService.createPayment(req.userId, { subscriptionId });
    return success(res, result, 201);
  } catch (err) {
    next(err);
  }
}

async function getMyPayments(req, res, next) {
  try {
    const payments = await paymentService.getMyPayments(req.userId);
    return success(res, { payments });
  } catch (err) {
    next(err);
  }
}

module.exports = { createPayment, getMyPayments };
