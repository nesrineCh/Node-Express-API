const express = require('express');
const router = express.Router();
const Publication = require('../models/Publication');

//Get publications for home page
router.get('/home', function (req, res) {
	Publication.find().populate('publicationAuthor', 'userPseudo').exec().then(data => res.json(data)).catch(err => res.status(500).send(err))
})
//limit and offset


//Get a publication by id
router.get('/:idPub', function (req, res) {
	Publication.findById(req.params.idPub).exec().then(data => res.json(data)).catch(err => res.status(500).send(err))
})

//Create a publication
router.post('/createPub', function (req, res, next) {
	console.log(req.body);
	const publication = new Publication({...req.body});

	publication.save()
		.then(data => {
			res.json(data);
		}).catch(err => {
		res.json({err});
	});

});
//to fixed, make it async

//Delete a publication, for admin and author of the publication


module.exports = router;