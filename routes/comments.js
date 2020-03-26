const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

//Get all comments for a post
router.get('/post/:pubId', function (req, res) {
	Comment
		.find({commentParent: req.params.pubId})
		.exec().then(data => res.status(200).json(data))
		.catch(err => res.status(500).send(err))
});

//Get a comment by id
router.get('/:commentId', function (req, res) {
	Comment
		.findById(req.params.commentId)
		.exec().then(data => res.status(200).json(data))
		.catch(err => res.status(500).send(err))
});

//Create a comment
router.post('/', (req, res) => {

	// Todo : validate
	const comment = new Comment({...req.body});

	comment.save()
		.then(data => res.status(200).json(data))
		.catch(err => res.status(500).send(err))

});

//Delete a comment, Only admin and author of comment
router.delete('/:commentId', async function (req, res) {

	const comment = await Comment.findById(req.params.commentId).exec();

	if (!req.user || (comment.commentAuthor !== req.user._id && !req.user.isAdmin)) {
		res.status(403).send()
	}

	Comment.remove({_id: req.param.commentId}).exec().then(data => res.json(data)).catch(err => res.status(500).send(err))
});

module.exports = router;
