const userSchema = require('../schema/userSchema');

exports.editThemeColor = (userId, color, callback) => {
	try {
		userSchema
			.findOneAndUpdate({ _id: userId }, { themeColor: color })
			.then((reply) => {
				callback('', {
					message: 'Color Changed',
					status: 200,
					reply,
				});
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};
