import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../../../Redux/Actions';
import Loading from '../../Common/Loading';
import GalleryView from '../../Common/GalleryView';

const Home = ({
	Id,
	fetchPost,
	GalleryList,
	isLoadingPostDetail,
	galleryType,
}) => {
	useEffect(() => {
		fetchPost(Id, galleryType);
	}, [Id, fetchPost, galleryType]);

	if (GalleryList) {
		return (
			<>
				{GalleryList.data ? (
					GalleryList.data.map((val, idx) => {
						return <GalleryView Data={val} key={idx} />;
					})
				) : (
					<h1 className="col-12 text-center">No Post Found</h1>
				)}
			</>
		);
	} else if (isLoadingPostDetail) {
		return <Loading />;
	} else {
		return <h1>error</h1>;
	}
};

const mapStateToProps = (state) => {
	return {
		GalleryList: state.PostReducer.Post,
		isLoadingPostDetail: state.PostReducer.isLoadingPostDetail,
	};
};

export default connect(mapStateToProps, { fetchPost })(Home);
