const bcrypt = require('bcryptjs');

// Adapted from D&P 19/cookies_src/helpers/crypto.js — same idea (never
// store plain-text passwords), reimplemented with bcrypt (which handles
// salting internally) instead of manual salt+pepper/HMAC, since bcrypt is
// the more standard choice for a plain Express+Sequelize app.
const SALT_ROUNDS = 10;

async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

async function verifyPassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = { hashPassword, verifyPassword };
