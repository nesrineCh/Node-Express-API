const express = require('express');
const router = express.Router();
const Publication = require('../models/Publication');

//Get publications list TODO : change URI
router.get('/home', function (req, res) {
	Publication.find()
		.populate('publicationAuthor', 'userPseudo')
		.then(data => res.json(data))
		.catch(err => res.status(500).send(err))
});
//limit and offset

//Get a publication by id
router.get('/:idPub', function (req, res) {
	// Todo : get commentaires
	Publication.findById(req.params.idPub)
		.populate('publicationAuthor', 'userPseudo')
		.then(data => res.status(200).json(data))
		.catch(err => res.status(500).send(err))
});

//Create a publication TODO : change URI
router.post('/createPub', function (req, res) {
	// console.log(req.body);

	// Todo : validate ?
	const publication = new Publication({...req.body});

	publication.save()
		.then(data => res.status(200).json(data))
		.catch(err => res.status(500).json({err}));

});


//Delete a publication, for admin and author of the publication


module.exports = router;