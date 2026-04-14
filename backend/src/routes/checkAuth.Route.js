const express = require("express")
const CheckAuthController = require("../controller/CheckAuth.controller")

const router = express.Router()

router.get("/me", CheckAuthController)


module.exports = router