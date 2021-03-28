import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchArtist } from '../../Redux/Actions/ArtistProfile';
import CoverPic from './ArtistComponents/CoverPic';
import Dp from './Common/Dp';
import Details from './ArtistComponents/Details';
import GalleryType from './ArtistComponents/GalleryType';
import Loading from '../Common/Loading';

const ArtistPage = ({
	match,
	ArtistDetail,
	followingDetail,
	isLoadingArtistDetail,
	fetchArtist,
	followerDetail,
}) => {
	useEffect(() => {
		fetchArtist(match.params.id);
	}, [match.params.id, fetchArtist]);

	const renderOccassion = (data) => {
		if (data) {
			return data.map((val, idx) => {
				if (idx !== data.length - 1) {
					return (
						<span key={idx} className="text-capitalize fw-bold">
							{val},&nbsp;
						</span>
					);
				} else {
					return (
						<span key={idx} className="text-capitalize fw-bold">
							{val}
						</span>
					);
				}
			});
		} else {
			return <></>;
		}
	};

	if (ArtistDetail) {
		if (ArtistDetail.data) {
			return (
				<>
					<CoverPic
						CoverPic={ArtistDetail.data.coverPic}
						coverId={ArtistDetail.data.coverPicId}
					/>
					<div className="ps-4 pe-4 pt-4 d-flex flex-row justify-content-evenly align-items-center">
						<Dp
							Dp={ArtistDetail.data.profilePic}
							DpId={ArtistDetail.data.profilePicId}
						/>
						<Details
							Id={ArtistDetail.data._id}
							Name={ArtistDetail.data.name}
							Occassion={ArtistDetail.data.occassions}
							Desc={ArtistDetail.data.shortDesc}
							followingDetail={followingDetail.data}
							followerDetail={followerDetail.data}
						/>
					</div>
					<div className="ps-4 pe-4 pt-2">
						<p className="showOn650">
							{renderOccassion(ArtistDetail.data.occassions)}
						</p>
						<p className="text-justify">
							{ArtistDetail.data.shortDesc}
						</p>
					</div>
					<GalleryType Id={match.params.id} />
				</>
			);
		} else {
			return <h1>{ArtistDetail.message}</h1>;
		}
	} else if (isLoadingArtistDetail) {
		return <Loading />;
	} else {
		return <h1>error</h1>;
	}
};
const mapStateToProps = (state) => {
	return {
		ArtistDetail: state.ArtistReducer.ArtistDetail,
		isLoadingArtistDetail: state.ArtistReducer.isLoadingArtistDetail,
		followingDetail: state.ArtistReducer.followingDetail,
		followerDetail: state.ArtistReducer.followerDetail,
	};
};
export default connect(mapStateToProps, { fetchArtist })(ArtistPage);
