import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../css/Header.css';

const Header = () => {
	return (
		<>
			<nav className="navbar navbar-expand-lg sticky-top">
				<div className="d-flex flex-grow-1 justify-content-between">
					<Link to="/" className="navbar-brand">
						<span className="text-light text-uppercase">
							Artist Hub
						</span>
					</Link>
					<NavLink
						className="btn text-light fw-bold"
						to="/auth/login"
					>
						Login/Signup &nbsp;
						<i
							className="fas fa-sign-in-alt"
							aria-hidden="true"
						></i>
					</NavLink>
				</div>
			</nav>
		</>
	);
};

export default Header;
