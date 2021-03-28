const explorePageModel = require('../models/explorePageModel');

//sort by time
exports.getAllPost = (req, res, next) => {
	try {
		explorePageModel.getAllPost(
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

//search post by occassion
exports.getPostByOccasssion = (req, res, next) => {
	try {
		explorePageModel.getPostByOccasssion(
			req.params.type.toLowerCase(),
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

//search post by tags
exports.getPostByTag = (req, res, next) => {
	try {
		explorePageModel.getPostByTag(
			req.params.tag.toLowerCase(),
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
