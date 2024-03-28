const express = require("express")
const router = express.Router()

const userController = require("../controllers/user")
const isAuth = require("../middlewares/isAuth")

router.get("/getMails", [isAuth], userController.getMails)

module.exports = router