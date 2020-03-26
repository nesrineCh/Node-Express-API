const mongoose = require('mongoose');

const pubSignalSchema = mongoose.Schema({
	signalAuthor: {
		type: mongoose.ObjectId,
		ref: 'User',
		required: true
	},
	signalDate: {
		type: Date,
		default: Date.now()
	},
	publication : {
		type: mongoose.ObjectId,
		ref: 'Publication',
		required: true
	}
});

module.exports = mongoose.model('PubSignal', pubSignalSchema);