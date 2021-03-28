const mongoose = require('mongoose');

const saveSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	postId: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('save_post', saveSchema);
