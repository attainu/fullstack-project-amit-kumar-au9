import { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import '../../css/sideNav.css';

const SideNav = (props) => {
	const [isClicked, setClicked] = useState(false);
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
			{props.user.type === 'artist' && (
				<NavLink to="/addPost" className="navOption addPost">
					<i className="fas fa-plus option"></i>
					<span
						className={`showNavText ${isClicked ? '' : 'active'}`}
					>
						Add Post
					</span>
				</NavLink>
			)}
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

export default connect(mapStateToProps)(SideNav);
