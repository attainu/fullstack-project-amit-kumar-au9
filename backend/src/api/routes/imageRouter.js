const Router = require('express').Router();

const {
	addImage,
	getPostImages,
	deleteImage,
	updateImage,
} = require('../controllers/imageVideoController');

const { ImageValidation } = require('../validations/imageValidation');

Router.post('/addImage', ImageValidation, addImage);
Router.post('/updateImage', ImageValidation, updateImage);
Router.post('/deleteImage', deleteImage);
Router.get('/getImages/:postId', getPostImages);

module.exports = Router;
