const express = require('express');
const router = express.Router();
const Publication = require('../models/Publication');

//Get toutes les publications pour la page d'accueil
router.get('/home', function (req, res) {
    Publication.find().populate('publicationAuthor','userPseudo')
        .exec().then(data => res.json(data)).catch(err => res.status(500).send(err))
})

//Get a publication by id
router.get('/:idPub', function (req, res){
    Publication.findById(req.params.idPub)
        .exec().then(data => res.json(data)).catch(err => res.status(500).send(err))
})

//Create a publication
router.post('/createPub', function(req, res, next) {
    console.log(req.body);
    const publication = new Publication({ ...req.body });

    publication.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
        res.json({err});
    });
});

//Delete a publication, for admin and author of the publication
router.deleteOne('/:idPub', function (req, res) {
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