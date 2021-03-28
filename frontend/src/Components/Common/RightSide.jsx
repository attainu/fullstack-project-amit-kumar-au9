import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/rightSideNav.css';
import { findByKeyword } from '../../Redux/Actions';
const RightSide = () => {
	const [keyword, setKeyword] = useState('');
	const [error, setError] = useState('');
	const [searchList, setList] = useState([]);
	const [page_no, setPage] = useState(1);

	const searchHandler = (e) => {
		setPage(1);
		e.preventDefault();
		if (keyword !== '') {
			findByKeyword(keyword, 1, (err, reply) => {
				if (err) {
					setError(err);
				} else {
					setList(reply);
				}
			});
		} else {
			setList([]);
		}
	};

	const changeHandler = (e) => {
		setPage(1);
		setKeyword(e.target.value);
		if (e.target.value === '') {
			setList([]);
		} else {
			findByKeyword(e.target.value, 1, (err, reply) => {
				if (err) {
					setError(err);
				} else {
					setList(reply);
				}
			});
		}
	};

	const loadMore = () => {
		setPage(page_no + 1);
		findByKeyword(keyword, page_no + 1, (err, reply) => {
			if (err) {
				setError(err);
			} else {
				setList(reply);
			}
		});
	};

	return (
		<>
			<div className="search-container container">
				<form className="mt-2" onSubmit={searchHandler}>
					<div className="input-group mb-3">
						<input
							type="search"
							className="form-control text-capitalize"
							placeholder="Search post/user"
							value={keyword}
							aria-label="Search post/user"
							aria-describedby="button-search"
							onChange={changeHandler}
						/>
						<button
							className="btn btn-light"
							type="submit"
							id="button-search"
						>
							<i className="fas fa-search"></i>
						</button>
					</div>
				</form>
				<div className="searchResult">
					{!error ? (
						searchList.map((data) => {
							return (
								<Link to={`/artist/${data._id}`} key={data._id}>
									<div>
										<img
											src={
												data.profilePic
													? data.profilePic
													: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'
											}
											alt="user"
											width="30"
											height="30"
											className="me-2 rounded-circle"
										/>
										<b className="text-capitalize">
											{data.name}
										</b>
									</div>
								</Link>
							);
						})
					) : (
						<div>{error}</div>
					)}
				</div>
				{searchList.length === 20 && (
					<p className="loadMore" onClick={loadMore}>
						Load more...
					</p>
				)}
			</div>
			<div className="footer">
				<span>Terms of Service</span>
				<span>Privacy Policy</span>
				<span>Cookie Policy</span>
				<span>&copy; 2021 Artist Hub, Inc.</span>
			</div>
		</>
	);
};
export default RightSide;
