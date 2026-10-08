const ApiError = require("../utils/ApiError");

const OBJECT_ID_PATTERN = /^[0-9a-fA-F]{24}$/;

function validateEquipmentId(req, res, next) {
  if (!OBJECT_ID_PATTERN.test(req.params.id)) {
    return next(new ApiError(400, "Invalid equipment id"));
  }
  next();
}

module.exports = { validateEquipmentId };
