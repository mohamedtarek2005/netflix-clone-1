const authService = require('../service/authService');
const { success } = require('../utils/apiResponse');

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }

    const { token, user } = await authService.register({ name, email, password });
    res.cookie(process.env.COOKIE_NAME || 'token', token, COOKIE_OPTIONS);
    return success(res, { user }, 201);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const { token, user } = await authService.login({ email, password });
    res.cookie(process.env.COOKIE_NAME || 'token', token, COOKIE_OPTIONS);
    return success(res, { user });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME || 'token');
  return success(res, { message: 'Logged out' });
}

async function me(req, res, next) {
  try {
    const user = await authService.getCurrentUser(req.userId);
    return success(res, { user });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, logout, me };
