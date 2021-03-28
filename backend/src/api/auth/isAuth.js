const jwt = require('jsonwebtoken');
const { secret } = require('../utils/config');
const { getUserDetail } = require('../models/authModel');

// const authChecker = (req, res, next) => {
// 	const headertoken = req.header('auth-token');
// 	const sessionToken = req.session.authToken;
// 	if (sessionToken) {
// 		if (headertoken) {
// 			if (sessionToken === headertoken) {
// 				try {
// 					const user_id = jwt.verify(headertoken, secret);
// 					getUserDetail(user_id.id, (err, result) => {
// 						if (err)
// 							return res.json({
// 								status: 500,
// 								message: 'DB error',
// 								error: err,
// 							});
// 						if (result) {
// 							req.userData = result;
// 							next();
// 						} else {
// 							return res.json({
// 								status: 300,
// 								message: 'Invalid login, Please Login Again',
// 							});
// 						}
// 					});
// 				} catch (err) {
// 					return res.json({
// 						status: 300,
// 						message: 'Invalid login, Please Login Again',
// 						error: err,
// 					});
// 				}
// 			} else {
// 				return res.json({
// 					status: 300,
// 					message: 'No session found for this token',
// 				});
// 			}
// 		} else {
// 			return res.json({
// 				status: 300,
// 				message: 'Token not present in header',
// 			});
// 		}
// 	} else {
// 		return res.json({
// 			status: 300,
// 			message: 'Session not found, Login again',
// 		});
// 	}
// };

const authChecker = (req, res, next) => {
	const token = req.header('auth-token');
	if (!token) return res.json({ status: 300, message: 'User not logged in' });
	try {
		const user_id = jwt.verify(token, secret);
		getUserDetail(user_id.id, (err, result) => {
			if (err) return res.json({ status: 500, message: 'DB error' });
			if (result) {
				req.userData = result;
				next();
			} else {
				return res.json({
					status: 300,
					message: 'Login Expired, Please Login Again',
				});
			}
		});
	} catch (err) {
		return res.json({
			status: 300,
			message: 'Login Expired, Please Login Again',
		});
	}
};

module.exports = authChecker;
