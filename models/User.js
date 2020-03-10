const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type : String,
        required: true
    },
    userFirstName: {
        type : String,
        required: true
    },
    userPseudo: {
        type : String,
        required: true
    },
    userMail: {
        type : String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    isPrivate: {
        type: Boolean,
        required: true
    },
    isBan: {
        type: Boolean,
    }
});

module.exports = mongoose.model('User', userSchema);