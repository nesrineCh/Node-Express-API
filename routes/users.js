const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Publication = require('../models/Publication');

/* GET users listing. Only if admin*/
router.get('/', async (req, res) => {

	if (!req.user || !req.user.isAdmin) {
		return res.status(403).send()
	}

	try {
		const users = await User.find();
		return res.status(200).json(users);
	} catch (err) {
		return res.status(500).json({message: err});
	}
});

/* GET a specific user. Only if admin TODO : ou si on est cet user*/
router.get('/:id', async (req, res) => {

	if (!req.user || !req.user.isAdmin) {
		return res.status(403).send()
	}

	try {
		const id = req.params.id;
		const user = await User.findOne({_id: id});
		return res.status(200).json(user);
	} catch (err) {
		return res.status(500).json({message: err});
	}
});

//Get toutes les publications d'un utilisateur, TODO : si admin ou user
router.get('/:idUser/pub', function (req, res) {

	if (!req.user || !req.user.isAdmin) {
		return res.status(403).send()
	}

	Publication.find({publicationAuthor: req.params.idUser})
		.populate('publicationAuthor', 'userPseudo')
		.then(data => res.status(200).json(data))
		.catch(err => res.status(500).send(err))
});

/* POST new user. Only admin */
router.post('/', async (req, res) => {

	if (!req.user || !req.user.isAdmin) {
		return res.status(403).send()
	}

	const user = new User({
		userName: req.body.userName,
		userFirstName: req.body.userFirstName,
		userPseudo: req.body.userPseudo,
		userMail: req.body.userMail,
		userPassword: req.body.userPassword,
		isAdmin: req.body.isAdmin,
		isPrivate: req.body.isPrivate,
		isBan: req.body.isBan
	});

	try {
		const savedUser = await user.save();

		return res.status(201).json(savedUser);

	} catch (err) {
		return res.status(500).json({message: err});
	}

});

/* DELETE a specific user. */
router.delete('/:id', async (req, res) => {

	// verify auth of the user (if req from that user or from admin)
	const id = req.params.id;
	const user = await User.findOne({_id: id});

	if (!req.user || (user._id !== req.user._id && !req.user.isAdmin)) {
		return res.status(403).end()
	}

	try {
		const id = req.params.id;
		const deletedUser = await User.deleteOne({_id: id});
		return res.status(200).json(deletedUser);
	} catch (err) {
		return res.status(500).json({message: err});
	}
});

/* PATCH  a specific user, seulement si admin*/
router.patch('/:id', async (req, res) => {
	try {

		// verify auth of the user (if req from that user or from admin)
		const id = req.params.id;
		let user = await User.findById(id);

		if (!req.user || (user._id !== req.user._id && !req.user.isAdmin)) {
			return res.status(403).end();
		}

		if (req.body.userName !== null) {
			req.user.userName = req.body.userName;
		}
		if (req.body.userFirstName !== null) {
			req.user.userFirstName = req.body.userFirstName;
		}
		if (req.body.userPseudo !== null) {
			req.user.userPseudo = req.body.userPseudo;
		}
		if (req.body.userMail !== null) {
			req.user.userMail = req.body.userMail;
		}
		if (req.body.userPassword !== null) {
			req.user.userPassword = req.body.userPassword;
		}
		if (req.body.isPrivate !== null) {
			req.user.isPrivate = req.body.isPrivate;
		}

		// User not admin ne peut pas changer son statut (se mettre admin ou unban)
		if (req.user.isAdmin) {
			if (req.body.isAdmin !== null) {
				req.user.isAdmin = req.body.isAdmin;
			}
			if (req.body.isBan !== null) {
				req.user.isBan = req.body.isBan;
			}

		}

		await user.updateOne(req.user);

		return res.status(200).end();

	} catch (err) {
		return res.status(500).json({message: err});
	}
});

module.exports = router;
