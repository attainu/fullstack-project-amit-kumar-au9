const Router = require('express').Router();

const {
	manageSave,
	getAllSavedPost,
} = require('../controllers/savePostController');

// Router.get('/savePost/:postId', savePost);
// Router.get('/removePost/:postId', removePost);
Router.get('/manageSave/:postId', manageSave);
Router.get('/getAllSavedPost', getAllSavedPost);

module.exports = Router;
