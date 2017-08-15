const User = require('../models/user');
const StorageController = require('./storage');
 
exports.updateImage = function(req, res, next) {
	if(!req.file) return next();
	console.log(req.body);
	StorageController.uploadToGcs(req)
	.then(imageUrl => {
		User.update({ 
			_id: req.body._id
		}, {imageUrl: imageUrl}, function(err, user) {
			if (err) {
				return res.status(500).send(err);
			}
			User.findOne({
				_id: req.body._id
			}, function(err, user) {
				if (err) {
					return res.status(500).send(err);
				}
				res.json(user);
			});
		});
	})
	.catch(err => {
		res.status(500).send(err);
	});
}

exports.updateUser = function(req, res, next) {
	User.update({
		_id: req.body._id
	}, req.body, function(err, user) {
		if (err) {
			return res.status(500).send(err);
		}
		User.findOne({
			_id: req.body._id
		}, function(err, user) {
			if (err) {
				return res.status(500).send(err);
			}
			res.json(user);
		});
	});
}