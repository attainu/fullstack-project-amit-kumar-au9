const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	postId: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('likes', postSchema);
