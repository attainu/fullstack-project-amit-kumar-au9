const Router = require('express').Router();

const {
	addPost,
	updatePost,
	getPostDetailByPostId,
	deletePost,
	pinPost,
	unpinPost,
} = require('../controllers/postController');

const { newPostValidation } = require('../validations/postValidation');

Router.post('/addPost', newPostValidation, addPost);
Router.post('/updatePost/:postId', newPostValidation, updatePost);
Router.get('/getPostDetail/:postId', getPostDetailByPostId);
Router.get('/deletePost/:postId', deletePost);
Router.get('/pinPost/:postId', pinPost);
Router.get('/unpinPost/:postId', unpinPost);

module.exports = Router;
