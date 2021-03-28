const fs = require('fs');
const imageModel = require('../models/imageVideoModel');

const cloudinary = require('../utils/cloudinary');

exports.addImage = (req, res, next) => {
	try {
		const imageFile = req.files.imageFile;
		cloudinary.uploader.upload(
			imageFile.tempFilePath,
			{ folder: 'post_files' },
			(err, reply) => {
				fs.rmdirSync('tmp', { recursive: true });
				if (err) return next(err);
				const data = {
					postId: req.body.postId,
					file_path: reply.secure_url,
					cloudinary_id: reply.public_id,
					isImage: req.body.isImage,
				};
				imageModel.addImage(data, (err) => {
					if (err) return next(err);
					return res.json({ message: 'File Uploaded', status: 200 });
				});
			},
		);
	} catch (error) {
		return next(error);
	}
};

exports.getPostImages = (req, res, next) => {
	try {
		const data = { postId: req.params.postId };
		imageModel.getPostImages(data, (err, reply) => {
			if (err) return next(err);
			return res.json(reply);
		});
	} catch (error) {
		return next(error);
	}
};

exports.updateImage = (req, res, next) => {
	try {
		cloudinary.uploader.destroy(req.body.imageId, (err, reply) => {
			if (err) {
				fs.rmdirSync('tmp', { recursive: true });
				return next(err);
			}
			if (reply.result == 'not found') {
				fs.rmdirSync('tmp', { recursive: true });
				res.json({
					message: reply.result,
					status: 400,
				});
			} else {
				const imageFile = req.files.imageFile;
				cloudinary.uploader.upload(
					imageFile.tempFilePath,
					{
						folder: 'post_files',
					},
					(err, uploadReply) => {
						fs.rmdirSync('tmp', { recursive: true });
						if (err) return next(err);
						const findData = {
							cloudinary_id: req.body.imageId,
						};
						const updateData = {
							file_path: uploadReply.secure_url,
							cloudinary_id: uploadReply.public_id,
						};
						imageModel.updateImage(
							findData,
							updateData,
							(err, response) => {
								if (err) return next(err);
								res.json(response);
							},
						);
					},
				);
			}
		});
	} catch (error) {
		return next(error);
	}
};

exports.deleteImage = (req, res, next) => {
	try {
		cloudinary.uploader.destroy(req.body.imageId, (err, reply) => {
			if (err) return next(err);
			if (reply.result == 'not found') {
				res.json({
					message: reply.result,
					status: 400,
				});
			} else {
				const data = { cloudinary_id: req.body.imageId };
				imageModel.deleteImage(data, (err, response) => {
					if (err) return next(err);
					res.json(response);
				});
			}
		});
	} catch (error) {
		return next(error);
	}
};
