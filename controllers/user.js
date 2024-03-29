const asyncHandler = require("express-async-handler")
const sendMail = require("../helpers/sendMail")
const User = require("../models/user")
const Mail = require("../models/mail")

module.exports.getMails = asyncHandler(async (req, res, next) => {
    const userMails = await User.findById(req.user._id).populate("mails")
    const mails = userMails.mails
    res.status(200).json({ success: true, mails })
})

module.exports.addMailAddress = asyncHandler(async (req, res, next) => {
    const obj = req.body
    const mail = await Mail.create({
        name: obj.name,
        mail: obj.mail
    });
    await User.findByIdAndUpdate(req.user._id, { $push: { mails: mail._id } }, { new: true });
    res.status(200).json({ success: true, message: "mail was added successfully", obj })
})
module.exports.sendMail = asyncHandler(async (req, res, next) => {
    const { subject, message } = req.body
    if (!subject || !message) {
        return res.status(400).json({ success: true, message: "Please enter the subject and message parts completely." })
    }
    const mails = await User.findById(req.user._id)
        .populate("mails")
        .select("mails -_id");
    if (mails.mails.length == 0) {
        return res.status(400).json({ success: true, message: "Registered email addresses is 0." })
    }
    for (const mail of mails.mails) {
        await sendMail.sendMail({
            to: mail.mail,
            subject: subject,
            text: message
        });
    }
    const sentMail = {
        subject,
        message
    }
    res.status(200).json({ success: true, message: "Mail send successfully", sentMail })
});