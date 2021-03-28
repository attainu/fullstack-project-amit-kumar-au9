import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';
import { registerUser, getOccasion } from '../../Redux/Actions';

const Register = (props) => {
	const [R_email, setREmail] = useState('');
	const [R_password, setRPassword] = useState('');
	const [name, setName] = useState('');
	const [isArtist, setIsArtist] = useState(false);
	const [occasssionSelectList, setOccassion] = useState([]);
	const [occasionList, setList] = useState([]);
	const [occasionError, setOccError] = useState(false);

	useEffect(() => {
		getOccasion((reply) => {
			if (reply) {
				setList(reply);
			} else {
				setOccError(true);
			}
		});
	}, []);

	const occassionHandler = (e) => {
		const occassion = e.target.value;
		if (occasssionSelectList.includes(occassion)) {
			let occassionAll = occasssionSelectList;
			occassionAll.pop(occassion);
			setOccassion(occassionAll);
		} else {
			let occassionAll = occasssionSelectList;
			occassionAll.push(occassion);
			setOccassion(occassionAll);
		}
	};

	const [repeatPassword, setRepeatPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (R_password === repeatPassword) {
			setPasswordError(false);
			var data = {
				email: R_email,
				password: R_password,
				name: name,
			};
			if (isArtist) {
				data = {
					...data,
					type: 'artist',
					occassions: occasssionSelectList,
				};
			}
			props.registerUser(data);
		} else {
			setPasswordError(true);
		}
	};

	return (
		<div className="container-fluid">
			<div className="signup-form login-outer-container">
				<div className="mainConatiner">
					<Zoom>
						<div className="login-form">
							<div className="signup-inner login-inner card">
								<div className="card-header">
									<h2>Create Account</h2>
								</div>
								<div className="card-body">
									<form onSubmit={handleSubmit}>
										<div className="row">
											<div className="form-group col-md-6 col-sm-6">
												<label htmlFor="full_name">
													Full Name
												</label>
												<input
													type="text"
													value={name}
													onChange={(e) =>
														setName(e.target.value)
													}
													className="form-control"
													id="full_name"
													placeholder="Enter full name"
													aria-describedby="emailHelp"
												/>
											</div>
											<div className="form-group col-md-6 col-sm-6">
												<label htmlFor="email_id">
													Email address
												</label>
												<input
													type="email"
													value={R_email}
													onChange={(e) =>
														setREmail(
															e.target.value,
														)
													}
													className="form-control"
													id="email_id"
													placeholder="Enter email address"
													aria-describedby="emailHelp"
												/>
											</div>
											<div className="form-group col-md-6 col-sm-6">
												<label htmlFor="password">
													Password
												</label>
												<input
													type="password"
													value={R_password}
													onChange={(e) =>
														setRPassword(
															e.target.value,
														)
													}
													className="form-control"
													placeholder="Enter password"
													id="password"
												/>
											</div>
											<div className="form-group col-md-6 col-sm-6">
												<label htmlFor="repeat_password">
													Repeat Password
												</label>
												<input
													type="password"
													onChange={(e) =>
														setRepeatPassword(
															e.target.value,
														)
													}
													value={repeatPassword}
													className="form-control"
													placeholder="Repeat password"
													id="repeat_password"
												/>
											</div>
											<div className="form-group mt-2">
												<input
													type="checkbox"
													name="type"
													className="form-check-input"
													onClick={() =>
														setIsArtist(!isArtist)
													}
												/>
												<label className="form-check-label ms-2">
													Are you a artist
												</label>
											</div>
											{isArtist && (
												<>
													<div className="form-group mt-2">
														<label>
															Choose occassion
														</label>
														<div className="d-flex flex-row flex-wrap">
															{!occasionError ? (
																occasionList.map(
																	(
																		occ,
																		idx,
																	) => {
																		return (
																			<span
																				className="form-check mt-2 me-2"
																				key={`occ_register${idx}`}
																			>
																				<input
																					type="checkbox"
																					name="occassion"
																					value={
																						occ
																					}
																					className="form-check-input"
																					onClick={
																						occassionHandler
																					}
																				/>
																				<label className="form-check-label text-capitalize">
																					{
																						occ
																					}
																				</label>
																			</span>
																		);
																	},
																)
															) : (
																<p className="text-danger">
																	Can't load
																	occasion,
																	Please try
																	again later
																</p>
															)}
														</div>
													</div>
												</>
											)}
											<div className="form-group mt-2 text-center">
												{props.isLoadingUserAuth ? (
													<button
														className="btn btn-primary"
														type="button"
														disabled
													>
														<span
															className="spinner-border spinner-border-sm"
															role="status"
															aria-hidden="true"
														></span>
														Loading...
													</button>
												) : (
													<button
														type="submit"
														className="pl-3 pr-3 btn btn-primary"
													>
														Create Account
													</button>
												)}
												<p className="mt-2">
													<span className="text-success">
														{props.registerMsg}
													</span>
													{passwordError ? (
														<span className="text-danger">
															Both password should
															be same
														</span>
													) : (
														<span className="text-danger">
															{
																props.registerError
															}
														</span>
													)}
												</p>
											</div>
										</div>
										<div className="form-group register-option-mobile">
											<hr />
											<h6>
												Already have an account ?
												<Link
													className=""
													to="/auth/login"
												>
													Login
												</Link>
											</h6>
										</div>
									</form>
								</div>
							</div>
						</div>
					</Zoom>
					<div className="container register-option">
						<h2>Already have an account ?</h2>
						<Link className="btn btn-danger" to="/auth/login">
							Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		registerError: state.UserAuth.registerError,
		registerMsg: state.UserAuth.registerMsg,
		isLoadingUserAuth: state.UserAuth.isLoadingUserAuth,
	};
};

export default connect(mapStateToProps, { registerUser })(Register);
