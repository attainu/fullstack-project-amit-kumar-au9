const express = require('express');
const rateLimit = require('express-rate-limit');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const { mongo_url, session_secret } = require('./api/utils/config');
// import routes
const mainRouter = require('./api/routes/index');

const limiter = rateLimit({
	windowMs: 1000,
	max: 20,
	message: 'Please try again later',
});

const app = express();
app.use(cors()); //enable cors
app.use(express.json()); //enable json
app.use(
	session({
		secret: session_secret,
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 3600000 * 24 },
	}),
);
app.use(limiter); //applying the rate limit to express
app.use(fileUpload({ useTempFiles: true })); //enable file upload

app.get('/health', (req, res) => {
	return res.json({ message: 'Health OK' });
});

// route middleware
app.use('/', mainRouter);

// CONNECT TO DB
mongoose
	.connect(mongo_url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log(err));

// default error handler of express
app.use(function (err, req, res, next) {
	res.json({
		message: 'Server Error',
		status: 500,
		error: err.toString(),
	});
});

module.exports = app;
