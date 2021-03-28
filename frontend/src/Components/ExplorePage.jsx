import { useEffect, useState } from 'react';
import PostList from './PostComponent/PostList';
import { getOccasion } from '../Redux/Actions';

const ExplorePage = () => {
	const [ExploreType, setExploreType] = useState('getAllPost');
	const [showOccasssion, setShowOccasssion] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [search, setSearch] = useState('');
	const [occasionList, setList] = useState([]);
	const [occasionError, setOccError] = useState(false);

	const searchHandler = (e) => {
		e.preventDefault();
		setExploreType(`searchPostByTag/${search}`);
	};
	useEffect(() => {
		getOccasion((reply) => {
			if (reply) {
				setList(reply);
			} else {
				setOccError(true);
			}
		});
	}, []);
	return (
		<>
			<ul
				className="nav nav-tabs nav-fill sticky-top"
				id="myTab"
				role="tablist"
			>
				<li className="nav-item" role="presentation">
					<button
						className="nav-link active fw-bold"
						id="getAllPost"
						onClick={(e) => {
							setExploreType(e.target.id);
							setShowOccasssion(false);
							setShowSearch(false);
						}}
						data-bs-toggle="tab"
						data-bs-target="#getAllPost"
						type="button"
						role="tab"
						aria-controls="getAllPost"
						aria-selected="true"
					>
						All Post
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button
						className="nav-link fw-bold"
						id="showOccasssion"
						onClick={() => {
							setShowOccasssion(!showOccasssion);
							setShowSearch(false);
						}}
						data-bs-toggle="tab"
						data-bs-target="#showOccasssion"
						type="button"
						role="tab"
						aria-controls="showOccasssion"
						aria-selected="false"
					>
						By Occasssion
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button
						className="nav-link fw-bold"
						id="searchPostByTag"
						onClick={() => {
							setShowSearch(!showSearch);
							setShowOccasssion(false);
						}}
						data-bs-toggle="tab"
						data-bs-target="#searchPostByTag"
						type="button"
						role="tab"
						aria-controls="searchPostByTag"
						aria-selected="false"
					>
						By Tag
					</button>
				</li>
			</ul>
			{!occasionError ? (
				showOccasssion && (
					<select
						className="form-select"
						onClick={(e) =>
							setExploreType(
								`searchPostByOccasssion/${e.target.value}`,
							)
						}
					>
						{occasionList.map((occ, idx) => {
							return (
								<option
									key={`occ_${idx}`}
									value={occ}
									className="text-capitalize"
								>
									{occ}
								</option>
							);
						})}
					</select>
				)
			) : (
				<p className="text-danger">
					Can't load occasion, Please try again later
				</p>
			)}
			{showSearch && (
				<form onSubmit={searchHandler}>
					<div className="input-group mb-3">
						<input
							type="search"
							placeholder="Search"
							className="form-control"
							aria-label="Recipient's username"
							aria-describedby="button-addon2"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button
							className="btn btn-primary"
							type="submit"
							id="button-addon2"
						>
							<i className="fas fa-search"></i>
						</button>
					</div>
				</form>
			)}
			<div className="container-fluid">
				<PostList postUrl={`explore/${ExploreType}`} />
			</div>
		</>
	);
};

export default ExplorePage;
