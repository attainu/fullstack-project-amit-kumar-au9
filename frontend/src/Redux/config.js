require('dotenv').config();
export const base_url = process.env.REACT_APP_API_URL;
export const configHeader = {
	headers: {
		'Content-Type': 'application/json',
		'auth-token': localStorage.getItem('auth-token'),
	},
};
