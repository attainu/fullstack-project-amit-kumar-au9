import React, { useState } from 'react';
import GalleryList from './GalleryList';

const Gallery = ({ Id }) => {
	const [galleryType, setGalleryType] = useState('getAllPostByUser');
	return (
		<>
			<ul
				className="nav nav-tabs nav-fill sticky-top"
				id="myTab"
				role="tablist"
			>
				<li className="nav-item" role="presentation">
					<button
						className={`nav-link fw-bold ${
							galleryType === 'getAllPostByUser' ? 'active' : ''
						}`}
						id="getAllPostByUser"
						data-bs-toggle="tab"
						data-bs-target="#getAllPostByUser"
						type="button"
						role="tab"
						aria-controls="getAllPostByUser"
						aria-selected="true"
						onClick={(e) => setGalleryType(e.target.value)}
						value="getAllPostByUser"
					>
						All
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button
						className={`nav-link fw-bold ${
							galleryType === 'getPinnedPostByUser'
								? 'active'
								: ''
						}`}
						id="getPinnedPostByUser"
						data-bs-toggle="tab"
						data-bs-target="#getPinnedPostByUser"
						type="button"
						role="tab"
						aria-controls="getPinnedPostByUser"
						aria-selected="false"
						onClick={(e) => setGalleryType(e.target.value)}
						value="getPinnedPostByUser"
					>
						Pinned
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button
						className={`nav-link fw-bold ${
							galleryType === 'getMostRatedPostByUserId'
								? 'active'
								: ''
						}`}
						id="getMostRatedPostByUserId"
						data-bs-toggle="tab"
						data-bs-target="#getMostRatedPostByUserId"
						type="button"
						role="tab"
						aria-controls="getMostRatedPostByUserId"
						aria-selected="false"
						onClick={(e) => setGalleryType(e.target.value)}
						value="getMostRatedPostByUserId"
					>
						Most Rated
					</button>
				</li>
			</ul>
			<div className="d-flex flex-row flex-wrap pb-4 mb-4">
				<GalleryList galleryType={galleryType} Id={Id} />
			</div>
		</>
	);
};

export default Gallery;
