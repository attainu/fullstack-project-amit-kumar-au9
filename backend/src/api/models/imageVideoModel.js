const imageSchema = require('../schema/postFilesSchema');

exports.addImage = (data, callback) => {
	try {
		imageSchema.create(data, (err, reply) => {
			if (err) return callback(err);
			return callback('', {
				message: 'Image Uploaded',
				status: 200,
			});
		});
	} catch (error) {
		callback(error);
	}
};

exports.getPostImages = (data, callback) => {
	try {
		imageSchema
			.find(data)
			.then((reply) => {
				if (!reply)
					return callback('', {
						message: 'No image found',
						status: 400,
					});
				return callback('', {
					message: 'All images',
					status: 200,
					data: reply,
				});
			})
			.catch((err) => {
				return callback(err);
			});
	} catch (error) {
		callback(error);
	}
};

exports.updateImage = (findBy, data, callback) => {
	try {
		imageSchema.updateOne(findBy, data, (err, reply) => {
			if (err) return callback(err);
			return callback('', {
				message: 'Image updated',
				status: 200,
			});
		});
	} catch (error) {
		callback(error);
	}
};

exports.deleteImage = (data, callback) => {
	try {
		imageSchema.findOneAndDelete(data, (err, reply) => {
			if (err) return callback(err);
			return callback('', {
				message: 'Image deleted',
				status: 200,
				data: reply,
			});
		});
	} catch (error) {
		callback(error);
	}
};
