const ratingsModel = require('../models/ratingsModel');

exports.addRating = (req, res, next) => {
	try {
		const data = {
			userId: req.userData._id,
			postId: req.params.postId,
			rating: req.query.rating,
		};
		const findBy = {
			userId: req.userData._id,
			postId: req.params.postId,
		};
		ratingsModel.addRating(findBy, data, (err, response) => {
			if (err) return next(err);
			return res.json(response);
		});
	} catch (error) {
		return next(error);
	}
};

exports.getAvgRatings = (req, res, next) => {
	try {
		ratingsModel.getAvgRatings(req.params.postId, (err, reply) => {
			if (err) return next(err);
			return res.json(reply);
		});
	} catch (error) {
		return next(error);
	}
};
exports.getRatings = (req, res, next) => {
	try {
		ratingsModel.getRatings(req.params.postId, (err, reply) => {
			if (err) return next(err);
			return res.json(reply);
		});
	} catch (error) {
		return next(error);
	}
};

exports.updateRating = (req, res, next) => {
	try {
		ratingsModel.updateRating(
			req.params.ratingId,
			{ rating: req.query.rating },
			(err, reply) => {
				if (err) return next(err);
				return res.json(reply);
			},
		);
	} catch (error) {
		return next(error);
	}
};

exports.deleteRating = (req, res, next) => {
	try {
		ratingsModel.deleteRating(req.params.ratingId, (err, reply) => {
			if (err) return next(err);
			return res.json(reply);
		});
	} catch (error) {
		return next(error);
	}
};
