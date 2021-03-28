const saveSchema = require('../schema/saveSchema');
const pipeline = require('./pipeline');

exports.savePost = (data, callback) => {
	try {
		saveSchema
			.findOne(data)
			.then((reply) => {
				if (reply) {
					callback('', {
						message: 'Post already saved, wrong request',
						status: 300,
					});
				} else {
					saveSchema
						.create(data)
						.then((reply) => {
							callback('', {
								message: 'Post saved',
								status: 200,
							});
						})
						.catch((err) => callback(err));
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.manageSave = (data, callback) => {
	try {
		saveSchema
			.findOne(data)
			.then((reply) => {
				if (reply) {
					saveSchema
						.deleteOne(data)
						.then(() => {
							saveSchema
								.countDocuments({ postId: data.postId })
								.then((reply) => {
									return callback('', {
										message: 'Post unsaved',
										status: 200,
										count: reply,
									});
								});
						})
						.catch((err) => callback(err));
				} else {
					saveSchema.create(data).then(() => {
						saveSchema
							.countDocuments({ postId: data.postId })
							.then((reply) => {
								return callback('', {
									message: 'Post saved',
									status: 200,
									count: reply,
								});
							});
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.removePost = (data, callback) => {
	try {
		saveSchema
			.findOneAndDelete(data)
			.then((reply) => {
				if (reply) {
					callback('', {
						message: 'Post unsaved',
						status: 200,
					});
				} else {
					callback('', {
						message:
							'Post doesnot exist in saved list, wrong request',
						status: 300,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.getAllSavedPost = (userId, callback) => {
	try {
		saveSchema
			.aggregate([
				{
					$match: { userId: String(userId) },
				},
				pipeline.postFilesLookup,
				{
					$project: {
						...pipeline.userProject,
						'all_files._id': 0,
					},
				},
				{ $unwind: '$all_files' },
				{ $sort: { date: -1 } },
			])
			.then((reply) => {
				callback('', {
					message: 'Follower list send',
					status: 200,
					data: reply,
				});
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};
