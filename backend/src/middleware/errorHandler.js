const { failure } = require('../utils/apiResponse');

// Centralized error handler — controllers/services throw, this is the one
// place that turns an error into an HTTP response, so internal details
// never leak to the client.
function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.status || 500;
  const message = status === 500 ? 'Something went wrong' : err.message;

  return failure(res, message, status);
}

module.exports = errorHandler;
