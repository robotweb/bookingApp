const express = require('express');
const { getVehicles, getVehicle, postVehicle, patchVehicle, deleteVehicle } = require('../controllers/vehicleController');

const router = express.Router();

router.get('/', getVehicles);
router.get('/:id', getVehicle);
router.post('/', postVehicle);
router.patch('/:id', patchVehicle);
router.delete('/:id', deleteVehicle);

module.exports = router; 