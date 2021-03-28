import Theme from './Theme';

const Setting = () => {
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
			</ul>
			<Theme />
		</>
	);
};

export default Setting;
