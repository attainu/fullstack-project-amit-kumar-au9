const Router = require('express').Router();

const {
	getAllOccasion,
	addOccasion,
	deleteOccasion,
} = require('../controllers/occasionListController');

Router.get('/addOccasion', addOccasion);
Router.delete('/deleteOccasion', deleteOccasion);
Router.get('/getAllOccasion', getAllOccasion);

module.exports = Router;
