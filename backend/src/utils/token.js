const jwt = require('jsonwebtoken');

// Adapted from D&P 19/tokens_src (JWT-based auth flow) — chosen over the
// 19/cookies_src DB-session variant to avoid adding a `sessions` table.
// The token is always sent as an httpOnly cookie, never read by JS.
function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { signToken, verifyToken };
