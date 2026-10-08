const { sendSuccess } = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const equipmentService = require('../services/equipmentService');

const getEquipment = asyncHandler(async (req, res) => {
  const items = await equipmentService.searchEquipment(req.query);
  return sendSuccess(res, items);
});

const getEquipmentById = asyncHandler(async (req, res) => {
  const item = await equipmentService.getEquipmentById(req.params.id);
  return sendSuccess(res, item);
});

module.exports = { getEquipment, getEquipmentById };
