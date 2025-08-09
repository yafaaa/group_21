

const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

async function registerUser(username, password) {
	const existing = await User.findOne({ where: { username } });
	if (existing) {
		throw new Error('Username already exists');
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await User.create({ username, password: hashedPassword });
	return { id: user.id, username: user.username };
}


async function loginUser(username, password) {
	const user = await User.findOne({ where: { username } });
	if (!user) throw new Error('Invalid credentials');
	const match = await bcrypt.compare(password, user.password);
	if (!match) throw new Error('Invalid credentials');
	// Generate JWT
	const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
	return { id: user.id, username: user.username, token };
}

function verifyToken(token) {
	try {
		return jwt.verify(token, JWT_SECRET);
	} catch (err) {
		return null;
	}
}

module.exports = {
	registerUser,
	loginUser,
	verifyToken,
};
