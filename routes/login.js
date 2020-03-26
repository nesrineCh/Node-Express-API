const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const {registerValidation} = require('../validation/register');
const {loginValidation} = require('../validation/login');

router.post('/register', async (req, res) => {

	//data validation
	const {error} = await registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//checking if user already exist
	try {
		const emailExist = await User.findOne({userMail: req.body.userMail});
		if (emailExist) return res.status(400).send('Email already exists.');
	} catch (err) {
		res.status(400).send(err);
	}

	//hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.userPassword, salt);

	//user creation
	const user = new User({
		userName: req.body.userName,
		userFirstName: req.body.userFirstName,
		userPseudo: req.body.userPseudo,
		userMail: req.body.userMail,
		userPassword: hashedPassword,
		isAdmin: false,
		isPrivate: false,
		isBan: false
	});

	//posting to db
	try {
		await user.save();
		await res.json({user: user._id});
	} catch (err) {
		res.status(400).send(err);
	}

});

router.post('/login', async (req, res) => {

	//data validation
	const {error} = await loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//checking if email exists
	const user = await User.findOne({userMail: req.body.userMail});
	if (!user) return res.status(400).send('Email or password is wrong.');

	//if the passwords are matching
	const validPassword = await bcrypt.compare(req.body.userPassword, user.userPassword);
	if (!validPassword) return res.status(400).send('Email or password is wrong.');

	//creation of the jwt
	const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
	res.header('auth-token', token).send(token);

});

module.exports = router;