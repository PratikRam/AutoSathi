const express = require("express");
const { addCarController, getCarsController, deleteCarController, renewInsuranceAndPucController } = require("../controller/Car.Controller");
const protect = require("../middleware/authMiddleware");
const multer = require("../middleware/multer");

const router = express.Router()

router.post('/add', protect, multer.single("image"), addCarController)
router.get('/get', protect, getCarsController)
router.patch('/renew/:id', protect, renewInsuranceAndPucController)
router.delete('/:id', protect, deleteCarController)

module.exports = router;