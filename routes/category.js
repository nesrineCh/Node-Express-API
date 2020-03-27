const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.get('/', function (req, res) {

	Category.find()
		.then(data => res.status(200).json(data))
		.catch(err => res.status(500).json(err));

});

// Seulement si admin
router.put('/', async function (req, res) {

	if (!req.user || !req.user.isAdmin) {
		return res.status(403).end()
	}

	const cat = new Category({...req.body});

	try {
		const nCat = await cat.save();
		res.status(201).json(nCat)
	} catch (err) {
		res.status(500).json({error: err})
	}

});

// Seulement si admin
router.delete('/:idCat', function (req, res) {

	if (!req.user || !req.user.isAdmin) {
		return res.status(403).end()
	}

	Category.deleteOne({_id : req.params.idCat})
		.then(data => res.status(200).json(data))
		.catch(err => res.status(500).json(err))

});


module.exports = router;
