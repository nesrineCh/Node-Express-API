const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

//Get all comments for a post
router.get('/:pubId', function (req, res) {
	Comment
		.find({commentParent: req.params.pubId})
		.exec().then(data => res.json(data))
		.catch(err => res.status(500).send(err))
})


//Get a comment by id
router.get('/:commentId', function (req, res) {
	Comment
		.findById(req.params.commentId)
		.exec().then(data => res.json(data))
		.catch(err => res.status(500).send(err))
})


//Create a comment
router.post('/', async (req, res, next) => {
	const comment = new Comment({
		//commentAuthor
		commentDescription: req.body.commentDescription
		//
		//category
	})
	try {
		const newComment = await comment.save()
		res.status(201).json(comment)
	} catch (err) {
		res.status(400).json({message: err.message})
	}
})


//Delete a comment for admin and author of comment
router.delete('/:commentId', function (req, res) {
	Comment.remove({_id: req.param.commentId}).exec().then(data => res.json(data)).catch(err => res.status(500).send(err))
})

module.exports = router;
