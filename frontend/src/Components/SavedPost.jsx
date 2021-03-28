import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSavedPost } from '../Redux/Actions/SavedPost';
import GalleryView from './Common/GalleryView';
import Loading from './Common/Loading';
import ErrorPage from './Common/ErrorPage';

const SavedPost = ({
	match,
	fetchSavedPost,
	PostDetail,
	savedPost,
	isLoadingSavedtDetail,
}) => {
	useEffect(() => {
		fetchSavedPost(match.params.id);
	}, [fetchSavedPost, match.params.id]);
	if (PostDetail) {
		if (PostDetail.data) {
			return (
				<>
					<div className="text-center mt-2 mb-2">
						<b className="save_post_border">
							&emsp; SAVED POST &emsp;
						</b>
					</div>
					<div className="d-flex flex-row flex-wrap">
						{savedPost.data.length ? (
							savedPost.data.map((val, idx) => {
								return (
									<GalleryView
										Data={val}
										key={idx}
										unSave={true}
									/>
								);
							})
						) : (
							<div className="col-12 mt-5 text-center">
								<p>Only you can see what you've saved</p>
								<img
									style={{
										border: '2px solid black',
										width: 100,
										height: 100,
										borderRadius: 100 / 2,
									}}
									src="https://i.pinimg.com/originals/ca/44/77/ca4477c4eeff8d0ac211fa114be21e6c.png"
									alt="saved post"
								/>
								<p>
									Save photos and videos that you want to see
									again.
								</p>
								<p>
									No one is notified, and only you can see
									what you've saved.
								</p>
							</div>
						)}
					</div>
				</>
			);
		} else {
			return <h1>{PostDetail.message}</h1>;
		}
	} else if (isLoadingSavedtDetail) {
		return <Loading />;
	} else {
		return <ErrorPage error="Something went wrong" />;
	}
};

const mapStateToProps = (state) => {
	return {
		PostDetail: state.SavedReducer.PostDetail,
		savedPost: state.SavedReducer.savedPost,
		isLoadingSavedtDetail: state.SavedReducer.isLoadingSavedtDetail,
	};
};
export default connect(mapStateToProps, { fetchSavedPost })(SavedPost);
