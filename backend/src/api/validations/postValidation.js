const { postSchema } = require('./validationSchema');

exports.newPostValidation = (req, res, next) => {
	const { error } = postSchema.validate(req.body);
	if (error) {
		return res.json({
			message: 'Post validation failed',
			status: 400,
			error: error.details[0].message,
		});
	}
	next();
};
