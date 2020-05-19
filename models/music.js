const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const musicchema = new Schema({
    file: {
        type: String,
        required: true,
        maxlength: 70
    },
    idUser: {
        type: String,
        required: true
    }
});
const Music = mongoose.model("Music", musicchema);
module.exports = Music;

/*
 role:1  => admin
 */
