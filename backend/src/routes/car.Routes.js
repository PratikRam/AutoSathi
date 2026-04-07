const express = require("express");
const { addCarController, getCarsController, deleteCarController } = require("../controller/Car.Controller");
const protect = require("../middleware/authMiddleware");

const router = express.Router()

router.post('/add', protect, addCarController)
router.get('/get', protect, getCarsController)
router.delete('/:id', protect, deleteCarController)

module.exports = router;