import '../../css/Theme.css';
import colorList from '../../colors.json';
import Zoom from 'react-reveal/Zoom';
import { updateUserTheme } from '../../Redux/Actions';

const Theme = () => {
	const changeTheme = (color) => {
		updateUserTheme(color);
	};

	return (
		<div className="setting_common_card mb-5">
			<div className="card-body theme_container">
				<Zoom>
					{colorList.colors.map((color, idx) => {
						return (
							<button
								key={idx}
								onClick={() => changeTheme(color)}
								style={{ backgroundColor: color.main }}
							></button>
						);
					})}
				</Zoom>
			</div>
		</div>
	);
};

export default Theme;
