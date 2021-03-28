const initialState = {
  ArtistDetail: null,
  AllPost: null,
  PinnedPost: null,
  MostRatedPost: null,
  followingDetail: null,
  followerDetail: null,
  followingCount: null,
  followerCount: null,

  isLoadingArtistDetail: false,
};

const ArtistReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_ARTIST_DETAIL":
      return {
        ...state,
        ArtistDetail: payload.ArtistDetail,
        AllPost: payload.AllPost,
        PinnedPost: payload.PinnedPost,
        MostRatedPost: payload.MostRatedPost,
        followingDetail: payload.followingDetail,
        followerDetail: payload.followerDetail,
        followingCount: payload.followingCount,
        followerCount: payload.followerCount,
      };
    case "TOGGLE_IS_LOADING_ARTIST_PAGE":
      return { ...state, isLoadingArtistDetail: !state.isLoadingArtistDetail };
    default:
      return state;
  }
};

export default ArtistReducer;
