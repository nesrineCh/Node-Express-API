const mongoose = require('mongoose');

const commentSignalSchema = mongoose.Schema({
	signalAuthor: {
		type: mongoose.ObjectId,
		ref: 'User',
		required: true
	},
	signalDate: {
		type: Date,
		default: Date.now()
	},
	comment : {
		type: mongoose.ObjectId,
		ref: 'Comment',
		required: true
	}
});

module.exports = mongoose.model('CommentSignal', commentSignalSchema);