const Router = require('express').Router();

const {
	addRating,
	updateRating,
	deleteRating,
	getRatings,
	getAvgRatings,
} = require('../controllers/ratingsController');

Router.get('/addRating/:postId', addRating);
Router.get('/updateRating/:ratingId', updateRating);
Router.get('/deleteRating/:ratingId', deleteRating);
Router.get('/getRatings/:postId', getRatings);
Router.get('/getAvgRatings/:postId', getAvgRatings);

module.exports = Router;
