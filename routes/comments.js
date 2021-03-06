const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

//Get all comments for a post : dans pub / :id / comment


//Get a comment by id
router.get('/:commentId', function (req, res) {
	Comment.findById(req.params.commentId)
		.then(data => res.status(200).json(data))
		.catch(err => res.status(500).send(err))
});


//Create a comment
router.post('/', async (req, res) => {
	const comment = new Comment({...req.body});

	try {
		const newComment = await comment.save();
		res.status(201).json(newComment)
	} catch (err) {
		res.status(500).json({error: err})
	}
});

//Signaler un commentaires : dans signal/comment/:idComment


// TODO : Noter un commentaire (+1)


//Delete a comment for admin and author of comment
router.delete('/:commentId', async function (req, res) {
	let id = req.params.commentId;

	try {
		const comment = await Comment.findById(id);

		if (!req.user || (comment.commentAuthor !== req.user._id && !req.user.isAdmin)) {
			return res.status(403).end()
		}

		Comment.findByIdAndRemove(id)
			.then(data => res.status(200).json(data))
			.catch(err => res.status(500).send(err))

	} catch (e) {
		res.status(500).send(e)
	}
});

module.exports = router;
