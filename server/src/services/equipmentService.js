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

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function searchEquipment({ q, category } = {}) {
  const filter = {};

  if (q && q.trim()) {
    const pattern = new RegExp(escapeRegex(q.trim()), 'i');
    filter.$or = [
      { name: pattern },
      { category: pattern },
      { serialNumber: pattern }
    ];
  }

  if (category && category.trim()) {
    filter.category = new RegExp(`^${escapeRegex(category.trim())}$`, 'i');
  }

  return Equipment.find(filter).sort({ name: 1 }).lean();
}

module.exports = { getAllEquipment, getEquipmentById, searchEquipment };
