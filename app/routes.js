var AuthenticationController = require('./controllers/authentication'),  
    AssignmentController = require('./controllers/assignments'),  
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');
 
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
 
module.exports = function(app){
 
    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        assignmentRoutes = express.Router();
 
    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
 
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
 
    authRoutes.get('/protected', requireAuth, function(req, res) {
        res.send({ content: 'Success'});
    });
 
    // Assignment Routes
    apiRoutes.use('/assignments', assignmentRoutes);
 
    assignmentRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['guest','student','instructor']), AssignmentController.getAssignments);
    assignmentRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['student','instructor']), AssignmentController.createAssignment);
    assignmentRoutes.delete('/:assignment_id', requireAuth, AuthenticationController.roleAuthorization(['instructor']), AssignmentController.deleteAssignment);
 
    // Set up routes
    app.use('/api', apiRoutes);
 
}