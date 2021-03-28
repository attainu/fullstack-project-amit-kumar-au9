const mongoose = require('mongoose');

const postFilesSchema = new mongoose.Schema({
	postId: {
		type: String,
		required: true,
	},
	file_path: {
		type: String,
		required: true,
	},
	cloudinary_id: {
		type: String,
		required: true,
	},
	isImage: {
		type: Boolean,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('postFiles', postFilesSchema);
