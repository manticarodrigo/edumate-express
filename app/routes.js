const AuthenticationController = require('./controllers/authentication'),
    UserController = require('./controllers/user'),
    TaskController = require('./controllers/task'),
		FeedController = require('./controllers/feed'),
		InterestController = require('./controllers/interest'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport'),
    Multer = require('multer');

// Handles the multipart/form-data
// Adds a .file key to the request object
// the 'storage' key saves the image temporarily for in memory
// You can also pass a file path on your server and it will save the image there
const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024
});
 
const requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
 
module.exports = function(app) {
 
	const apiRoutes = express.Router(),
			authRoutes = express.Router(),
			userRoutes = express.Router(),
			taskRoutes = express.Router(),
			feedRoutes = express.Router(),
			interestRoutes = express.Router();

	// Auth Routes
	apiRoutes.use('/auth', authRoutes);

	authRoutes.post('/register', AuthenticationController.register);
	authRoutes.post('/login', requireLogin, AuthenticationController.login);

	authRoutes.get('/protected', requireAuth, function(req, res) {
			res.send({ content: 'Success'});
	});

	// User Routes
	apiRoutes.use('/user', userRoutes);

	userRoutes.post('/', requireAuth, UserController.updateUser);
	userRoutes.post('/image', requireAuth, multer.single('file'), UserController.updateImage);

	// Task Routes
	apiRoutes.use('/task', taskRoutes);

	taskRoutes.get('/:user_id', requireAuth, AuthenticationController.roleAuthorization(['learner','instructor', 'admin']), TaskController.getTasks);
	taskRoutes.post('/:user_id', requireAuth, AuthenticationController.roleAuthorization(['learner','instructor', 'admin']), TaskController.createTask);
	taskRoutes.delete('/:task_id', requireAuth, AuthenticationController.roleAuthorization(['instructor', 'admin']), TaskController.deleteTask);

	// Feed Routes
	apiRoutes.use('/feed', feedRoutes);

	feedRoutes.get('/:searchTerm', requireAuth, FeedController.search);

	// Interest Routes
	apiRoutes.use('/interest', interestRoutes);
	
	interestRoutes.get('/:user_id', requireAuth, InterestController.getInterests);
	interestRoutes.post('/:user_id', requireAuth, InterestController.createInterest);
	interestRoutes.delete('/:interest_id', requireAuth, InterestController.deleteInterest);

	// Set up routes
	app.use('/api', apiRoutes);
 
}