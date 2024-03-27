const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const sendMail = require("../helpers/sendMail")

const User = require("../models/user")

const { mailTemp } = require("../helpers/mailTemp")

module.exports.register = asyncHandler(async (req, res, next) => {
    const { name, surname, email, password } = req.body
    await User.create({
        name,
        surname,
        email,
        password
    })
    return res.status(201).json({ success: true, message: "Account created successfully" })
})
module.exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return res.status(400).json({ success: false, message: "No such user found" })
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return res.status(400).json({ success: false, message: "The entered password is incorrect" })
    }
    const token = jwt.sign({
        _id: _id,
        name: user.name,
        isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET_KEY)
    return res.header("x-auth-token", token).status(200).json({ success: true, message: "True password", token })
})
module.exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body
    let user = await User.findOne({
        email
    }).select('+password')
    if (!user) {
        return res.status(400).json({ success: false, message: "No such user found" })
    }
    let token = crypto.randomBytes(32).toString("hex");
    user.resetPassword.token = token
    user.resetPassword.expired = Date.now() + (3 * 60 * 60 * 1000) + (60 * 1000 * 5);
    await user.save()

    const mailContent = mailTemp(user.name, token, "We've heard you've forgotten your password. We're sorry about that. The link we sent you to reset your password will expire in 5 minutes.", "You can reset your password by clicking on the link provided in the text.");
    await sendMail.sendMail({
        to: user.email,
        subject: `Reset Password | Message from ${process.env.SITE_NAME}`,
        html: mailContent
    })
    return res.status(200).json({ success: true, message: "The link was sent successfully", token })
})

module.exports.newPassword = asyncHandler(async (req, res, next) => {
    const token = req.params.token
    const { password } = req.body

    let user = await User.findOne({
        "resetPassword.token": token
    })
    if (!user) {
        return res.status(404).json({ success: false, message: "No such user found" })
    }
    if (Date.now() + (3 * 60 * 60 * 1000) >= user.resetPassword.expired) {
        return res.status(400).json({ success: false, message: "The link provided is no longer valid." })
    }
    user.password = password
    user.resetPassword.token = null
    user.resetPassword.expired = null
    await user.save()
    return res.status(200).json({ success: true, message: "Changed Password" })
})