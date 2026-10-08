const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    serialNumber: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: '', trim: true },
    isAvailable: { type: Boolean, default: true }
  },
  { timestamps: true, collection: 'equipment' }
);

module.exports = mongoose.model('Equipment', equipmentSchema);
