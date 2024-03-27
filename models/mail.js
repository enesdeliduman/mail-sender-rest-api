const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mailSchema = new Schema({
    name: { type: String, required: true },
    mail: { type: String, required: true }
});

module.exports = mailSchema;
