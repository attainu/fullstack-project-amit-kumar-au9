import { base_url } from '../config';
import axios from 'axios';

export const fetchSavedPost = (id) => async (dispatch) => {
	try {
		dispatch({
			type: 'GET_SAVED_POST_DETAIL',
			payload: {
				PostDetail: null,
				savedPost: null,
			},
		});
		dispatch({ type: 'TOGGLE_IS_LOADING_SAVED_POST' });

		const { data: PostDetail } = await axios.get(
			`${base_url}/artist/getDetails/${id}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'auth-token': localStorage.getItem('auth-token'),
				},
			},
		);
		const { data: savedPost } = await axios.get(
			`${base_url}/save/getAllSavedPost`,
			{
				headers: {
					'Content-Type': 'application/json',
					'auth-token': localStorage.getItem('auth-token'),
				},
			},
		);
		dispatch({
			type: 'GET_SAVED_POST_DETAIL',
			payload: {
				PostDetail: PostDetail,
				savedPost: savedPost,
			},
		});
	} catch (error) {
		console.log(error);
	} finally {
		dispatch({ type: 'TOGGLE_IS_LOADING_SAVED_POST' });
	}
};
