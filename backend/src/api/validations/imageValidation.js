const imageType = [
	'image/png',
	'image/jpg',
	'image/jpeg',
	'image/PNG',
	'image/JPG',
	'image/JPEG',
];

exports.ImageValidation = (req, res, next) => {
	if (req.files) {
		if (req.files && !imageType.includes(req.files.imageFile.mimetype)) {
			return res.json({
				message: 'Invalid file type',
				status: 300,
				error: 'Please upload file in image type ie png, jpg, jpeg',
			});
		}
	} else {
		return res.json({
			message: 'Image not present',
			status: 300,
		});
	}
	next();
};

exports.ProfileImageValidation = (req, res, next) => {
	if (req.files && !imageType.includes(req.files.imageFile.mimetype)) {
		return res.json({
			message: 'Invalid file type',
			status: 300,
			error: 'Please upload file in image type ie png, jpg, jpeg',
		});
	}
	next();
};
