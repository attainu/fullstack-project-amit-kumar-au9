const occasionListSchema = require('../schema/occasionListSchema');

exports.addOccasion = (data, callback) => {
	try {
		occasionListSchema
			.findOne({ name: data.name })
			.then((replyData) => {
				if (replyData) {
					return callback('', {
						message: 'Occasion already exist',
						status: 300,
					});
				} else {
					occasionListSchema.create(data, (err, _) => {
						if (err) return callback(err);
						return callback('', {
							message: 'Occasion added',
							status: 200,
						});
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.getAllOccasion = (callback) => {
	try {
		occasionListSchema
			.aggregate([
				{
					$group: {
						_id: null,
						list: { $push: '$name' },
					},
				},
			])
			.then((data) => {
				callback('', {
					message: 'All occasion data send',
					status: 200,
					data: data[0].list,
				});
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.deleteOccasion = (occasion, callback) => {
	try {
		occasionListSchema
			.findOneAndDelete({ name: occasion })
			.then((reply) => {
				if (reply) {
					callback('', {
						message: 'Occasion deleted',
						status: 200,
					});
				} else {
					callback('', {
						message: 'Occasion not found',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};
