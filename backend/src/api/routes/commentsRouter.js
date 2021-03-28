const Router = require('express').Router();

const {
	addComment,
	updateComment,
	deleteComment,
	getComments,
	getCommentsCounts,
} = require('../controllers/commentsController');

Router.post('/addComment/:postId', addComment);
Router.post('/updateComment/:commentId', updateComment);
Router.get('/deleteComment/:commentId', deleteComment);
Router.get('/getComments/:postId', getComments);
Router.get('/getCommentsCounts/:postId', getCommentsCounts);

module.exports = Router;
