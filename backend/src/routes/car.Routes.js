const express = require("express");
const { addCarController, getCarsController, deleteCarController, renewInsuranceAndPucController } = require("../controller/Car.Controller");
const protect = require("../middleware/authMiddleware");
const multer = require("../middleware/multer");
// const sendExpiryEmail = require("../utils/sendExpiryEmail");

const router = express.Router()

router.post('/add', protect, multer.single("image"), addCarController)
router.get('/get', protect, getCarsController)
router.patch('/renew/:id', protect, renewInsuranceAndPucController)
router.delete('/:id', protect, deleteCarController)

// router.get("/test-email", async (req, res) => {
//     try {
//         await scheduleExpiryJob()
        
//         res.json({
//             success: true,
//             message: "Email sent successfully"
//         })

//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         })
//     }
// })

module.exports = router;