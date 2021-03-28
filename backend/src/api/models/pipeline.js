exports.postFilesLookup = {
	$lookup: {
		from: 'postfiles',
		let: { post_id: '$postId' },
		pipeline: [
			{
				$match: {
					$expr: { $eq: ['$postId', '$$post_id'] },
				},
			},
			{
				$group: {
					_id: '$postId',
					files: { $push: '$file_path' },
				},
			},
		],
		as: 'all_files',
	},
};

exports.userLookup = {
	$lookup: {
		from: 'users',
		localField: 'userId',
		foreignField: '_id',
		as: 'userData',
	},
};

exports.totalLikesLookup = {
	$lookup: {
		from: 'likes',
		let: { post_id: '$postId' },
		pipeline: [
			{
				$match: {
					$expr: { $eq: ['$postId', '$$post_id'] },
				},
			},
			{
				$group: {
					_id: '$postId',
					likesCount: { $sum: 1 },
				},
			},
		],
		as: 'likes',
	},
};

exports.totalSaveLookup = {
	$lookup: {
		from: 'save_posts',
		let: { post_id: '$postId' },
		pipeline: [
			{
				$match: {
					$expr: { $eq: ['$postId', '$$post_id'] },
				},
			},
			{
				$group: {
					_id: '$postId',
					saveCount: { $sum: 1 },
				},
			},
		],
		as: 'saved',
	},
};

exports.commentsLookup = {
	$lookup: {
		from: 'comments',
		let: { post_id: '$postId' },
		pipeline: [
			{
				$match: {
					$expr: { $eq: ['$postId', '$$post_id'] },
				},
			},
			{
				$group: {
					_id: '$postId',
					commentsCount: { $sum: 1 },
				},
			},
		],
		as: 'comments',
	},
};

exports.avgRatingLookup = {
	$lookup: {
		from: 'ratings',
		let: { post_id: '$postId' },
		pipeline: [
			{
				$match: {
					$expr: { $eq: ['$postId', '$$post_id'] },
				},
			},
			{
				$group: {
					_id: '$postId',
					avgRating: { $avg: '$rating' },
				},
			},
		],
		as: 'ratings',
	},
};

exports.followerLookup = {
	$lookup: {
		from: 'followers',
		let: {
			user_id: '$userId',
		},
		pipeline: [
			{
				$match: {
					$expr: {
						$eq: ['$userId2', '$$user_id'],
					},
				},
			},
		],
		as: 'users',
	},
};

exports.userProject = {
	'userData.type': 0.0,
	'userData.occassions': 0,
	'userData.email': 0,
	'userData.password': 0,
	'userData.coverPic': 0,
	'userData.shortDesc': 0,
	'userData.date': 0,
	'userData.__v': 0,
	'userData.coverPicId': 0,
	'userData.profilePicId': 0,
	'userData._id': 0,
	'userData.themeColor': 0,
};
