const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
    publicationTitle: {
        type: String,
        required: true
    },
    publicationDescription: {
        type: String,
        required: true
    },
    publicationScore: {
        type: Number,
        required: true
    },
    isDiscussion: {
        type : Boolean,
        required : true
    }
});

module.exports = mongoose.model('Publication', publicationSchema);