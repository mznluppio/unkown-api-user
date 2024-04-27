const { User } = require("../../models");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
	try {
		const users = await User.find({});

		if (!users.length) {
			return res.status(404).json({
				success: false,
				message: "No user's exist in the database",
			});
		} else {
			return res.status(200).json({
				success: true,
				data: users,
			});
		}
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to get users",
			error: error.message,
		});
	}
};

const getUserById = async (req, res) => {
	try {
		const userId = req.params.id;

		const user = await User.findById(userId).populate("friends");

		return res.status(200).json({
			success: true,
			data: user,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to get user",
			error: error.message,
		});
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Find the user by email
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		// Check if the password is correct
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		/* // Check if the user is already logged in
		if (user.loggedIn) {
			return res.status(401).json({
				success: false,
				message: "User is already logged in",
			});
		} */

		// Update loggedIn status in the database
		await User.updateOne({ email }, { loggedIn: true });

		return res.status(200).json({
			success: true,
			message: "Login successful",
			data: user,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Login failed",
			error: error.message,
		});
	}
};

const logoutUser = async (req, res) => {
	try {
		const { email } = req.body;
		await User.updateOne({ email }, { loggedIn: false });
		// Clear the session
		req.session.destroy();

		return res.status(200).json({
			success: true,
			message: "Logout successful",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Logout failed",
			error: error.message,
		});
	}
};


const signupUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		const existingEmail = await User.findOne({ email });
		const existingUsername = await User.findOne({ username });

		if (existingEmail) {
			return res.status(409).json({
				success: false,
				message: "This email is already in use",
			});
		}
		if (existingUsername) {
			return res.status(409).json({
				success: false,
				message: "This username is already in use",
			});
		}
		// Create a new user (you may need to encrypt the password here)
		const newUser = await User.create({
			username,
			email,
			password, // Make sure to encrypt the password before storing it
		});

		return res.status(201).json({
			success: true,
			message: "Registration successful",
			data: newUser,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Registration failed",
			error: error.message,
		});
	}
};

module.exports = {
	getUsers,
	getUserById,
	loginUser,
	signupUser,
	logoutUser
};
