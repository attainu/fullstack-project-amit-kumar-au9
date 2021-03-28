const Router = require('express').Router();

const { findByKeyword } = require('../controllers/searchController');

Router.get('/find', findByKeyword);

module.exports = Router;
