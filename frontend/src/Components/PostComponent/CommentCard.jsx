import React, { useEffect, useState } from 'react';
import { addNewComment, getComment } from '../../Redux/Actions';
import '../../css/postCard.css';

const CommentCard = ({ postId }) => {
	const [newComment, setComment] = useState('');
	const [commentList, setCommentList] = useState([]);
	const [errorMsg, setErrorMsg] = useState('');

	const addCommentHandler = (e) => {
		e.preventDefault();
		addNewComment(postId, newComment, (reply, errorMsg) => {
			if (reply) {
				setComment('');
				getComment(postId, (reply) => {
					if (reply) {
						setCommentList(reply.data);
					} else {
						setErrorMsg(errorMsg);
					}
				});
			} else {
				setErrorMsg(errorMsg);
			}
		});
	};

	useEffect(() => {
		getComment(postId, (reply, errorMsg) => {
			if (reply) {
				setCommentList(reply.data);
			} else {
				setErrorMsg(errorMsg);
			}
		});
	}, [postId]);

	const renderComment = () => {
		return commentList.map((data) => {
			return (
				<div className="border rounded-pill mb-2 p-1" key={data._id}>
					<span>
						<b className="ms-2 text-lowercase">
							{data.userData[0].name}
						</b>
						&emsp;
						{data.comment}
					</span>
				</div>
			);
		});
	};

	return (
		<div className="commentSection border-top">
			{errorMsg && <p>{errorMsg}</p>}
			<div className="allComment pe-2">{renderComment()}</div>
			<hr />
			<form
				onSubmit={addCommentHandler}
				className="input-group mt-2 newComment"
			>
				<input
					type="text"
					placeholder="Enter the comment"
					className="form-control"
					aria-label="Recipient's username"
					aria-describedby="button-addon2"
					value={newComment}
					onChange={(e) => setComment(e.target.value)}
				/>
				<button
					className="btn btn-primary"
					type="submit"
					id="button-addon2"
				>
					Post
				</button>
			</form>
		</div>
	);
};

export default CommentCard;
