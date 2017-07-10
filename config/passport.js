var passport = require('passport');
var User = require('../app/models/user');
var config = require('./auth');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport) {
    var localOptions = {
      usernameField: 'email'
    };
    var localLogin = new LocalStrategy(localOptions, function(email, password, done) {
			User.findOne({
				email: email
			}, function(err, user) {
				if (err) {
					return done(err);
				}
				if(!user){
					return done(null, false, {error: 'Login failed. Please try again.'});
				}
				user.comparePassword(password, function(err, isMatch){
					if (err) {
						return done(err);
					}
					if (!isMatch) {
						return done(null, false, {error: 'Login failed. Please try again.'});
					}
					return done(null, user);
				});
			});
    });
    
    var jwtOptions = {
			jwtFromRequest: ExtractJwt.fromAuthHeader(),
			secretOrKey: config.secret
    };
    
    var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
			User.findById(payload._id, function(err, user) {
				if (err) {
					return done(err, false);
				}
				if(user){
					done(null, user);
				} else {
					done(null, false);
				}
			});
    });

    var facebookLogin = new FacebookStrategy(config.facebook,
    function(accessToken, refreshToken, profile, done) {
			console.log('profile', profile);
			// asynchronous
			process.nextTick(function() {
				User.findOne({
					fb: {
						id: profile.id
					}
				}, function (err, user) {
					// if there is an error, stop everything and return that
					// ie an error connecting to the database
					if (err)
						return done(err);
					// if the user is found, then log them in
					if (user) {
						return done(null, user); // user found, return that user
					} else {
						// if there is no user found with that facebook id, create them
						var newUser = new User();
						// set all of the facebook information in our user model
						newUser.fb.id    = profile.id; // set the users facebook id	                
						newUser.fb.access_token = accessToken; // we will save the token that facebook provides to the user	                
						newUser.fb.firstName  = profile.name.givenName;
						newUser.fb.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
						newUser.fb.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
						// save our user to the database
						newUser.saveUser(function (err, data) {
							if (err)
								throw err;
							// if successful, return the new user
							return done(null, newUser);
						});
					}
				})
			});
    });
    
    passport.use(localLogin);
    passport.use(jwtLogin);
    passport.user(facebookLogin);
    
}