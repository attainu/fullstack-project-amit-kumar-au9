const userSchema = require('../schema/userSchema');
const postSchema = require('../schema/postSchema');
const pipeline = require('./pipeline');
const { page_size } = require('../utils/config');

exports.updateProfile = (userId, data, callback) => {
	userSchema
		.findByIdAndUpdate(userId, data)
		.then(() => {
			callback('');
		})
		.catch((err) => callback(err));
};

exports.getDetails = (userId, callback) => {
	userSchema
		.findById(userId)
		.then((data) => {
			callback('', {
				message: 'Profile data send',
				status: 200,
				data: data,
			});
		})
		.catch((err) => callback(err));
};

exports.getAllPostByUser = (userId, page_no, callback) => {
	try {
		postSchema
			.aggregate([
				{
					$match: {
						userId: userId,
					},
				},
				{
					$addFields: {
						postId: {
							$toString: '$_id',
						},
					},
				},
				pipeline.postFilesLookup,
				pipeline.totalLikesLookup,
				pipeline.commentsLookup,
				pipeline.avgRatingLookup,
				{
					$sort: { date: -1 },
				},
				{
					$project: {
						postId: 1,
						_id: 0,
						'all_files.files': 1,
					},
				},
				{
					$unwind: '$all_files',
				},
				{
					$skip: page_size * (page_no - 1),
				},
				{
					$limit: page_size,
				},
			])
			.then((data) => {
				if (data.length != 0) {
					callback('', {
						message: 'Posts data send',
						status: 200,
						data: data,
					});
				} else {
					callback('', {
						message: 'No post found for user',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.getAllPinnedPostByUser = (userId, page_no, callback) => {
	try {
		postSchema
			.aggregate([
				{
					$match: {
						userId: userId,
						isPinned: true,
					},
				},
				{
					$addFields: {
						postId: {
							$toString: '$_id',
						},
					},
				},
				pipeline.avgRatingLookup,
				pipeline.totalLikesLookup,
				pipeline.commentsLookup,
				pipeline.postFilesLookup,
				{
					$sort: { date: -1 },
				},
				{
					$project: {
						postId: 1,
						_id: 0,
						'all_files.files': 1,
					},
				},
				{
					$unwind: '$all_files',
				},
				{
					$skip: page_size * (page_no - 1),
				},
				{
					$limit: page_size,
				},
			])
			.then((reply) => {
				if (reply.length) {
					callback('', {
						message: 'All pinned post send',
						status: 200,
						data: reply,
					});
				} else {
					callback('', {
						message: 'No pinned post found',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.getMostRatedPostByUserId = (user_id, page_no, callback) => {
	try {
		postSchema
			.aggregate([
				{
					$match: {
						active: 1,
						userId: user_id,
					},
				},
				{
					$addFields: {
						postId: {
							$toString: '$_id',
						},
					},
				},
				pipeline.avgRatingLookup,
				pipeline.totalLikesLookup,
				pipeline.commentsLookup,
				pipeline.postFilesLookup,
				{
					$unwind: '$all_files',
				},
				{
					$project: {
						postId: 1,
						_id: 0,
						ratings: 1,
						'all_files.files': 1,
					},
				},
				{
					$sort: { 'ratings.avgRating': -1 },
				},
				{
					$skip: page_size * (page_no - 1),
				},
				{
					$limit: page_size,
				},
			])
			.then((reply) => {
				if (reply.length) {
					callback('', {
						message: 'All post send',
						status: 200,
						data: reply,
					});
				} else {
					callback('', {
						message: 'No post found',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};
