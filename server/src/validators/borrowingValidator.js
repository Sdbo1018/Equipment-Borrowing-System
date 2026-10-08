const ApiError = require("../utils/ApiError");

const OBJECT_ID_PATTERN = /^[0-9a-fA-F]{24}$/;

// Validates the body of POST /api/borrowings: { equipmentId, dueDate }
function validateBorrowRequest(req, res, next) {
  const { equipmentId, dueDate } = req.body || {};
  const details = [];

  if (typeof equipmentId !== "string" || !OBJECT_ID_PATTERN.test(equipmentId)) {
    details.push("equipmentId must be a valid id");
  }

  if (dueDate === undefined || dueDate === null || dueDate === "") {
    details.push("dueDate is required");
  } else {
    const due = new Date(dueDate);
    if (Number.isNaN(due.getTime())) {
      details.push("dueDate must be a valid date");
    } else if (due <= new Date()) {
      details.push("dueDate must be in the future");
    }
  }

  if (details.length > 0) {
    return next(new ApiError(400, "Validation failed", details));
  }
  next();
}

module.exports = { validateBorrowRequest };
