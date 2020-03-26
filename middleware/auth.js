const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

	//checking if user has a token
	const token = req.header('auth-token');
	if (!token) return res.status(401).send('Access Denied');

	//checking if token is valid
	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).send('Invalid Token');
	}
};