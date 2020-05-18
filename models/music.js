const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const musicchema = new Schema({
    file: {
        type: String,
        required: true,
        maxlength: 70
    }
});
const Music = mongoose.model("Music", musicchema);
module.exports = Music;

/*
 role:1  => admin
 */
