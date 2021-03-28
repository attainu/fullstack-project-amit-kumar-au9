import { combineReducers } from 'redux';

import UserAuth from './UserAuth';
import ArtistReducer from './ArtistReducer';
import UserReducer from './UserReducer';
import PostReducer from './PostReducer';
import SavedReducer from './SavedReducer';
import EditPost from './EditPost';
import GetPostList from './getPostList';

const rootReducer = combineReducers({
	UserAuth,
	GetPostList,
	ArtistReducer,
	UserReducer,
	PostReducer,
	SavedReducer,
	EditPost,
});

export default rootReducer;
