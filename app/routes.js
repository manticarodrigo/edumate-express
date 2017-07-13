var AuthenticationController = require('./controllers/authentication'),  
    EntryController = require('./controllers/entries'),  
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');
 
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
 
module.exports = function(app) {
 
    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        entryRoutes = express.Router();
 
    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
 
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
 
    authRoutes.get('/protected', requireAuth, function(req, res) {
        res.send({ content: 'Success'});
    });
 
    // Entry Routes
    apiRoutes.use('/entries', entryRoutes);
 
    entryRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['guest','learner','instructor', 'admin']), EntryController.getEntries);
    entryRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['learner','instructor', 'admin']), EntryController.createEntry);
    entryRoutes.delete('/:entry_id', requireAuth, AuthenticationController.roleAuthorization(['instructor', 'admin']), EntryController.deleteEntry);
 
    // Set up routes
    app.use('/api', apiRoutes);
 
}