const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 50
    },

    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    login: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique: true
    }
});
const User = mongoose.model("User", userSchema);
module.exports = User;

/*
 role:1  => admin
 */
