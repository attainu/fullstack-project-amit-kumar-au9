import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPostList } from '../../Redux/Actions';
import Loading from '../Common/Loading';
import PostCard from './PostCard';

const page_no = 1;

const Home = ({
	postUrl,
	getPostList,
	postList,
	postListError,
	isLoadingPostList,
	user,
}) => {
	useEffect(() => {
		getPostList(postUrl, page_no);
	}, [getPostList, postUrl]);

	if (postList) {
		return (
			<>
				{postList.map((post, idx) => {
					return (
						<PostCard
							key={idx}
							data={post}
							userType={user.type}
							userId={user.userId}
							postUrl={postUrl}
							pageNo={page_no}
						/>
					);
				})}
			</>
		);
	} else if (isLoadingPostList) {
		return <Loading />;
	} else {
		return <p>{postListError}</p>;
	}
};

const mapStateToProps = (state) => {
	return {
		user: state.UserAuth.user,
		postList: state.GetPostList.postList,
		postListError: state.GetPostList.postListError,
		isLoadingPostList: state.GetPostList.isLoadingPostList,
	};
};

export default connect(mapStateToProps, { getPostList })(Home);
