const express = require('express');
const router = express.Router();
const { addServiceController, getServicesController, deleteService } = require('../controller/Service.Controller');

router.post('/:carId', addServiceController);
router.get('/:carId', getServicesController);
router.delete('/:id', deleteService);

module.exports = router;