const Router = require('express').Router();

const {
	getPostForYou,
	getMostRatedPost,
	getTrendingPost,
} = require('../controllers/homePageController');

Router.get('/getPostForYou', getPostForYou); //post of followed artist by latest post
Router.get('/getMostRatedPost', getMostRatedPost); //sort by rating
Router.get('/getTrendingPost', getTrendingPost); //sort by likes

module.exports = Router;
