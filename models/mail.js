const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mailSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ]
    }
});
const Mail = mongoose.model('Mail', mailSchema);
module.exports = Mail;
