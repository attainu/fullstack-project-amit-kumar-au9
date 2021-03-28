const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	occassion: {
		type: String,
		required: true,
	},
	caption: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	tags: {
		type: Array,
		required: false,
	},
	active: {
		type: Number,
		required: true,
		default: 1,
	},
	isPinned: {
		type: Boolean,
		default: false,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('post', postSchema);
