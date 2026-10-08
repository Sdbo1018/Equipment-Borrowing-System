const Equipment = require('../models/Equipment');
const ApiError = require('../utils/ApiError');

async function getAllEquipment() {
  return Equipment.find().sort({ name: 1 }).lean();
}

async function getEquipmentById(id) {
  const item = await Equipment.findById(id).lean();
  if (!item) {
    throw new ApiError(404, 'Equipment not found');
  }
  return item;
}

module.exports = { getAllEquipment, getEquipmentById };
