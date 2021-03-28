const commentsSchema = require('../schema/commentsSchema');
const pipeline = require('./pipeline');

exports.addComment = (data, callback) => {
	try {
		commentsSchema.create(data, (err, reply) => {
			if (err) return callback(err);
			return callback('', {
				message: 'Comment added',
				status: 200,
				data: reply,
			});
		});
	} catch (error) {
		callback(error);
	}
};

exports.getComments = (postId, callback) => {
	try {
		commentsSchema
			.aggregate([
				{ $match: { postId: postId } },
				{
					$addFields: {
						userId: { $toObjectId: '$userId' },
					},
				},
				pipeline.userLookup,
				{
					$project: {
						...pipeline.userProject,
						postId: 0,
					},
				},
				{
					$sort: { date: -1 },
				},
			])
			.then((data) => {
				callback('', {
					message: 'All comment data send',
					status: 200,
					data: data,
				});
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.getCommentsCounts = (postId, callback) => {
	try {
		commentsSchema
			.countDocuments({ postId: postId })
			.then((count) => {
				callback('', {
					message: 'Comments count send',
					status: 200,
					count: count,
				});
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.deleteComment = (commentId, callback) => {
	try {
		commentsSchema
			.findByIdAndRemove(commentId)
			.then((reply) => {
				if (reply) {
					callback('', {
						message: 'Post comment deleted',
						status: 200,
						data: reply,
					});
				} else {
					callback('', {
						message: 'Post comment not found',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.updateComment = (postId, data, callback) => {
	try {
		commentsSchema
			.findByIdAndUpdate(postId, data)
			.then((reply) => {
				if (reply) {
					callback('', {
						message: 'Post data updated',
						status: 200,
					});
				} else {
					callback('', {
						message: 'Post not found',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};
