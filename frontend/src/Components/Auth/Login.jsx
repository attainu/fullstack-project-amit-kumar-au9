import React, { useState } from 'react';
import Zoom from 'react-reveal/Zoom';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../Redux/Actions';
import '../../css/Login.css';

const Login = (props) => {
	const [L_email, setLEmail] = useState('');
	const [L_password, setLPassword] = useState('');
	const LoginHandler = (e) => {
		e.preventDefault();
		var data = {
			email: L_email,
			password: L_password,
		};
		props.loginUser(data);
	};

	if (!props.user) {
		return (
			<>
				<div className="login-outer-container">
					<div className="mainConatiner">
						<Zoom>
							<div className="login-form">
								<div className="login-inner card">
									<div className="card-header">
										<h2>LOGIN</h2>
									</div>
									<div className="card-body">
										<form onSubmit={LoginHandler}>
											<div className="form-group">
												<label htmlFor="exampleInputEmail1">
													Email address
												</label>
												<input
													type="email"
													value={L_email}
													onChange={(e) =>
														setLEmail(
															e.target.value,
														)
													}
													className="form-control"
													id="exampleInputEmail1"
													placeholder="Enter email address"
													aria-describedby="emailHelp"
												/>
											</div>
											<div className="form-group mt-2">
												<label htmlFor="exampleInputPassword1">
													Password
												</label>
												<input
													type="password"
													value={L_password}
													onChange={(e) =>
														setLPassword(
															e.target.value,
														)
													}
													className="form-control"
													placeholder="Enter password"
													id="exampleInputPassword1"
													autoComplete="true"
												/>
											</div>
											{props.loginError && (
												<p className="text-danger">
													{props.loginError}
												</p>
											)}
											{props.loginMsg && (
												<p className="text-success">
													{props.loginMsg}
												</p>
											)}
											<div className="form-group text-center mt-4">
												<button
													type="submit"
													className="pe-3 ps-3 btn btn-primary"
												>
													Login
												</button>
											</div>
											<div className="form-group register-option-mobile">
												<hr />
												<h6>
													Don't have an account ?{' '}
													<Link
														className=""
														to="/auth/register"
													>
														Register
													</Link>
												</h6>
											</div>
										</form>
									</div>
								</div>
							</div>
						</Zoom>
						<div className="container register-option">
							<h2>Don't have an account ? </h2>
							<Link
								className="btn btn-danger"
								to="/auth/register"
							>
								Register
							</Link>
						</div>
					</div>
				</div>
			</>
		);
	} else {
		return <Redirect to="/"></Redirect>;
	}
};

const mapStateToProps = (state) => {
	return {
		user: state.UserAuth.user,
		loginError: state.UserAuth.loginError,
		loginMsg: state.UserAuth.loginMsg,
		isLoadingUserAuth: state.UserAuth.isLoadingUserAuth,
	};
};

export default connect(mapStateToProps, { loginUser })(Login);
