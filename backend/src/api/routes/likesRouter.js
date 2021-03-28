const Router = require('express').Router();

const {
	getLikes,
	getlikeCounts,
	manageLike,
} = require('../controllers/likesController');

// Router.get('/addLike/:postId', addLike);
// Router.get('/unLike/:postId', unLike);
Router.get('/manageLike/:postId', manageLike);
Router.get('/getLikes/:postId', getLikes);
Router.get('/getlikeCounts/:postId', getlikeCounts);

module.exports = Router;
