var User = require('../models/user');
var StorageController = require('./storage');
 
exports.updateImage = function(req, res, next) {
	if(!req.file) return next();
	console.log(req.body);
	StorageController.uploadToGcs(req)
	.then(imageUrl => {
		User.update({ 
			_id: req.body._id
		}, {imageUrl: imageUrl}, function(err, user) {
			if (err) {
				res.send(err);
			}
			User.findOne({
				_id: req.body._id
			}, function(err, user) {
				if (err) {
					res.send(err);
				}
				res.json(user);
			});
		});
	})
	.catch(err => {
		res.send(err);
	});
}

exports.updateUser = function(req, res, next) {
	User.update({
		_id: req.body._id
	}, req.body, function(err, user) {
		if (err) {
			res.send(err);
		}
		User.findOne({
			_id: req.body._id
		}, function(err, user) {
			if (err) {
				res.send(err);
			}
			res.json(user);
		});
	});
}