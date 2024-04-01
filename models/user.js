const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")
const mailSchema = require("./mail")

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true,
        minLength: [3, "Please provide a name with min length 3"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [4, "Please provide a password with min length 4"],
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ]
    },
    resetPassword: {
        token: {
            type: String,
            default: null
        },
        expired: {
            type: Date,
            default: null
        }
    }
});
UserSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword
    next()
});

const User = mongoose.model("User", UserSchema);
module.exports = User