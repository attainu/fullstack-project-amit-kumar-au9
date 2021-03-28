var cloudinary = require('cloudinary').v2;
const { cloudinary_config } = require('./config');

cloudinary.config(cloudinary_config);

module.exports = cloudinary;
