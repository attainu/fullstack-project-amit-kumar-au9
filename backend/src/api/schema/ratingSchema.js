const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
	postId: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('ratings', ratingSchema);
