const asyncHandler = require("express-async-handler")
const sendMail = require("../helpers/sendMail")
const User = require("../models/user")
const Mail = require("../models/mail")
const SentMail = require("../models/sentMails")
const utils = require("../utils/index")

module.exports.getMails = asyncHandler(async (req, res, next) => {
    const userMails = await User.findById(req.user._id).populate("mails")
    const mails = userMails.mails
    res.status(200).json({ success: true, mails })
})
module.exports.getSentMails = asyncHandler(async (req, res, next) => {
    const mails = await SentMail.find()
        .populate("mails")
        .select("-_id")
    res.status(200).json({ success: true, mails })
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
    const newMail = await SentMail.create({
        subject,
        message,
    })
    for (const mail of mails.mails) {
        await sendMail.sendMail({
            to: mail.mail,
            subject: subject,
            html: `Merhaba ${mail.name}<br><br>${message}`
        });
        newMail.mails.push(mail._id);
    }
    newMail.save()
    const sentMail = {
        subject,
        message
    }
    res.status(200).json({ success: true, message: "Mail send successfully", sentMail })
});
module.exports.addMailAddress = asyncHandler(async (req, res, next) => {
    const obj = req.body
    const mail = await Mail.create({
        name: obj.name,
        mail: obj.mail
    });
    await User.findByIdAndUpdate(req.user._id, { $push: { mails: mail._id } }, { new: true });
    res.status(200).json({ success: true, message: "Mail was added successfully", obj })
})
module.exports.addMailAddressesBulk = asyncHandler(async (req, res, next) => {
    let errorMessages = [];
    for (const obj of req.body) {
        try {
            const mail = await Mail.create({
                mail: obj.mail,
                name: obj.name
            })
            await User.findByIdAndUpdate(req.user._id, { $push: { mails: mail._id } }, { new: true });
        }
        catch (err) {
            if (err.code === 11000) {
                errorMessages.push(`-${err.keyValue.mail}- Mail already exists`);
                continue;
            }
        }
    }
    res.status(200).json({ success: true, message: "Mails was added successfully", errorMessages })
})
module.exports.deleteMail = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    if (utils.isValidObjectId(id, res)) return
    await Mail.findByIdAndDelete(id)
    return res.status(200).json({ success: true, message: "Mail was deleted successfully", obj })

})