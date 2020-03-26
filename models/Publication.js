const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
	publicationAuthor: {
		type: mongoose.ObjectId,
		ref: 'User',
		required: true
	},
	publicationTitle: {
		type: String,
		required: true
	},
	publicationDescription: {
		type: String,
		required: true
	},
	publicationDate: {
		type: Date,
		default: Date.now()
	},
	publicationScore: {
		type: Number,
		required: true
	},
	isDiscussion: {
		type: Boolean,
		required: true
	},
	isAnonymous: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Publication', publicationSchema);