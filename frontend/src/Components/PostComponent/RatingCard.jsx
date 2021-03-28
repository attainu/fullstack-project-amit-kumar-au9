import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { addNewRating, getRatings } from '../../Redux/Actions';

const RatingCard = ({ postId, isRated }) => {
	const [newRating, setRating] = useState(0);
	const [ratingList, setRatingList] = useState([]);
	const [errorMsg, setErrorMsg] = useState('');
	const [ratingDone, setRatingDone] = useState(isRated);
	const addRatingHandler = (e) => {
		e.preventDefault();
		addNewRating(postId, newRating, (reply, err) => {
			if (reply) {
				setRating(0);
				getRatings(postId, (reply, errorMsg) => {
					if (reply) {
						setRatingList(reply.data);
					} else {
						setErrorMsg(errorMsg);
					}
				});
				setRatingDone(false);
			} else {
				setErrorMsg(err);
			}
		});
	};

	useEffect(() => {
		getRatings(postId, (reply, errorMsg) => {
			if (reply) {
				setRatingList(reply.data);
			} else {
				setErrorMsg(errorMsg);
			}
		});
	}, [postId]);

	const renderComment = () => {
		return ratingList.map((data) => {
			return (
				<div
					className="d-flex flex-row border rounded-pill mt-2 ps-3 pe-3 align-items-center justify-content-between "
					key={data._id}
				>
					<span className="text-lowercase">
						<b>{data.userData[0].name}</b>
					</span>
					<ReactStars
						count={5}
						value={data.rating}
						isHalf={true}
						size={30}
						activeColor="#FFC107"
						edit={false}
					/>
				</div>
			);
		});
	};

	return (
		<div className="commentSection p-2 border-top">
			{ratingDone && (
				<form onSubmit={addRatingHandler}>
					<div className="input-group mb-2">
						<ReactStars
							count={5}
							onChange={(value) => setRating(value)}
							isHalf={true}
							size={24}
							activeColor="#ffd700"
						/>
						<button
							className="btn btn-primary"
							type="submit"
							id="button-addon2"
						>
							Add
						</button>
					</div>
				</form>
			)}
			{errorMsg && <p>{errorMsg}</p>}
			<div className="allComment">{renderComment()}</div>
		</div>
	);
};

export default RatingCard;
