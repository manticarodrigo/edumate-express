const jwt = require('jsonwebtoken');  
const User = require('../models/user');
const authConfig = require('../../config/auth');

function generateToken(user) {
	return jwt.sign(user, authConfig.secret, {
		expiresIn: 10080
	});
}
 
function setUserInfo(req) {
	return {
		_id: req._id,
		email: req.email,
		firstName: req.firstName,
		lastName: req.lastName,
		username: req.username.toLowerCase(),
		imageUrl: req.imageUrl,
		role: req.role
	};
}
 
exports.login = function(req, res, next) {
	console.log("login started");
	const userInfo = setUserInfo(req.user);
	res.status(200).json({
		token: 'JWT ' + generateToken(userInfo),
		user: userInfo
	});
}
 
exports.register = function(req, res, next) {
	const email = req.body.email;
	const username = req.body.username.toLowerCase();
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const password = req.body.password;
	const role = req.body.role;
	
	if (!email) {
		return res.status(422).send({error: 'You must enter an email address'});
	}
	if (!password) {
		return res.status(422).send({error: 'You must enter a password.'});
	}
	User.findOne({email: email}, function(err, existingUser) {
		if (err) {
			return next(err);
		}
		if (existingUser) {
			return res.status(422).send({error: 'That email address is already in use.'});
		}

		User.findOne({username: username}, function(err, existingUser) {
			if (err) {
				return next(err);
			}
			if (existingUser) {
				return res.status(422).send({error: 'That username is already in use.'});
				
			}
			const user = new User({
				email: email,
				username: username,
				firstName: firstName,
				lastName: lastName,
				password: password,
				role: role
			});
			user.save(function(err, user) {
				if (err) {
					return next(err);
				}
				const userInfo = setUserInfo(user);
				res.status(201).json({
					token: 'JWT ' + generateToken(userInfo),
					user: userInfo
				})
			});
		});
	});
}
 
exports.roleAuthorization = function(roles) {
	return function(req, res, next) {
		const user = req.user;
		User.findById(user._id, function(err, foundUser) {
			if (err) {
				res.status(422).json({error: 'No user found.'});
				return next(err);
			}
			if (roles.indexOf(foundUser.role) > -1) {
				return next();
			}
			res.status(401).json({error: 'You are not authorized to view this content'});
			return next('Unauthorized');
		});
	}
}