const Router = require('express').Router();

const {
	getAllPost,
	getPostByOccasssion,
	getPostByTag,
} = require('../controllers/explorePageController');

Router.get('/getAllPost', getAllPost); //sort by time
Router.get('/searchPostByOccasssion/:type', getPostByOccasssion); //search post by occassion
Router.get('/searchPostByTag/:tag', getPostByTag); //search post by tags

module.exports = Router;
