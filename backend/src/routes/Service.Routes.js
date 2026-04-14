const express = require('express');
const router = express.Router();
const { addServiceController, getServicesController, deleteService } = require('../controller/Service.Controller');
const protect = require('../middleware/authMiddleware');

router.post('/:carId', protect, addServiceController);
router.get('/:carId', protect, getServicesController);
router.delete('/:id', protect, deleteService);

module.exports = router;