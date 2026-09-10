const { User } = require('../model');
const { hashPassword, verifyPassword } = require('../utils/password');
const { signToken } = require('../utils/token');

class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function register({ name, email, password }) {
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    throw new HttpError('A user with this email already exists', 409);
  }

  const hashed = await hashPassword(password);
  const user = await User.create({ name, email, password: hashed });

  const token = signToken({ id: user.id });
  return { token, user: { id: user.id, name: user.name, email: user.email } };
}

async function login({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new HttpError('Invalid email or password', 401);
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    throw new HttpError('Invalid email or password', 401);
  }

  const token = signToken({ id: user.id });
  return { token, user: { id: user.id, name: user.name, email: user.email } };
}

async function getCurrentUser(userId) {
  const user = await User.findByPk(userId, { attributes: ['id', 'name', 'email', 'createdAt'] });
  if (!user) {
    throw new HttpError('User not found', 404);
  }
  return user;
}

module.exports = { register, login, getCurrentUser, HttpError };
