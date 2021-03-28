const likeModel = require('../models/likesModel');

// exports.addLike = (req, res, next) => {
// 	try {
// 		const data = {
// 			postId: req.params.postId,
// 			userId: req.userData._id,
// 		};
// 		likeModel.addLike(data, (err, response) => {
// 			if (err) return next(err);
// 			return res.json(response);
// 		});
// 	} catch (error) {
// 		return next(error);
// 	}
// };

exports.getLikes = (req, res, next) => {
	try {
		likeModel.getLikes(req.params.postId, (err, reply) => {
			if (err) return next(err);
			return res.json(reply);
		});
	} catch (error) {
		return next(error);
	}
};

exports.getlikeCounts = (req, res, next) => {
	try {
		likeModel.getlikeCounts(req.params.postId, (err, reply) => {
			if (err) return next(err);
			return res.json(reply);
		});
	} catch (error) {
		return next(error);
	}
};

exports.manageLike = (req, res, next) => {
	try {
		const data = {
			postId: req.params.postId,
			userId: req.userData._id,
		};
		likeModel.manageLike(data, (err, reply) => {
			if (err) return next(err);
			return res.json(reply);
		});
	} catch (error) {
		return next(error);
	}
};
