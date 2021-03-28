import { base_url } from '../config';
import axios from 'axios';

export const getOccasion = (callback) => {
	try {
		axios
			.get(`${base_url}/data/occasion/getAllOccasion`, {
				headers: {
					'Content-Type': 'application/json',
					'auth-token': localStorage.getItem('auth-token'),
				},
			})
			.then((reply) => {
				if (reply.data.status === 200) {
					callback(reply.data.data);
				} else {
					callback(false);
				}
			})
			.catch(() => callback(false));
	} catch (error) {
		callback(false);
	}
};

export const findByKeyword = (keyword, page_no, callback) => {
	try {
		axios
			.get(
				`${base_url}/search/find?keyword=${keyword}&page_no=${page_no}`,
				{
					headers: {
						'Content-Type': 'application/json',
						'auth-token': localStorage.getItem('auth-token'),
					},
				},
			)
			.then((reply) => {
				if (reply.data.status === 200) {
					callback('', reply.data.data);
				} else {
					callback(reply.data.message);
				}
			});
	} catch (error) {
		callback('Something went wrong');
	}
};
