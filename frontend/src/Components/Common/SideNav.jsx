import { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { logoutUser } from '../../Redux/Actions';
import '../../css/sideNav.css';

const SideNav = (props) => {
	const [isClicked, setClicked] = useState(false);
	const handleLogout = () => {
		props.logoutUser();
		props.history.push('/auth/login');
	};
	return (
		<div className={`sidebar ${isClicked ? '' : 'active'}`}>
			<Link to="/" className="logoLink">
				<img src="/logo.png" alt="logo_img" />
				<span className="hideOn650">ARTIST HUB</span>
			</Link>
			<NavLink
				to="/"
				exact
				activeClassName="optionActive"
				className="navOption"
			>
				<i className="fas fa-home option"></i>
				<span className={`showNavText ${isClicked ? '' : 'active'}`}>
					Home
				</span>
			</NavLink>
			<NavLink
				to="/explore"
				activeClassName="optionActive"
				className="navOption"
			>
				<i className="fas fa-images option"></i>
				<span className={`showNavText ${isClicked ? '' : 'active'}`}>
					Explore
				</span>
			</NavLink>
			<NavLink
				to="/quotation"
				activeClassName="optionActive"
				className="navOption"
			>
				<i className="fas fa-money-check-alt option"></i>
				<span className={`showNavText ${isClicked ? '' : 'active'}`}>
					Quotation
				</span>
			</NavLink>
			<NavLink
				to={`/save/${props.user.userId}`}
				activeClassName="optionActive"
				className="navOption"
			>
				<i className="fas fa-bookmark option"></i>
				<span className={`showNavText ${isClicked ? '' : 'active'}`}>
					Saved
				</span>
			</NavLink>
			<NavLink
				to={`/profile/${props.user.userId}`}
				activeClassName="optionActive"
				className="navOption"
			>
				<i className="fas fa-user option"></i>
				<span className={`showNavText ${isClicked ? '' : 'active'}`}>
					Profile
				</span>
			</NavLink>
			<button className="navOption btn" onClick={handleLogout}>
				<i className="fas fa-sign-out-alt option"></i>
				<span className={`showNavText ${isClicked ? '' : 'active'}`}>
					Log out
				</span>
			</button>
			<NavLink
				to="/setting"
				activeClassName="optionActive"
				className="navOption"
			>
				<i className="fas fa-cog option"></i>
				<span className={`showNavText ${isClicked ? '' : 'active'}`}>
					Setting
				</span>
			</NavLink>
			<div
				className={`showButton ${isClicked ? 'active' : ''}`}
				onClick={() => setClicked(!isClicked)}
			></div>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		user: state.UserAuth.user,
	};
};

export default connect(mapStateToProps, { logoutUser })(SideNav);
