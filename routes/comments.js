const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

//Get all comments for a post
router.get('/:idPub/Comments', function (req, res) {
	Comment
		.find({commentParent: req.params.pubId})
		.populate('commentAuthor', 'userPseudo')
		.sort({'commentDate': -1})
		.exec().then(data => res.status(200).json(data))
		.catch(err => res.status(500).send(err))
})


//Get a comment by id
router.get('/:commentId', function (req, res) {
	Comment.findById(req.params.commentId)
		.populate('commentAuthor', 'userPseudo')
		.exec().then(data => res.status(200).json(data))
		.catch(err => res.status(500).send(err))
})


//Create a comment
router.post('/', async (req, res, next) => {
	const comment = new Comment({...req.body})
	try {
		const newComment = await comment.save()
		res.status(201).json(comment)
	} catch (err) {
		res.status(400).json({message: err.message})
	}
})

//Signaler un commentaires
router.put('/:idUser/:commentId', function (req, res) {
	//Comment.
})


//Notrer un commentaire (+1)


//Delete a comment for admin and author of comment
router.delete('/:commentId', async function (req, res) {
	let id = req.params.commentId;

	try {
		const comment = await Comment.findById(id);

		if (!req.user || (comment.commentAuthor !== req.user._id && !req.user.isAdmin)) {
			return res.status(403).end()
		}

		Comment.deleteOne({_id: id})
			.exec().then(data => res.json(data))
			.catch(err => res.status(500).send(err))

	} catch (e) {
		res.status(500).send(e)
	}
})

module.exports = router;
