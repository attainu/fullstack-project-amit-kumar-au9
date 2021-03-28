import Theme from './Theme';
import { connect } from 'react-redux';
import { logoutUser } from '../../Redux/Actions';

const Setting = (props) => {
	const handleLogout = () => {
		props.logoutUser();
		props.history.push('/auth/login');
	};
	return (
		<>
			<ul
				className="nav nav-tabs nav-fill sticky-top"
				id="myTab"
				role="tablist"
			>
				<li className="nav-item" role="presentation">
					<button
						className="nav-link active fw-bold"
						id="getPostForYou"
						data-bs-toggle="tab"
						data-bs-target="#getPostForYou"
						type="button"
						role="tab"
						aria-controls="getPostForYou"
						aria-selected="true"
					>
						Change Theme
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button
						className="btn fw-bold logOutBtn"
						id="logout"
						onClick={handleLogout}
						data-bs-toggle="tab"
						data-bs-target="#logout"
						type="button"
						role="tab"
						aria-controls="logout"
						aria-selected="true"
					>
						Sign-out <i className="fas fa-sign-out-alt"></i>
					</button>
				</li>
			</ul>
			<Theme />
		</>
	);
};

export default connect('', { logoutUser })(Setting);
