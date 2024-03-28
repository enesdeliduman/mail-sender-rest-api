const asyncHandler = require("express-async-handler")
const sendMail = require("../helpers/sendMail")

module.exports.getMails = asyncHandler(async (req, res, next) => {
    res.send("naber")
})