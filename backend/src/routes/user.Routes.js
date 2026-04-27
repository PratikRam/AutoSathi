const express = require('express')
const { updateProfile } = require('../controller/User.Controller')
const router = express.Router()

router.patch('/updateprofile', updateProfile)

module.exports = router
