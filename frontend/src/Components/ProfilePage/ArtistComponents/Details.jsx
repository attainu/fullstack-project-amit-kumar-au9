import axios from 'axios';
import { useState } from 'react';
import { base_url } from '../../../Redux/config';
import { addFollow, removeFollow } from '../../../Redux/Actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const allOccassion = ['birthday', 'wedding', 'outing'];

const Detail = (props) => {
	const [name, setName] = useState(props.Name);
	const [shortDesc, setshortDesc] = useState(props.Desc);
	const [occasssionList, setOccassion] = useState([]);
	const [error, setError] = useState('');
	const [msg, setMsg] = useState('');

	const occassionHandler = (e) => {
		const occassion = e.target.value;
		if (occasssionList.includes(occassion)) {
			let occassionAll = occasssionList;
			occassionAll.pop(occassion);
			setOccassion(occassionAll);
		} else {
			let occassionAll = occasssionList;
			occassionAll.push(occassion);
			setOccassion(occassionAll);
		}
	};

	const editProfileHandler = (e) => {
		e.preventDefault();
		const data = {
			name: name,
			occassions: occasssionList,
			shortDesc: shortDesc,
		};
		axios
			.post(`${base_url}/artist/editDetails`, data, {
				headers: {
					'Content-Type': 'application/json',
					'auth-token': localStorage.getItem('auth-token'),
				},
			})
			.then((res) => {
				setMsg(res.data.message);
			})
			.catch(() => setError('Some went wrong'));
	};

	const follow = () => {
		addFollow(props.Id, (err, message) => {
			if (err) console.log(err);
			else {
				toast.dark(`${message}...Refresh to Reload`, {
					position: 'bottom-left',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		});
	};

	const Unfollow = () => {
		removeFollow(props.Id, (err, message) => {
			if (err) console.log(err);
			else {
				toast.dark(`${message}...Refresh to Reload`, {
					position: 'bottom-left',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		});
	};

	const followRender = () => {
		let isFollow = props.followerDetail.filter((data) => {
			if (data.userId1 === props.userId) {
				return true;
			} else {
				return false;
			}
		});
		if (isFollow.length !== 0) {
			return (
				<span
					className="text-primary fw-bold"
					type="button"
					onClick={Unfollow}
				>
					Unfollow
				</span>
			);
		} else {
			return (
				<span
					className="text-primary fw-bold"
					type="button"
					onClick={follow}
				>
					Follow
				</span>
			);
		}
	};

	const renderOccassion = (data) => {
		if (data) {
			return data.map((val, idx) => {
				if (idx !== data.length - 1) {
					return (
						<span key={idx} className="text-capitalize fw-bold">
							{val},&nbsp;
						</span>
					);
				} else {
					return (
						<span key={idx} className="text-capitalize fw-bold">
							{val}
						</span>
					);
				}
			});
		} else {
			return <></>;
		}
	};

	return (
		<div className="container">
			<ToastContainer />
			<div className="d-flex flex-row justify-content-between align-items-center flex-wrap">
				<h3 className="text-primary-color fw-bolder">{props.Name}</h3>
				<span>
					<b
						className="text-muted"
						type="button"
						data-bs-toggle="modal"
						data-bs-target="#ModalBoxFollow"
					>
						{props.followerDetail.length} Follower
					</b>
					&nbsp;&nbsp;
					<b
						className="text-muted"
						type="button"
						data-bs-toggle="modal"
						data-bs-target="#ModalBoxFollowing"
					>
						{props.followingDetail.length} Following
					</b>
					&emsp;
					{props.Id === props.userId ? (
						<button
							type="button"
							data-bs-toggle="modal"
							data-bs-target="#ModalBoxDetail"
							className="btn btn-outline-primary"
						>
							Edit Profile <i className="fas fa-pen"></i>
						</button>
					) : (
						followRender()
					)}
				</span>
			</div>
			<p className="hideOn650">{renderOccassion(props.Occassion)}</p>
			<div
				className="modal fade"
				id="ModalBoxDetail"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Edit Detail
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<form onSubmit={editProfileHandler}>
								<div className="form-group">
									<label>
										Enter full name &nbsp;
										<span className="text-danger">*</span>
									</label>
									<input
										onChange={(e) => {
											setName(e.target.value);
										}}
										name="name"
										value={name}
										type="text"
										placeholder="name"
										className="form-control mb-2"
										required
									/>
								</div>
								<div className="form-group mt-2">
									<label>Choose occassion</label>
									<div className="d-flex">
										{allOccassion.map((occ, idx) => {
											return (
												<span
													className="form-check mt-2 me-2"
													key={`occ${idx}`}
												>
													<input
														type="checkbox"
														name="occassion"
														value={occ}
														className="form-check-input"
														onClick={
															occassionHandler
														}
													/>
													<label className="form-check-label text-capitalize">
														{occ}
													</label>
												</span>
											);
										})}
									</div>
								</div>
								<div className="form-group">
									<label>
										Description &nbsp;
										<span className="text-danger">*</span>
									</label>
									<textarea
										onChange={(e) => {
											setshortDesc(e.target.value);
										}}
										type="text"
										name="detail"
										placeholder="details"
										className="form-control"
										rows="5"
										required
										value={shortDesc}
									></textarea>
								</div>
								<div className="form-group">
									{msg && (
										<p className="text-success">{msg}</p>
									)}
									{error && (
										<p className="text-danger">{error}</p>
									)}
								</div>
								<div className="form-group mt-2 text-center">
									<button
										type="submit"
										className="btn btn-primary"
									>
										Edit Changes
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div
				className="modal fade"
				id="ModalBoxFollow"
				tabIndex="-1"
				aria-labelledby="ModalBoxFollow"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5
								className="modal-title"
								id="ModalBoxFollowLabel"
							>
								Follow
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							{props.followerDetail.length
								? props.followerDetail.map((val, idx) => {
										return (
											<div key={idx}>
												<img
													src={
														val.userData[0]
															.profilePic
															? val.userData[0]
																	.profilePic
															: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'
													}
													alt="user"
													width="30"
													height="30"
													className="me-3 rounded-circle"
												/>
												<b className="text-capitalize">
													{val.userData[0].name}
												</b>
											</div>
										);
								  })
								: 'No follower list'}
						</div>
					</div>
				</div>
			</div>
			<div
				className="modal fade"
				id="ModalBoxFollowing"
				tabIndex="-1"
				aria-labelledby="ModalBoxFollowing"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5
								className="modal-title"
								id="ModalBoxFollowingLabel"
							>
								Following
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							{props.followingDetail.length
								? props.followingDetail.map((val, idx) => {
										return (
											<div key={idx}>
												<img
													src={
														val.userData[0]
															.profilePic
															? val.userData[0]
																	.profilePic
															: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'
													}
													alt="user"
													width="30"
													height="30"
													className="me-3 rounded-circle"
												/>
												<b className="text-capitalize">
													{val.userData[0].name}
												</b>
											</div>
										);
								  })
								: 'No following list'}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Detail;
