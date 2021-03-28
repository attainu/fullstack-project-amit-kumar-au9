const Router = require('express').Router();

const { editThemeColor } = require('../controllers/settingController');

Router.post('/editThemeColor', editThemeColor);

module.exports = Router;
