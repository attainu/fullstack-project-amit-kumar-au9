const searchModel = require('../models/searchModel');

exports.findByKeyword = (req, res, next) => {
	try {
		if (!req.query.keyword) {
			return res.json({
				message: 'No keyword',
				status: 400,
				error: 'Keyword cannot be empty',
			});
		}
		searchModel.findByKeyword(
			req.query.keyword,
			req.query.page_no,
			(err, reply) => {
				if (err) return next(err);
				return res.json(reply);
			},
		);
	} catch (error) {
		return next(error);
	}
};
