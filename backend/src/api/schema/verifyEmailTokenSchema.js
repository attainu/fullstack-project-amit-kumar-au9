const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const verifyEmailTokenSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('verifyEmailToken', verifyEmailTokenSchema);
