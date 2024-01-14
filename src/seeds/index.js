const mongoose = require("mongoose");

const { User } = require("../models");

const usersSeed = require("./data/users");

const init = async () => {
	try {
		await mongoose.connect("mongodb://localhost:27017/socialMediaApiDb", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log("[INFO]: Connection to DB successful");


		await mongoose.disconnect();
	} catch (error) {
		console.log(`[ERROR]: Connection to DB unsuccessful | ${error.message}`);
	}
};

init();
