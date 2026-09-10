const subscriptionService = require('../service/subscriptionService');
const { success } = require('../utils/apiResponse');

async function getPlans(req, res) {
  return success(res, { plans: subscriptionService.getPlans() });
}

async function getMySubscription(req, res, next) {
  try {
    const subscription = await subscriptionService.getMySubscription(req.userId);
    return success(res, { subscription });
  } catch (err) {
    next(err);
  }
}

async function createSubscription(req, res, next) {
  try {
    const { plan } = req.body;
    const subscription = await subscriptionService.createSubscription(req.userId, plan);
    return success(res, { subscription }, 201);
  } catch (err) {
    next(err);
  }
}

module.exports = { getPlans, getMySubscription, createSubscription };
