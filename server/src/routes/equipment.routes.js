const express = require('express');
const { getEquipment, getEquipmentById } = require('../controllers/equipmentController');

const router = express.Router();

router.get('/', getEquipment);
router.get('/:id', getEquipmentById);

module.exports = router;
