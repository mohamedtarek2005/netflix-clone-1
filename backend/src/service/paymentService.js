const { Payment, Subscription } = require('../model');
const subscriptionService = require('./subscriptionService');
const { HttpError } = require('./authService');

// Intentionally simple, test-only "payment processor": no card details are
// ever accepted or stored, it just records an amount/status and activates
// the subscription. Swap this function's internals for a real provider's
// sandbox SDK later without touching the controller or routes.
async function createPayment(userId, { subscriptionId }) {
  const subscription = await Subscription.findOne({ where: { id: subscriptionId, userId } });
  if (!subscription) {
    throw new HttpError('Subscription not found', 404);
  }

  const plan = subscriptionService.PLANS[subscription.plan];
  const amount = plan.price;

  const payment = await Payment.create({
    userId,
    subscriptionId,
    amount,
    status: 'succeeded' // test flow: always succeeds
  });

  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

  await subscription.update({ status: 'active', endDate: oneMonthFromNow });

  return { payment, subscription };
}

async function getMyPayments(userId) {
  return Payment.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
}

module.exports = { createPayment, getMyPayments };
