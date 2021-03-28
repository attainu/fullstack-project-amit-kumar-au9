const initialState = {
  Post: null,
  Image: null,

  isLoadingPostDetail: false,
};

const EditPost = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_EDIT_POST_DETAIL":
      return {
        ...state,
        Post: payload.Post,
        Image: payload.Image,
      };
    case "TOGGLE_IS_LOADING_EDIT_POST_PAGE":
      return { ...state, isLoadingPostDetail: !state.isLoadingPostDetail };
    default:
      return state;
  }
};

export default EditPost;
