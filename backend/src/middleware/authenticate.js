const { verifyToken } = require('../utils/token');
const { failure } = require('../utils/apiResponse');

// Reads the httpOnly session cookie, verifies it, and attaches the
// authenticated user id to req.userId. Mirrors the shape of D&P's
// authorizeUser middleware (19/tokens_src/middlewares/authorizeUser.js)
// but checks a signed JWT instead of a DB session lookup.
function authenticate(req, res, next) {
  const token = req.cookies[process.env.COOKIE_NAME || 'token'];

  if (!token) {
    return failure(res, 'Unauthorized: no session found', 401);
  }

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return failure(res, 'Unauthorized: invalid or expired session', 401);
  }
}

module.exports = authenticate;
