import axios from 'axios';
import { useState } from 'react';
import { base_url } from '../../../Redux/config';

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
				// props.fetchArtist(props.match.params.id);
			})
			.catch(() => setError('Some went wrong'));
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
					{props.Id !== localStorage.getItem('userId') ? (
						<button
							type="button"
							data-bs-toggle="modal"
							data-bs-target="#ModalBoxDetail"
							className="btn btn-outline-primary"
						>
							Edit Profile <i className="fas fa-pen"></i>
						</button>
					) : (
						<button className="btn btn-outline-primary">
							Hire <i className="fas fa-user-plus"></i>
						</button>
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
										return <p key={idx}>{val.userId1}</p>;
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
										return <p key={idx}>{val.userId1}</p>;
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
