const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../utils/config');

const userAuthModel = require('../models/authModel');

exports.registerUser = (req, res, next) => {
	try {
		var data = {
			name: req.body.name,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
			type: req.body.type || 'user',
		};
		if (req.body.type === 'artist') {
			var data = {
				...data,
				coverPic: req.body.coverPic || '',
				shortDesc: req.body.shortDesc || '',
				occassions: req.body.occassions || [],
			};
		}
		userAuthModel.registerUser(data, (err, response) => {
			if (err) return next(err);
			return res.json(response);
		});
	} catch (err) {
		return next(err);
	}
};

exports.loginUser = (req, res, next) => {
	try {
		if (req.session.authToken) {
			return res.json({
				status: 300,
				message: 'Already logged in',
				token: req.session.authToken,
			});
		}
		userAuthModel.loginUser(req.body.email, (err, userData) => {
			if (err) return next(err);
			if (!userData) {
				return res.json({
					status: 300,
					message: 'Login Failed',
					error: 'User email doesnot exist',
				});
			}
			const checkPassword = bcrypt.compareSync(
				req.body.password,
				userData.password,
			);
			if (!checkPassword)
				return res.json({
					message: 'Invalid password',
					status: 300,
				});
			var token = jwt.sign({ id: userData._id }, secret, {
				expiresIn: 86400,
			});
			req.session.authToken = token;
			return res.header('auth-token', token).json({
				message: 'Login successfull',
				status: 200,
				email: userData.email,
				name: userData.name,
				token: token,
				type: userData.type,
				data: userData,
				userId: userData._id,
			});
		});
	} catch (err) {
		return next(err);
	}
};

exports.logoutUser = (req, res, next) => {
	try {
		if (req.session.authToken) {
			req.session.destroy((err) => {
				if (err) return next(err);
				return res.json({
					message: 'User Logged out successfully',
					status: 200,
				});
			});
		} else {
			return res.json({
				message: 'User not logged in, login first',
				status: 300,
			});
		}
	} catch (err) {
		return next(err);
	}
};

exports.getUserDetail = (req, res, next) => {
	try {
		userAuthModel.getUserDetail(req.userData._id, (err, result) => {
			if (err) return res.json({ status: 500, message: 'DB error' });
			return res.json({
				message: 'User detail',
				status: 200,
				email: result.email,
				name: result.name,
				type: result.type,
				data: result,
				userId: result._id,
			});
		});
	} catch (error) {
		return next(err);
	}
};
