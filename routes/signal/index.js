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
		return res.status(403).end()
	}

	try {

		const res = await Promise.all([CommentSignal.find(), PubSignal.find()]);

		res.status(200).send({listCommentSig: res[0], listPostSig: res[1]});
	} catch (e) {
		res.status(500).send({message: e});
	}
});

module.exports = router;