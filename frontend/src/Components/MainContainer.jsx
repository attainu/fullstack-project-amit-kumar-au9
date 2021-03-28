import SideNav from './Common/SideNav';
import RightSide from './Common/RightSide';
import HomePage from './HomePage';
import UserProfile from './ProfilePage/UserProfile';
import ArtistProfile from './ProfilePage/ArtistPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import ExplorePage from './ExplorePage';
import SavedPost from './SavedPost';
import Setting from './Setting/Index';
import PostEdit from './PostEdit';
import Loading from './Common/Loading';
import '../css/index.css';
import { ChangeColor } from '../Redux/Actions';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const MainContainer = (props) => {
	useEffect(() => {
		if (props.user) {
			if (props.user.data.themeColor) {
				ChangeColor(props.user.data.themeColor);
			}
		}
	}, [props.user]);

	if (localStorage.getItem('auth-token')) {
		if (props.user) {
			return (
				<div className="d-flex flex-row">
					<div className="leftSideBar">
						<SideNav />
					</div>
					<div className="card main-container">
						<Switch>
							<Route exact path="/" component={HomePage} />
							<Route
								exact
								path="/explore"
								component={ExplorePage}
							/>
							{props.user.type === 'user' ? (
								<Route
									exact
									path={`/profile/:id`}
									component={UserProfile}
								/>
							) : (
								<Route
									exact
									path={`/profile/:id`}
									component={ArtistProfile}
								/>
							)}
							<Route
								exact
								path="/artist/:id"
								component={ArtistProfile}
							/>
							<Route
								exact
								path="/save/:id"
								component={SavedPost}
							/>
							<Route exact path="/setting" component={Setting} />
							<Route
								exact
								path="/edit/:id"
								component={PostEdit}
							/>
						</Switch>
					</div>
					<div className="rightSideBar" style={{ height: '100vh' }}>
						<RightSide />
					</div>
				</div>
			);
		} else if (props.loginError) {
			return <Redirect to="/auth/login"></Redirect>;
		} else {
			return <Loading />;
		}
	} else {
		return <Redirect to="/auth/login"></Redirect>;
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
export default connect(mapStateToProps)(MainContainer);
