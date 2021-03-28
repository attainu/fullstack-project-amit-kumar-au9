import { useState } from 'react';
import PostList from './PostComponent/PostList';

const HomePage = () => {
	const [HomeType, setHomeType] = useState('getPostForYou');
	const filterHomeType = (e) => {
		setHomeType(e.target.id);
	};
	return (
		<>
			<ul
				className="nav nav-tabs nav-fill sticky-top"
				id="myTab"
				role="tablist"
				onClick={filterHomeType}
			>
				<li className="nav-item" role="presentation">
					<button
						className="nav-link active fw-bold"
						id="getPostForYou"
						data-bs-toggle="tab"
						data-bs-target="#getPostForYou"
						type="button"
						role="tab"
						aria-controls="getPostForYou"
						aria-selected="true"
					>
						For you
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button
						className="nav-link fw-bold"
						id="getMostRatedPost"
						data-bs-toggle="tab"
						data-bs-target="#getMostRatedPost"
						type="button"
						role="tab"
						aria-controls="getMostRatedPost"
						aria-selected="false"
					>
						Most Rated
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button
						className="nav-link fw-bold"
						id="getTrendingPost"
						data-bs-toggle="tab"
						data-bs-target="#getTrendingPost"
						type="button"
						role="tab"
						aria-controls="getTrendingPost"
						aria-selected="false"
					>
						Trending
					</button>
				</li>
			</ul>
			<div>
				<PostList postUrl={`home/${HomeType}`} />
			</div>
		</>
	);
};

export default HomePage;
