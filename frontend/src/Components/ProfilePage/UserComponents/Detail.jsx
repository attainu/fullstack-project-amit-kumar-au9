import axios from 'axios';
import { useState } from 'react';
import { base_url } from '../../../Redux/config';

const Detail = (props) => {
	const [name, setName] = useState(props.Name);
	const [shortDesc, setshortDesc] = useState(props.Desc);
	const [error, setError] = useState('');
	const [msg, setMsg] = useState('');

	const editProfileHandler = (e) => {
		e.preventDefault();
		const data = {
			name: name,
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

	return (
		<div className="container">
			<div className="d-flex flex-row justify-content-between align-items-center flex-wrap">
				<h3 className="text-primary-color fw-bolder">{props.Name}</h3>
				<span>
					<b
						className="text-muted"
						type="button"
						data-bs-toggle="modal"
						data-bs-target="#ModalBoxFollowing"
					>
						{props.followingDetail.length} Following
					</b>
					&emsp;
					<button
						type="button"
						data-bs-toggle="modal"
						data-bs-target="#ModalBoxDetail"
						className="btn btn-outline-primary"
					>
						Edit Profile <i className="fas fa-pen"></i>
					</button>
				</span>
			</div>
			<p className="hideOn650 text-justify">{props.Desc}</p>
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
