const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {

	//checking if user has a token
	const token = req.header('auth-token');
	if (!token) return res.status(401).send('Access Denied');

	//checking if token is valid
	try {
		const {_id/*, iat*/} = jwt.verify(token, process.env.TOKEN_SECRET);

		req.user = await User.findOne({_id})

	} catch (err) {
		req.user = null
	}

	next();
};
