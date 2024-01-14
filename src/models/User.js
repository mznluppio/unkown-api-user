const { Schema, model } = require("mongoose");
const isValidEmail = require("../helpers/validEmail");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: isValidEmail,
			message: "Not a valid Email",
		},
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	loggedIn: {
		type: Boolean,
		required: true
	},
	friends: [
		{
			type: Schema.Types.ObjectId,
			ref: "user",
		},
	],
});

userSchema.virtual("friendCount").get(function () {
	return this.friends.length;
});

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
	if (this.isModified("password") || this.isNew) {
		try {
			const hashedPassword = await bcrypt.hash(this.password, 10);
			this.password = hashedPassword;
			next();
		} catch (error) {
			next(error);
		}
	} else {
		return next();
	}
});

const User = model("user", userSchema);

module.exports = User;
