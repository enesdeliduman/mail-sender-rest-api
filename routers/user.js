const express = require("express")
const router = express.Router()

const userController = require("../controllers/user")
const isAuth = require("../middlewares/isAuth")

router.get("/getMails", [isAuth], userController.getMails)
router.get("/getSentMails", [isAuth], userController.getSentMails)
router.post("/sendMail", [isAuth], userController.sendMail)
router.post("/addMailAddress", [isAuth], userController.addMailAddress)
router.post("/addMailAddressesBulk", [isAuth], userController.addMailAddressesBulk)
router.delete("/deleteMail/:id", [isAuth], userController.deleteMail)

module.exports = router