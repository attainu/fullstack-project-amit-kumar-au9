import { base_url } from '../config';
import axios from 'axios';

export const fetchArtist = (id) => async (dispatch) => {
	try {
		dispatch({
			type: 'GET_ARTIST_DETAIL',
			payload: {
				ArtistDetail: null,
				followingDetail: null,
				followerDetail: null,
				followingCount: null,
				followerCount: null,
			},
		});
		dispatch({ type: 'TOGGLE_IS_LOADING_ARTIST_PAGE' });

		const { data: ArtistDetail } = await axios.get(
			`${base_url}/artist/getDetails/${id}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'auth-token': localStorage.getItem('auth-token'),
				},
			},
		);
		const { data: follower } = await axios.get(
			`${base_url}/follower/getFollowerList/${id}`,
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
		dispatch({
			type: 'GET_ARTIST_DETAIL',
			payload: {
				ArtistDetail: ArtistDetail,
				followingDetail: followingDetail,
				followerDetail: follower,
			},
		});
	} catch (error) {
		console.log(error);
	} finally {
		dispatch({ type: 'TOGGLE_IS_LOADING_ARTIST_PAGE' });
	}
};

export const fetchPost = (id, page) => async (dispatch) => {
	try {
		dispatch({
			type: 'GET_POST_DETAIL',
			payload: {
				Post: null,
			},
		});
		dispatch({ type: 'TOGGLE_IS_LOADING_POST_PAGE' });

		const { data } = await axios.get(`${base_url}/artist/${page}/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				'auth-token': localStorage.getItem('auth-token'),
			},
		});
		dispatch({
			type: 'GET_POST_DETAIL',
			payload: {
				Post: data,
			},
		});
	} catch (error) {
		console.log(error);
	} finally {
		dispatch({ type: 'TOGGLE_IS_LOADING_POST_PAGE' });
	}
};

export const fetchEditPost = (id) => async (dispatch) => {
	try {
		dispatch({
			type: 'GET_EDIT_POST_DETAIL',
			payload: {
				Post: null,
				Image: null,
			},
		});
		dispatch({ type: 'TOGGLE_IS_LOADING_EDIT_POST_PAGE' });

		const { data } = await axios.get(
			`${base_url}/post/getPostDetail/${id}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'auth-token': localStorage.getItem('auth-token'),
				},
			},
		);
		const { data: image } = await axios.get(
			`${base_url}/image/getImages/${id}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'auth-token': localStorage.getItem('auth-token'),
				},
			},
		);
		dispatch({
			type: 'GET_EDIT_POST_DETAIL',
			payload: {
				Post: data,
				Image: image,
			},
		});
	} catch (error) {
		console.log(error);
	} finally {
		dispatch({ type: 'TOGGLE_IS_LOADING_EDIT_POST_PAGE' });
	}
};
