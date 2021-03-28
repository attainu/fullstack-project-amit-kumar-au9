const Router = require('express').Router();

const {
	editDetails,
	editPic,
	getDetails,
	getAllPostByUser,
	getAllPinnedPostByUser,
	getMostRatedPostByUserId,
} = require('../controllers/artistProfileController');

const { ProfileImageValidation } = require('../validations/imageValidation');

Router.post('/editPic/:type', ProfileImageValidation, editPic);
Router.post('/editDetails', editDetails);
// get artist details
Router.get('/getDetails/:userId', getDetails);
// gallery posts
Router.get('/getAllPostByUser/:userId', getAllPostByUser);
Router.get('/getPinnedPostByUser/:userId', getAllPinnedPostByUser);
Router.get('/getMostRatedPostByUserId/:userId', getMostRatedPostByUserId);

module.exports = Router;
