const commentsModel = require('../models/commentsModel');

exports.addComment = (req, res, next) => {
	try {
		const data = {
			postId: req.params.postId,
			userId: req.userData._id,
			comment: req.body.comment,
		};
		commentsModel.addComment(data, (err, response) => {
			if (err) return next(err);
			return res.json(response);
		});
	} catch (err) {
		return next(err);
	}
};

exports.getComments = (req, res, next) => {
	try {
		commentsModel.getComments(req.params.postId, (err, reply) => {
			if (err) return next(err);
			return res.json(reply);
		});
	} catch (err) {
		return next(err);
	}
};

exports.getCommentsCounts = (req, res, next) => {
	try {
		commentsModel.getCommentsCounts(req.params.postId, (err, reply) => {
			if (err) return next(err);
			return res.json(reply);
		});
	} catch (err) {
		return next(err);
	}
};

exports.deleteComment = (req, res, next) => {
	try {
		commentsModel.deleteComment(req.params.commentId, (err, reply) => {
			if (err) return next(err);
			return res.json(reply);
		});
	} catch (err) {
		return next(err);
	}
};

exports.updateComment = (req, res, next) => {
	try {
		const data = {
			comment: req.body.comment,
		};
		commentsModel.updateComment(
			req.params.commentId,
			data,
			(err, reply) => {
				if (err) return next(err);
				return res.json(reply);
			},
		);
	} catch (err) {
		return next(err);
	}
};
