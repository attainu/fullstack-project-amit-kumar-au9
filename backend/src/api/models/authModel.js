const userSchema = require('../schema/userSchema');

exports.registerUser = (userData, callback) => {
	try {
		userSchema.findOne({ email: userData.email }, (err, reply) => {
			if (err) callback(err);
			if (reply)
				callback('', {
					message: 'User email already exist',
					status: 300,
				});
			else {
				userSchema(userData).save();
				callback('', {
					message: 'Register Successfull',
					status: 200,
				});
			}
		});
	} catch (err) {
		callback(err);
	}
};

exports.loginUser = (email, callback) => {
	try {
		userSchema.findOne({ email: email }, (err, reply) => {
			if (err) callback(err);
			return callback('', reply);
		});
	} catch (err) {
		callback(err);
	}
};

exports.getUserDetail = (user_id, callback) => {
	try {
		userSchema.findOne({ _id: user_id }, (err, reply) => {
			if (err) callback(err);
			return callback('', reply);
		});
	} catch (err) {
		callback(err);
	}
};
