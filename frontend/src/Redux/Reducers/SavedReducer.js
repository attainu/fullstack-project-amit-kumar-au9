const initialState = {
  PostDetail: null,
  savedPost: null,

  isLoadingPostDetail: false,
};

const SavedReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_SAVED_POST_DETAIL":
      return {
        ...state,
        PostDetail: payload.PostDetail,
        savedPost: payload.savedPost,
      };
    case "TOGGLE_IS_LOADING_SAVED_POST":
      return { ...state, isLoadingSavedtDetail: !state.isLoadingSavedDetail };
    default:
      return state;
  }
};

export default SavedReducer;
