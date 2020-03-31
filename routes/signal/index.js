const express = require('express');
const router = express.Router();

const pubSignal = require('./pubSignal');
const commentSignal = require('./commentSignal');

const Publication = require('../../models/Publication');
const Comment = require('../../models/Comment');

router.use('/pub', pubSignal);
router.use('/comment', commentSignal);

router.get('/', async function (req, res) {

	if (!req.user || !req.user.isAdmin) {
		return res.status(403).end()
	}

	try {

		const listCommentSig = await Comment.find({reports: {$exists: true, $ne: []}});
		const listPostSig = await Publication.find({reports: {$exists: true, $ne: []}});

		res.status(200).send({listCommentSig, listPostSig});

	} catch (e) {
		res.status(500).send({message: e});
	}
});

module.exports = router;