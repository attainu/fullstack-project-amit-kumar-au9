const Joi = require('joi');

exports.loginSchema = Joi.object({
	email: Joi.string().min(6).required().email(),
	password: Joi.string().min(6).required(),
});

exports.userRegisterSchema = Joi.object({
	name: Joi.string().min(6).required(),
	email: Joi.string().min(6).required().email(),
	password: Joi.string().min(6).required(),
});

exports.resetPasswordSchema = Joi.object({
	token: Joi.string().min(6).required(),
	userId: Joi.string().min(6).required(),
	password: Joi.string().min(6).required(),
});

exports.artistRegisterSchema = Joi.object({
	name: Joi.string().min(6).required(),
	email: Joi.string().min(6).required().email(),
	password: Joi.string().min(6).required(),
	occassions: Joi.array().min(1).required(),
	type: Joi.string().required(),
});

exports.postSchema = Joi.object({
	location: Joi.string().min(1).required(),
	occassion: Joi.string().min(1).required(),
	caption: Joi.string().min(1).required(),
	description: Joi.string().min(1).required(),
	tags: Joi.array().min(1),
});
