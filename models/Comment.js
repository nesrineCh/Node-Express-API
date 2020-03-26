const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
	idParent: {
		type: mongoose.ObjectId,
		ref: 'Publication',
		required: true
	},
	commentAuthor: {
		type: mongoose.ObjectId,
		ref: 'User',
		required: true
	},
	commentDescription: {
		type: String,
		required: true
	},
	commentDate: {
		type: Date,
		default: Date.now()
	},
	commentScore: {
		type: Number,
		default: 0
	},
	category: {
		type: mongoose.ObjectId,
		ref: 'Category',
		required: true
	},
    isAnonymous: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Comment', commentSchema);