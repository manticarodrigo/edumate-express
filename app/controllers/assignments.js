var Assignment = require('../models/assignment');
 
exports.getAssignments = function(req, res, next) {
Assignment.find(function(err, todos) {
	if (err) {
		res.send(err);
	}
	res.json(todos);
});
}
 
exports.createAssignment = function(req, res, next) {
	Assignment.create({
		title : req.body.title
	}, function(err, todo) {
		if (err) {
			res.send(err);
		}
		Assignment.find(function(err, assignments) {
			if (err) {
				res.send(err);
			}
			res.json(assignments);
		});
	});
}
 
exports.deleteAssignment = function(req, res, next) {
	Assignment.remove({
		_id : req.params.assignment_id
	}, function(err, assignment) {
		res.json(assignment);
	});
}