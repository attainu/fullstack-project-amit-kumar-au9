const ratingSchema = require('../schema/ratingSchema');
const pipeline = require('./pipeline');

exports.addRating = (findBy, data, callback) => {
	try {
		ratingSchema.findOne(findBy, (err, reply) => {
			if (err) return callback(err);
			if (reply) {
				return callback('', {
					message: 'Rating already given',
					status: 300,
				});
			} else {
				ratingSchema.create(data, (err, _) => {
					if (err) return callback(err);
					return callback('', {
						message: 'Rating added',
						status: 200,
					});
				});
			}
		});
	} catch (error) {
		return callback(error);
	}
};

exports.getRatings = (postId, callback) => {
	try {
		ratingSchema
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
				return callback('', {
					message: 'All Rating data send',
					status: 200,
					data: data,
				});
			})
			.catch((err) => {
				return callback(err);
			});
	} catch (error) {
		return callback(error);
	}
};

exports.getAvgRatings = (postId, callback) => {
	try {
		ratingSchema
			.aggregate([
				{ $match: { postId: postId } },
				{
					$group: {
						_id: '$postId',
						total: {
							$sum: '$rating',
						},
						count: { $sum: 1 },
					},
				},
			])
			.then((reply) => {
				if (reply.length) {
					reply = reply[0];
					return callback('', {
						message: 'Average rating send',
						status: 200,
						data: {
							total: reply.total,
							count: reply.count,
							avgRating: reply.total / reply.count,
						},
					});
				} else {
					return callback('', {
						message: 'Post not found',
						status: 400,
					});
				}
			})
			.catch((err) => {
				return callback(err);
			});
	} catch (error) {
		return callback(error);
	}
};

exports.deleteRating = (RatingId, callback) => {
	try {
		ratingSchema
			.findByIdAndRemove(RatingId)
			.then((reply) => {
				if (reply) {
					return callback('', {
						message: 'Post Rating deleted',
						status: 200,
					});
				} else {
					return callback('', {
						message: 'Post Rating not found',
						status: 400,
					});
				}
			})
			.catch((err) => {
				return callback(err);
			});
	} catch (error) {
		return callback(error);
	}
};

exports.updateRating = (ratingId, data, callback) => {
	try {
		ratingSchema
			.findByIdAndUpdate(ratingId, data)
			.then((reply) => {
				if (reply) {
					callback('', {
						message: 'Post rating updated',
						status: 200,
					});
				} else {
					callback('', {
						message: 'Post rating not found',
						status: 400,
					});
				}
			})
			.catch((err) => {
				return callback(err);
			});
	} catch (error) {
		return callback(error);
	}
};
