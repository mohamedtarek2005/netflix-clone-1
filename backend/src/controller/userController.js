const userService = require('../service/userService');
const { success } = require('../utils/apiResponse');

async function me(req, res, next) {
  try {
    const profile = await userService.getProfile(req.userId);
    return success(res, profile);
  } catch (err) {
    next(err);
  }
}

module.exports = { me };
