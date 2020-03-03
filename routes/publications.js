const express = require('express');
const router = express.Router();
const Publication = require('../models/Publication');

router.post('/', function(req, res, next) {
    console.log(req.body);
    const publication = new Publication({
        publicationTitle: req.body.publicationTitle,
        publicationDescription: req.body.publicationDescription,
        publicationScore: req.body.publicationScore,
        isDiscussion: req.body.isDiscussion,
    });

    publication.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
        res.json({err});
    });

});

module.exports = router;