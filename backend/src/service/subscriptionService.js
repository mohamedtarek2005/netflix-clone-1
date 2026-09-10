const { Subscription } = require('../model');
const { HttpError } = require('./authService');

const PLANS = {
  basic: { name: 'Basic', price: 5, quality: 'HD', devices: 1 },
  premium: { name: 'Premium', price: 10, quality: '4K', devices: 4 }
};

function getPlans() {
  return PLANS;
}

async function getMySubscription(userId) {
  return Subscription.findOne({ where: { userId }, order: [['startDate', 'DESC']] });
}

async function createSubscription(userId, plan) {
  if (!PLANS[plan]) {
    throw new HttpError('Invalid subscription plan', 400);
  }

  // A new subscription starts inactive until a successful payment
  // activates it — see paymentService.createPayment.
  return Subscription.create({
    userId,
    plan,
    status: 'inactive',
    startDate: new Date(),
    endDate: null
  });
}

module.exports = { getPlans, getMySubscription, createSubscription, PLANS };
