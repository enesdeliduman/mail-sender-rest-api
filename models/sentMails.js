const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SentMailsSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    mails: {
        type: [Schema.Types.ObjectId],
        ref: 'Mail'
    }
}, { timestamps: { createdAt: true, updatedAt: false } });
const SentMails = mongoose.model('SentMails', SentMailsSchema);
module.exports = SentMails;
