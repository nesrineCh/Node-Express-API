const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    userName: {
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
    }
});

module.exports = mongoose.model('User', userSchema);