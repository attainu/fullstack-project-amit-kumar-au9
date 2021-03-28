const occasionListModel = require('../models/occasionListModel');

exports.addOccasion = (req, res, next) => {
	try {
		if (req.query.name) {
			const data = {
				name: req.query.name.toLowerCase(),
			};
			occasionListModel.addOccasion(data, (err, reply) => {
				if (err) return next(err);
				return res.json(reply);
			});
		} else {
			res.json({
				message: 'Kindly send name',
				status: 300,
			});
		}
	} catch (error) {
		return next(error);
	}
};

exports.deleteOccasion = (req, res, next) => {
	try {
		if (req.query.name) {
			occasionListModel.deleteOccasion(
				req.query.name.toLowerCase(),
				(err, reply) => {
					if (err) return next(err);
					return res.json(reply);
				},
			);
		} else {
			res.json({
				message: 'Kindly send name',
				status: 300,
			});
		}
	} catch (error) {
		return next(error);
	}
};

exports.getAllOccasion = (_, res, next) => {
	try {
		occasionListModel.getAllOccasion((err, reply) => {
			if (err) return next(err);
			return res.json(reply);
		});
	} catch (error) {
		return next(error);
	}
};
