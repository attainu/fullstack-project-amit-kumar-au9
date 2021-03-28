import axios from 'axios';
import { base_url, configHeader } from '../Redux/config';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchEditPost } from '../Redux/Actions/ArtistProfile';
const PostEdit = ({
	Post,
	fetchEditPost,
	Image,
	isLoadingPostDetail,
	match,
}) => {
	const [location, setLocation] = useState(Post ? Post.data.location : '');
	const [occassion, setOccassion] = useState(Post ? Post.data.occassion : '');
	const [desc, setDesc] = useState(Post ? Post.data.description : '');
	const [caption, setCaption] = useState(Post ? Post.data.caption : '');

	useEffect(() => {
		fetchEditPost(match.params.id);
	}, [match.params.id, fetchEditPost]);

	const savePost = (e) => {
		const data = {
			location: location,
			occassion: occassion,
			description: desc,
			caption: caption,
		};
		axios
			.post(
				`${base_url}/post/updatePost/${match.params.id}`,
				data,
				configHeader,
			)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};
	if (Post) {
		return (
			<div
				style={{ border: '2px solid black' }}
				className="container d-flex flex-column justify-content-center"
			>
				<h3 className="text-center text-primary">Edit Post</h3>
				<hr />
				<div className="d-flex flex-row flex-wrap justify-content-center">
					{Image.data
						? Image.data.map((val, idx) => {
								return (
									<img
										style={{ width: 250, height: 250 }}
										src={val.file_path}
										alt="post edit"
									/>
								);
						  })
						: ''}
				</div>
				<div className="mt-5 d-flex flex-row justify-content-center">
					<div className="d-flex flex-column">
						<h4>Location:-</h4>
						<h4>Occassion:-</h4>
						<h4>Description:-</h4>
						<h4>Caption:-</h4>
					</div>
					<div className="col-4">
						<input
							name="location"
							type="text"
							value={location}
							onChange={(e) => {
								setLocation(e.target.value);
							}}
							placeholder="enter location"
							className="form-control"
						/>
						<input
							name="occassion"
							type="text"
							value={occassion}
							onChange={(e) => {
								setOccassion(e.target.value);
							}}
							placeholder="enter occassion"
							className="form-control"
						/>
						<input
							type="text"
							name="desc"
							value={desc}
							onChange={(e) => {
								setDesc(e.target.value);
							}}
							placeholder="enter description"
							className="form-control"
						/>
						<input
							type="text"
							name="caption"
							value={caption}
							onChange={(e) => {
								setCaption(e.target.value);
							}}
							placeholder="enter caption"
							className="form-control"
						/>
					</div>
				</div>
				<div>
					<button className="btn btn-light">Cancel</button>
					<button onClick={savePost} className="btn btn-info">
						Update
					</button>
				</div>
			</div>
		);
	} else if (isLoadingPostDetail) {
		return <h1>Loading</h1>;
	} else {
		return <h1>error</h1>;
	}
};
const mapStateToProps = (state) => {
	return {
		Post: state.EditPost.Post,
		Image: state.EditPost.Image,
		isLoadingPostDetail: state.EditPost.isLoadingPostDetail,
	};
};
export default connect(mapStateToProps, { fetchEditPost })(PostEdit);
