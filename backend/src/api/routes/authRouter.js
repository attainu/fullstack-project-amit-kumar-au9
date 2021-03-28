const Router = require('express').Router();
const authChecker = require('../auth/isAuth');
const {
	loginUser,
	registerUser,
	logoutUser,
	getUserDetail,
	emailExist,
	passwordReset,
	verifyEmail,
} = require('../controllers/authController');

const {
	loginValidation,
	registerValidation,
	resetPassword,
} = require('../validations/authValidation');

Router.post('/registerUser', registerValidation, registerUser);
Router.post('/loginUser', loginValidation, loginUser);
Router.get('/logout', logoutUser);
// get user detail
Router.get('/getUserDetail', authChecker, getUserDetail);
// verify email account
Router.get('/verifyEmail', verifyEmail);
// forgot password
Router.get('/emailExist', emailExist);
Router.post('/passwordReset', resetPassword, passwordReset);

module.exports = Router;
