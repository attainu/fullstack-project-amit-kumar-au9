const followerModel = require('../models/followerModel');

// userId1 is following userId2
exports.addFollower = (req, res, next) => {
	try {
		const data = {
			userId1: req.userData._id,
			userId2: req.params.userId,
		};
		followerModel.addFollower(data, (err, reply) => {
			if (err) return next(err);
			return res.json(reply);
		});
	} catch (error) {
		return next(error);
	}
};

exports.removeFollower = (req, res, next) => {
	try {
		const data = {
			userId1: req.userData._id,
			userId2: req.params.userId,
		};
		followerModel.removeFollower(data, (err, reply) => {
			if (err) return next(err);
			return res.json(reply);
		});
	} catch (error) {
		return next(error);
	}
};

// follower means the users which are following me i.e. I am userId2
exports.getFollowerList = (req, res, next) => {
	try {
		followerModel.getFollowerList(req.params.userId, (err, reply) => {
			if (err) return next(err);
			return res.json(reply);
		});
	} catch (error) {
		return next(error);
	}
};

// follower means the users which are following me i.e. I am userId2
exports.getFollowerCount = (req, res, next) => {
	try {
		const data = {
			userId2: req.params.userId,
		};
		followerModel.getFollowerCount(data, (err, reply) => {
			if (err) return next(err);
			return res.json(reply);
		});
	} catch (error) {
		return next(error);
	}
};

// following means the users i am following i.e. I am userId1
exports.getFollowingList = (req, res, next) => {
	try {
		followerModel.getFollowingList(req.params.userId, (err, reply) => {
			if (err) return next(err);
			return res.json(reply);
		});
	} catch (error) {
		return next(error);
	}
};

// following means the users i am following i.e. I am userId1
exports.getFollowingCount = (req, res, next) => {
	try {
		const data = {
			userId1: req.params.userId,
		};
		followerModel.getFollowingCount(data, (err, reply) => {
			if (err) return next(err);
			return res.json(reply);
		});
	} catch (error) {
		return next(error);
	}
};

// userId1 ne follow kra userId2 ko

// userId1 k following m ayeega userId2
// following m use krenge userId1

// userId2 k follower m ayega userId1
// follower m use krenge userId2
