const { User, Subscription } = require('../model');
const { HttpError } = require('./authService');

async function getProfile(userId) {
  const user = await User.findByPk(userId, { attributes: ['id', 'name', 'email', 'createdAt'] });
  if (!user) throw new HttpError('User not found', 404);

  const subscription = await Subscription.findOne({
    where: { userId, status: 'active' },
    order: [['startDate', 'DESC']]
  });

  return { user, subscription };
}

module.exports = { getProfile };
