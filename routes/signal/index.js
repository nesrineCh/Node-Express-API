const express = require('express');
const router = express.Router();

const pubSignal = require('./pubSignal');
const commentSignal = require('./commentSignal');

router.use('/pub', pubSignal);
router.use('/comment', commentSignal);

router.get('/', async function (req, res) {

	if (!req.user.isAdmin) {
		return res.status(403).end()
	}

	try {

		// Todo : get signals from Publication et Comment

		// const res = await Promise.all([CommentSignal.find(), PubSignal.find()]);
		//
		// res.status(200).send({listCommentSig: res[0], listPostSig: res[1]});

	} catch (e) {
		res.status(500).send({message: e});
	}
});

module.exports = router;