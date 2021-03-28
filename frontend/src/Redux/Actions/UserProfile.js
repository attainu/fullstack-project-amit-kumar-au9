import { base_url } from '../config';
import axios from 'axios';

export const fetchUser = (id) => async (dispatch) => {
	try {
		dispatch({
			type: 'GET_USER_DETAIL',
			payload: {
				UserDetail: null,
				savedPost: null,
				followingDetail: null,
				followingCount: null,
			},
		});
		dispatch({ type: 'TOGGLE_IS_LOADING_USER_PAGE' });

		const { data: UserDetail } = await axios.get(
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

		const { data: followingDetail } = await axios.get(
			`${base_url}/follower/getFollowingList/${id}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'auth-token': localStorage.getItem('auth-token'),
				},
			},
		);
		const { data: followingCount } = await axios.get(
			`${base_url}/follower/getFollowingCount/${id}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'auth-token': localStorage.getItem('auth-token'),
				},
			},
		);
		dispatch({
			type: 'GET_USER_DETAIL',
			payload: {
				UserDetail: UserDetail,
				savedPost: savedPost,
				followingDetail: followingDetail,
				followingCount: followingCount,
			},
		});
	} catch (error) {
		console.log(error);
	} finally {
		dispatch({ type: 'TOGGLE_IS_LOADING_USER_PAGE' });
	}
};
