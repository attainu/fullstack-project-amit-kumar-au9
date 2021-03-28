const {
	loginSchema,
	userRegisterSchema,
	artistRegisterSchema,
} = require('./validationSchema');

exports.loginValidation = (req, res, next) => {
	const { error } = loginSchema.validate(req.body);
	if (error) {
		return res.json({
			message: 'Login failed',
			status: 400,
			error: error.details[0].message,
		});
	}
	next();
};

exports.registerValidation = (req, res, next) => {
	if (req.body.type === 'artist') {
		var { error } = artistRegisterSchema.validate(req.body);
	} else {
		var { error } = userRegisterSchema.validate(req.body);
	}
	if (error) {
		return res.json({
			message: 'Register failed',
			status: 400,
			error: error.details[0].message,
		});
	}
	next();
};
