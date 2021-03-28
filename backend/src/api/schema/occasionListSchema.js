const mongoose = require('mongoose');

const occasionListSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('occasionList', occasionListSchema);
