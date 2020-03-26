const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET users listing. Only if admin*/
router.get('/', async (req, res) => {
	if (!req.user || !req.user.isAdmin) {
		res.status(403).send()
	}
	try {
		const users = await User.find();
		await res.json(users);
	} catch (err) {
		await res.json({message: err});
	}
});

/* GET a specific user. Only if admin */
router.get('/:id', async (req, res) => {

	if (!req.user || !req.user.isAdmin) {
		res.status(403).send()
	}

	try {
		const id = req.params.id;
		const user = await User.findOne({_id: id});
		await res.json(user);
	} catch (err) {
		await res.json({message: err});
	}
});

/* POST new user. Only admin */
router.post('/', async (req, res) => {

	if (!req.user || !req.user.isAdmin) {
		res.status(403).send()
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
		await res.json(savedUser);
	} catch (err) {
		await res.json({message: err});
	}

});

/* DELETE a specific user. */
router.delete('/:id', async (req, res) => {

	// verify auth of the user (if req from that user or from admin)
	const id = req.params.id;
	const user = await User.findOne({_id: id});

	if (!req.user || (user._id !== req.user._id && !req.user.isAdmin)) {
		res.status(403).send()
	}

	try {
		const id = req.params.id;
		const deletedUser = await User.deleteOne({_id: id});
		await res.json(deletedUser);
	} catch (err) {
		await res.json({message: err});
	}
});

/* PATCH  a specific user, seulement si admin*/
router.patch('/:id', async (req, res) => {
	try {
		// verify auth of the user (if req from that user or from admin)
		const id = req.params.id;
		const user = await User.findOne({_id: id});

		if (!req.user || (user._id !== req.user._id && !req.user.isAdmin)) {
			res.status(403).send();
		}

		if (req.body.userName !== null) {
			user.userName = req.body.userName;
		}
		if (req.body.userFirstName !== null) {
			user.userFirstName = req.body.userFirstName;
		}
		if (req.body.userPseudo !== null) {
			user.userPseudo = req.body.userPseudo;
		}
		if (req.body.userMail !== null) {
			user.userMail = req.body.userMail;
		}
		if (req.body.userPassword !== null) {
			user.userPassword = req.body.userPassword;
		}
		if (req.body.isPrivate !== null) {
			user.isPrivate = req.body.isPrivate;
		}

		// User not admin ne peut pas changer son statut (se mettre admin ou unban)
		if (req.user.isAdmin) {
			if (req.body.isAdmin !== null) {
				user.isAdmin = req.body.isAdmin;
			}
			if (req.body.isBan !== null) {
				user.isBan = req.body.isBan;
			}
		}

		const updatedUser = await user.save();
		await res.status(200).json(updatedUser);

	} catch (err) {
		await res.json({message: err});
	}
});

module.exports = router;
