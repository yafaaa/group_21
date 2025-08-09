
const userService = require('../services/user.service');

exports.register = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ message: 'Username and password required' });
	}
	try {
		const user = await userService.registerUser(username, password);
		res.status(201).json({ message: 'User registered successfully', user });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.login = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await userService.loginUser(username, password);
		res.json({ message: 'Login successful', user });
	} catch (err) {
		res.status(401).json({ message: err.message });
	}
};

exports.profile = (req, res) => {
	res.json({ message: 'User profile', user: req.user });
};
