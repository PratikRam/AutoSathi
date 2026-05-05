const express = require('express')
const { updateProfile } = require('../controller/User.Controller')
const protect = require('../middleware/authMiddleware')
const router = express.Router()

router.patch('/updateprofile', protect, updateProfile)

module.exports = router