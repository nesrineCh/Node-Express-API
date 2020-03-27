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
		default: 0
	},
	isDiscussion: {
		type: Boolean,
		required: true
	},
	isAnonymous: {
		type: Boolean,
		default: false
	},
	reports:
		[{type: mongoose.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Publication', publicationSchema);