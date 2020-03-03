const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: {
        type: BigInt,
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

});

module.exports = mongoose.model('User', userSchema);