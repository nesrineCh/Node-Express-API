const express = require('express');
const router = express.Router();
const Publication = require('../../models/Publication');

router.put('/:idPub', function (req, res) {
	if (!req.user) {
		return res.status(403).end()
	}
	Publication.findById(req.params.idPub).then(
		publication => {
			if (!publication.reports.includes(req.user._id)) {
				Publication.findByIdAndUpdate(publication._id, {$push: {reports: req.user._id}})
					.then(data => res.status(201).json(data))
					.catch(err => res.status(500).json(err))
			} else {
				res.status(400).send({error: "Already reported"})
			}
		}
	).catch(err => res.status(400).json(err))
});

// delete un signal
router.delete('/:idPub', function (req, res) {
	if (!req.user) {
		return res.status(403).end()
	}

	Publication.findById(req.params.idPub).then(
		publication => {

			if (publication.reports.includes(req.user._id)) {
				let id = req.user._id;
				Publication.findByIdAndUpdate(publication._id, {$pull: {reports: id}})
					.then(data => res.status(200).json(data))
					.catch(err => res.status(500).json(err))

			} else if (req.user.isAdmin && res.body.idUser) {

				Publication.findByIdAndUpdate(publication._id, {$pull: {reports: res.body.idUser}})
					.then(data => res.status(200).json(data))
					.catch(err => res.status(500).json(err))

			} else {
				res.status(400).end()
			}
		}
	).catch(err => res.status(400).json(err))
});

module.exports = router;