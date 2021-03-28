const initialState = {
	postList: null,
	postListError: null,

	isLoadingPostList: false,
};

const getPostList = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'GET_POST_LIST':
			return {
				...state,
				postList: payload,
			};
		case 'GET_POST_LIST_ERROR':
			return { ...state, postListError: payload };
		case 'TOGGLE_IS_LOADING_POST_LIST':
			return { ...state, isLoadingPostList: !state.isLoadingPostList };
		default:
			return state;
	}
};

export default getPostList;
