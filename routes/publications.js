const express = require('express');
const router = express.Router();
const Publication = require('../models/Publication');

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

//Create a publication
router.post('/', function (req, res) {
	// console.log(req.body);

	// Todo : validate ?
	const publication = new Publication({...req.body});

	publication.save()
		.then(data => res.status(200).json(data))
		.catch(err => res.status(500).json({err}));

});


//Delete a publication, for admin and author of the publication
router.delete('/:idPub', function (req, res) {
    Publication.remove({_id: req.params.idPub})
        .exec().then(data => {
        Comments.deleteMany({idParent: req.params.idPub}).exec()
        res.json(data)})
        .catch(err => res.status(500).send(err))
})

//Get toutes les publications d'un utilisateur
router.get('/:idUser', function (req, res) {
    Publication.findById(req.params.idUser)
        .populate('publicationAuthor','userPseudo')
        .exec().then(data => res.json(data)).catch(err => res.status(500).send(err))
})

//Update une publication
router.patch('/:idPub', function (req, res) {
    Publication.updateOne({_id: req.params.idPub}, {$set: {...req.body}})
        .exec().then(data => res.json(data)).catch(err => res.status(500).send(err))
})

//Signaler une publication
router.put('/:idUser/:idPub', function (req, res) {
    //Publication.
})

module.exports = router;