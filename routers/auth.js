const express = require("express")
const router = express.Router()

const authController = require("../controllers/auth")

router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/forgotPassword", authController.forgotPassword)
router.put("/newPassword/:token", authController.newPassword)

module.exports = router