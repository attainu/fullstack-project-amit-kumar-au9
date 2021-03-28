const savePostModel = require('../models/savePostModel');

// userId1 is following userId2
// exports.savePost = (req, res, next) => {
// 	try {
// 		const data = {
// 			userId: req.userData._id,
// 			postId: req.params.postId,
// 		};
// 		savePostModel.savePost(data, (err, reply) => {
// 			if (err) return next(err);
// 			return res.json(reply);
// 		});
// 	} catch (error) {
// 		return next(error);
// 	}
// };

// exports.removePost = (req, res, next) => {
// 	try {
// 		const data = {
// 			userId: req.userData._id,
// 			postId: req.params.postId,
// 		};
// 		savePostModel.removePost(data, (err, reply) => {
// 			if (err) return next(err);
// 			return res.json(reply);
// 		});
// 	} catch (error) {
// 		return next(error);
// 	}
// };

// follower means the users which are following me i.e. I am userId2
exports.getAllSavedPost = (req, res, next) => {
	try {
		savePostModel.getAllSavedPost(req.userData._id, (err, reply) => {
			if (err) return next(err);
			return res.json(reply);
		});
	} catch (error) {
		return next(error);
	}
};

exports.manageSave = (req, res, next) => {
	try {
		const data = {
			postId: req.params.postId,
			userId: req.userData._id,
		};
		savePostModel.manageSave(data, (err, reply) => {
			if (err) return next(err);
			return res.json(reply);
		});
	} catch (error) {
		return next(error);
	}
};
