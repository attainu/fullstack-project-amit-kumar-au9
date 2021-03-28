const initialState = {
  UserDetail: null,
  savedPost: null,
  followingDetail: null,
  followingCount: null,

  isLoadingUserDetail: false,
};

const UserReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_USER_DETAIL":
      return {
        ...state,
        UserDetail: payload.UserDetail,
        savedPost: payload.savedPost,
        followingDetail: payload.followingDetail,
        followingCount: payload.followingCount,
      };
    case "TOGGLE_IS_LOADING_USER_PAGE":
      return { ...state, isLoadingUserDetail: !state.isLoadingUserDetail };
    default:
      return state;
  }
};

export default UserReducer;
