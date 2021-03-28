// import { Link } from 'react-router-dom';
import '../../css/galleryPost.css';
import { savePost } from '../../Redux/Actions';

const GalleryView = ({ Data, unSave }) => {
	const unsaveHandler = () => {
		savePost(Data.postId, (__, _) => {});
	};
	return (
		<div className="galleryPost">
			{/* <Link to={`/post/${Data.postId}`}> */}
			<img src={Data.all_files.files[0]} alt="gallery" />
			{/* </Link> */}
			{unSave && (
				<div onClick={unsaveHandler}>
					<i
						className="fas fa-bookmark deleteButton"
						type="button"
					></i>
				</div>
			)}
		</div>
	);
};
export default GalleryView;
