const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const session = require('express-session');
require('dotenv').config({ path: '.env.local' });

const PORT = process.env.PORT || 4000;

const app = express();

app.use(session({
	secret: 'dev',
	resave: false,
	saveUninitialized: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

console.log(process.env.MONGODB_URI)

const init = async () => {
	try {
		await mongoose.connect(`${process.env.MONGODB_URI}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log("[INFO]: Connection to DB successful");

		app.listen(PORT, () => {
			console.log(`🚀🚀 Server running on http://localhost:${PORT} 🚀🚀`);
		});
	} catch (error) {
		console.log(`[ERROR]: Connection to DB unsuccessful | ${error.message}`);
	}
};

init();
