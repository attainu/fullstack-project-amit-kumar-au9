const Router = require('express').Router();
const authChecker = require('../auth/isAuth');
const {
	loginUser,
	registerUser,
	logoutUser,
	getUserDetail,
} = require('../controllers/authController');

const {
	loginValidation,
	registerValidation,
} = require('../validations/authValidation');

Router.post('/registerUser', registerValidation, registerUser);
Router.post('/loginUser', loginValidation, loginUser);
Router.get('/logout', logoutUser);
Router.get('/getUserDetail', authChecker, getUserDetail);

module.exports = Router;
