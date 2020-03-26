const express = require('express');
const router = express.Router();
const CommentSignal = require('../../models/Signal/CommentSignal');
const PubSignal = require('../../models/Signal/PubSignal');

const pubSignal = require('./pubSignal');
const commentSignal = require('./commentSignal');

router.use('/pub', pubSignal);
router.use('/comment', commentSignal);

router.get('/', async function (req, res) {

	if (!req.user.isAdmin) {
		res.status(403).send()
	}

	try {

		const listCommentSig = await CommentSignal.find().exec();

		const listPostSig = await PubSignal.find().exec();

		res.status(200).send({listCommentSig, listPostSig})
	} catch (e) {
		res.status(500).send({message: e})
	}
});

module.exports = router;