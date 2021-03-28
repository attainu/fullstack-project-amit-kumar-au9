const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
	userId1: {
		type: String,
		required: true,
	},
	userId2: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('follower', followerSchema);
