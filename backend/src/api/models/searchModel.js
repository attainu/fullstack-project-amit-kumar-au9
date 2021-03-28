const userSchema = require('../schema/userSchema');
const { page_size } = require('../utils/config');

exports.findByKeyword = (keyword, page_no, callback) => {
	try {
		userSchema
			.aggregate([
				{
					$match: {
						name: { $regex: new RegExp(keyword, 'i') },
						type: 'artist',
					},
				},
				{
					$sort: {
						name: 1,
					},
				},
				{
					$skip: page_size * (page_no - 1),
				},
				{
					$limit: page_size,
				},
			])
			.then((response) => {
				if (response) {
					callback('', {
						message: 'Search result',
						status: 200,
						data: response,
					});
				} else {
					callback('', {
						message: 'Search not found',
						status: 300,
						data: response,
					});
				}
			})
			.catch((err) => {
				callback(err);
			});
	} catch (error) {
		return callback(error);
	}
};
