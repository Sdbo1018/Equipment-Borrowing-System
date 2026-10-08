const ApiError = require("../utils/ApiError");
const { sendError } = require("../utils/apiResponse");

function notFoundHandler(req, res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

// Express recognizes error handlers by their four arguments. Keep all four.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  // Our own errors
  if (err instanceof ApiError) {
    return sendError(res, err.statusCode, err.message, err.details);
  }

  // Malformed JSON body
  if (err.type === "entity.parse.failed") {
    return sendError(res, 400, "Invalid JSON in request body");
  }

  // Invalid ObjectId, for example /api/equipment/abc
  if (err.name === "CastError") {
    return sendError(res, 400, `Invalid value for ${err.path}`);
  }

  // Mongoose schema validation
  if (err.name === "ValidationError" && err.errors) {
    const details = Object.values(err.errors).map((e) => e.message);
    return sendError(res, 400, "Validation failed", details);
  }

  // Duplicate key (email or serialNumber already exists)
  if (err.code === 11000) {
    const fields = Object.keys(err.keyValue || {});
    return sendError(res, 409, "Duplicate value", fields);
  }

  // JWT problems
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return sendError(res, 401, "Invalid or expired token");
  }

  // Anything else: log the message only, never the stack to the client
  console.error("Unexpected error:", err.message);
  return sendError(res, 500, "Internal server error");
}

module.exports = { notFoundHandler, errorHandler };
