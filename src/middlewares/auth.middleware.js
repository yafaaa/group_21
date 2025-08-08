
const { verifyToken } = require('../services/user.service');

module.exports = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) {
		return res.status(401).json({ message: 'No token ' });
	}
	const payload = verifyToken(token);
	if (!payload) {
		return res.status(401).json({ message: 'Invalid token' });
	}
	req.user = payload;
	next();
};
