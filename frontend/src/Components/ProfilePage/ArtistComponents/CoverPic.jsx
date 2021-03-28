import axios from 'axios';
import { useState } from 'react';
import '../../../css/galleryPost.css';
import { base_url } from '../../../Redux/config';
const CoverPic = (props) => {
	const [image, setImage] = useState('');

	const deleteImage = () => {
		const data = {
			imageId: props.coverId,
		};
		axios
			.post(`${base_url}/artist/editPic/coverPic`, data, {
				headers: {
					'Content-Type': 'application/json',
					'auth-token': localStorage.getItem('auth-token'),
				},
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};
	const saveImage = () => {
		const data = new FormData();
		data.append('imageFile', image);
		if (props.CoverPic) {
			data.append('imageId', props.coverId);
		}
		const header = {
			headers: {
				'auth-token': localStorage.getItem('auth-token'),
				accept: 'application/json',
				'Accept-Language': 'en-US,en;q=0.8',
				'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
			},
		};
		axios
			.post(`${base_url}/artist/editPic/coverPic`, data, header)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};
	const renderCoverImage = (Data) => {
		if (Data) {
			return (
				<div className="position-relative">
					<img
						className="col-12"
						style={{ height: '35vh' }}
						src={Data}
						alt="from database"
					/>
					<i
						className="fas fa-edit deleteButton"
						type="button"
						data-bs-toggle="modal"
						data-bs-target="#ModalBox"
					></i>
				</div>
			);
		} else {
			return (
				<div className="position-relative">
					<img
						style={{ height: '35vh' }}
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgwp9FY8k5IX_xtP-68zsEk3zWtWBA6izlQ&usqp=CAU"
						alt="lorem ipsum"
					/>
					<i
						type="button"
						data-bs-toggle="modal"
						data-bs-target="#ModalBox"
						className="fas fa-plus text-danger deleteButton"
					></i>
				</div>
			);
		}
	};

	return (
		<>
			{renderCoverImage(props.CoverPic)}
			<div
				className="modal fade"
				id="ModalBox"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Edit CoverPic
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div
							style={{ position: 'relative' }}
							className="modal-body"
						>
							{props.CoverPic && (
								<img
									style={{ height: '20vh', width: '30vw' }}
									src={props.CoverPic}
									alt="modal cover"
								/>
							)}
							{props.CoverPic && (
								<i
									onClick={deleteImage}
									type="button"
									style={{
										position: 'absolute',
										top: '10%',
										right: '5%',
									}}
									className="fas fa-trash"
								></i>
							)}
							<form encType="multipart/form-data">
								<input
									className="form-control"
									onChange={(e) => {
										setImage(e.target.files[0]);
									}}
									type="file"
									name="CoverImage"
								/>
							</form>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								Close
							</button>
							<button
								onClick={saveImage}
								type="button"
								className="btn btn-primary"
							>
								Save changes
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default CoverPic;
