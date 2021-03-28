const homePageModel = require('../models/homePageModel');

//post of followed artist
exports.getPostForYou = (req, res, next) => {
	try {
		homePageModel.getPostForYou(
			req.query.page_no,
			req.userData._id,
			(err, reply) => {
				if (err) return next(err);
				return res.json(reply);
			},
		);
	} catch (error) {
		return next(error);
	}
};

//sort by rating
exports.getMostRatedPost = (req, res, next) => {
	try {
		homePageModel.getMostRatedPost(
			req.query.page_no,
			req.userData._id,
			(err, reply) => {
				if (err) return next(err);
				return res.json(reply);
			},
		);
	} catch (error) {
		return next(error);
	}
};

//sort by likes and rating
exports.getTrendingPost = (req, res, next) => {
	try {
		homePageModel.getTrendingPost(
			req.query.page_no,
			req.userData._id,
			(err, reply) => {
				if (err) return next(err);
				return res.json(reply);
			},
		);
	} catch (error) {
		return next(error);
	}
};
