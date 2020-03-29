const express = require('express');
const router = express.Router();
const Publication = require('../models/Publication');
const Comment = require('../models/Comment');

//Get toutes les publications pour la page d'accueil
//Get publications list TODO : limit and offset
router.get('/', function (req, res) {
	Publication.find()
		.populate('publicationAuthor', 'userPseudo')
		.then(data => res.json(data))
		.catch(err => res.status(500).send(err))
});

//Get a publication by id
router.get('/:idPub', function (req, res) {
	// Todo : get commentaires
	Publication.findById(req.params.idPub)
		.populate('publicationAuthor', 'userPseudo')
		.then(data => res.status(200).json(data))
		.catch(err => res.status(500).send(err))
});

//Create a publication, TODO : si on est logged in
router.post('/', function (req, res) {
	const publication = new Publication({...req.body});

	publication.save()
		.then(data => res.status(201).json(data))
		.catch(err => res.status(500).json({err}));
});


//Delete a publication, TODO : for admin and author of the publication
router.delete('/:idPub', function (req, res) {

	if (!req.user || !req.user.isAdmin) {
		return res.status(403).send()
	}

	Publication.findByIdAndRemove(req.params.idPub)
		.then(data =>
			Comment.deleteMany({idParent: req.params.idPub})
				.then(_ => res.status(200).json(data))
				.catch(err => res.status(501).json(err))
		)
		.catch(err => res.status(500).send(err))
});

//Get toutes les publications d'un utilisateur, si admin : dans user/:idUser/pub

// TODO : Noter une publication (+1)

//Get all comments for a publication
router.get('/:idPub/comments', function (req, res) {

	Comment
		.find({commentParent: req.params.pubId})
		.populate('commentAuthor', 'userPseudo') // Todo : populate correctly ?
		.sort({'commentDate': -1})
		.then(data => res.status(200).json(data))
		.catch(err => res.status(500).send(err))

});

//Update une publication, si admin
router.patch('/:idPub', function (req, res) {

	if (!req.user || !req.user.isAdmin) {
		return res.status(403).send()
	}

	Publication.updateOne({_id: req.params.idPub}, {$set: {...req.body}})
		.then(data => res.status(200).json(data))
		.catch(err => res.status(500).send(err))
});

//Signaler une publication : dans signal/pub/:id

module.exports = router;