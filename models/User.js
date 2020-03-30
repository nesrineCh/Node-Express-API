const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	userName: {
		type: String,
		required: true,
		max: 255
	},
	userFirstName: {
		type: String,
		required: true,
		max: 255
	},
	userPseudo: {
		type: String,
		required: true,
		max: 255
	},
	userMail: {
		type: String,
		required: true,
		max: 255
	},
	userPassword: {
		type: String,
		required: true,
		max: 1024,
		min: 6
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	isPrivate: {
		type: Boolean,
		default: false
	},
	isBan: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('User', userSchema);