const userSchema = require('../schema/userSchema');
const tokenSchema = require('../schema/tokenSchema');
const verifyEmailTokenSchema = require('../schema/verifyEmailTokenSchema');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const { ObjectId } = require('mongodb');

const clientURL = process.env.HOST_URL;
const backendURL = process.env.BACKEND_URL;

exports.registerUser = (userData, callback) => {
	try {
		userSchema.findOne({ email: userData.email }, async (err, reply) => {
			if (err) return callback(err);
			if (reply)
				return callback('', {
					message: 'User email already exist',
					status: 300,
				});
			else {
				const user = await userSchema(userData).save();
				let verifyToken = crypto.randomBytes(32).toString('hex');
				const hash = await bcrypt.hash(verifyToken, 8);
				await new verifyEmailTokenSchema({
					userId: user._id,
					token: hash,
					createdAt: Date.now(),
				}).save();
				const link = `${backendURL}/auth/verifyEmail?token=${verifyToken}&id=${user._id}`;
				var transporter = nodemailer.createTransport({
					host: process.env.MAIL_HOST,
					port: process.env.MAIL_PORT,
					auth: {
						user: process.env.MAIL_USER,
						pass: process.env.MAIL_PASSWORD,
					},
				});
				var mailOptions = {
					from: 'Artist Hub',
					to: user.email,
					subject: 'Verify Email',
					html: `<h4>Hi ${user.name},</h4>
							<p>We just need to verify your email address before you can access Artist Hub.</p>
							<p>Verify your email address by clicking here <a href="${link}" target="_blank">link</a></p>
							<b>Thanks! – The Artist Hub team</b>`,
				};
				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						return callback(error);
					} else {
						return callback('', {
							message:
								'Register Successfull, Check your email to verify account',
							status: 200,
						});
					}
				});
			}
		});
	} catch (err) {
		return callback(err);
	}
};

exports.loginUser = (email, callback) => {
	try {
		userSchema.findOne({ email: email }, (err, reply) => {
			if (err) return callback(err);
			return callback('', reply);
		});
	} catch (err) {
		return callback(err);
	}
};

exports.getUserDetail = (user_id, callback) => {
	try {
		userSchema.findOne({ _id: user_id }, (err, reply) => {
			if (err) return callback(err);
			return callback('', reply);
		});
	} catch (err) {
		return callback(err);
	}
};

exports.emailExist = (email, callback) => {
	try {
		userSchema
			.findOne({ email: email })
			.then(async (user) => {
				if (user) {
					let token = await tokenSchema.findOne({
						userId: String(user._id),
					});
					if (token) {
						await token.deleteOne();
					}
					let resetToken = crypto.randomBytes(32).toString('hex');
					const hash = await bcrypt.hash(resetToken, 8);
					await new tokenSchema({
						userId: user._id,
						token: hash,
						createdAt: Date.now(),
					}).save();
					const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
					var transporter = nodemailer.createTransport({
						host: process.env.MAIL_HOST,
						port: process.env.MAIL_PORT,
						auth: {
							user: process.env.MAIL_USER,
							pass: process.env.MAIL_PASSWORD,
						},
					});
					var mailOptions = {
						from: 'Artist Hub',
						to: user.email,
						subject: 'Reset Password',
						html:
							'<h4>Hi ' +
							user.name +
							'</h4> <p>You requested to reset your password</p><a href="' +
							link +
							'" target="_blank">Reset Password Link</a>',
					};
					transporter.sendMail(mailOptions, function (error, info) {
						if (error) {
							return callback(error);
						} else {
							return callback('', {
								message: 'Check your email',
								status: 200,
							});
						}
					});
				} else {
					return callback('', {
						message: 'User does not exist',
						status: 400,
					});
				}
			})
			.catch((err) => {
				return callback(err);
			});
	} catch (err) {
		return callback(err);
	}
};

exports.passwordReset = async (token, userId, password, callback) => {
	try {
		let passwordResetToken = await tokenSchema.findOne({ userId: userId });
		if (!passwordResetToken) {
			return callback('', {
				message: 'Invalid or expired password reset token',
				status: 300,
			});
		}
		const isValid = await bcrypt.compare(token, passwordResetToken.token);
		if (!isValid) {
			return callback('', {
				message: 'Invalid or expired password reset token',
				status: 300,
			});
		}
		const hash = await bcrypt.hash(password, 8);
		await userSchema.updateOne(
			{ _id: ObjectId(userId) },
			{ $set: { password: hash } },
			{ new: true },
		);
		await passwordResetToken.deleteOne();
		return callback('', {
			message: 'Password reset successfully',
			status: 200,
		});
	} catch (err) {
		return callback(err);
	}
};

exports.verifyEmail = async (token, userId, callback) => {
	try {
		let verifyEmailToken = await verifyEmailTokenSchema.findOne({
			userId: userId,
		});
		if (!verifyEmailToken) {
			return callback('', {
				message: 'Invalid or expired verification token',
				status: 300,
			});
		}
		const isValid = await bcrypt.compare(token, verifyEmailToken.token);
		if (!isValid) {
			return callback('', {
				message: 'Invalid or expired verification token',
				status: 300,
			});
		}
		await userSchema.updateOne(
			{ _id: ObjectId(userId) },
			{ $set: { isActive: 1 } },
		);
		await verifyEmailToken.deleteOne();
		return callback('', {
			message: 'Email verified successfully',
			status: 200,
		});
	} catch (err) {
		return callback(err);
	}
};
