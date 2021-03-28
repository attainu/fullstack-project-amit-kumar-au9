const postSchema = require('../schema/postSchema');

exports.addPost = (postData, callback) => {
	try {
		postSchema.create(postData, (err, reply) => {
			if (err) return callback(err);
			return callback('', {
				message: 'Post added',
				status: 200,
				data: reply,
			});
		});
	} catch (error) {
		callback(error);
	}
};

exports.updatePost = (updateFor, data, callback) => {
	try {
		postSchema
			.findOneAndUpdate(updateFor, data)
			.then((reply) => {
				if (reply) {
					callback('', {
						message: 'Post data updated',
						status: 200,
					});
				} else {
					callback('', {
						message: 'Post not found for logged in user',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.getPostDetailByPostId = (postId, callback) => {
	try {
		postSchema
			.find({ _id: postId, active: 1 })
			.then((data) => {
				if (data.length != 0) {
					callback('', {
						message: 'Post data send',
						status: 200,
						data: data,
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

exports.deletePost = (deleteFor, callback) => {
	try {
		postSchema
			.findOneAndUpdate(deleteFor, { active: 0 })
			.then((reply) => {
				if (reply) {
					callback('', {
						message: 'Post deleted',
						status: 200,
						data: reply,
					});
				} else {
					callback('', {
						message: 'Post not found for logged in user',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.pinPost = (pinFor, callback) => {
	try {
		postSchema
			.findOneAndUpdate(pinFor, { isPinned: true })
			.then((reply) => {
				if (reply) {
					callback('', {
						message: 'Post pinned',
						status: 200,
					});
				} else {
					callback('', {
						message: 'Post not found for logged in user',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.unpinPost = (unpinFor, callback) => {
	try {
		postSchema
			.findOneAndUpdate(unpinFor, { isPinned: false })
			.then((reply) => {
				if (reply) {
					callback('', {
						message: 'Post unpinned',
						status: 200,
					});
				} else {
					callback('', {
						message: 'Post not found for logged in user',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};
