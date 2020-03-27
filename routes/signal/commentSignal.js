const express = require('express');
const router = express.Router();
const Comment = require('../../models/Comment');

router.put('/:idCom', function (req, res) {
	Comment.findById(req.params.idCom).then(
		comment => {
			if (!comment.reports.includes(req.user._id)) {
				Comment.findByIdAndUpdate(comment._id, {$push: {reports: req.user._id}})
					.then(data => res.status(201).json(data))
					.catch(err => res.status(500).json(err))
			} else {
                res.status(200).end()
            }
		}
	)
		.catch(err => res.status(500).json(err))
});

module.exports = router;