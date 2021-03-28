const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	postId: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	comment: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('comment', commentSchema);
