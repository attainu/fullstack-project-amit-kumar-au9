const dotenv = require('dotenv');
dotenv.config();

exports.mongo_url = process.env.MONGO_URL;

exports.secret = process.env.JWT_SECRET_KEY;

exports.cloudinary_config = {
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
};

exports.page_size = 20;

exports.session_secret = process.env.SESSION_SECRET_KEY;
