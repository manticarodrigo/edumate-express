const Task = require('../models/task');
 
exports.getTasks = function(req, res, next) {
Task.find(function(err, todos) {
	if (err) {
		res.send(err);
	}
	res.json(todos);
});
}
 
exports.createTask = function(req, res, next) {
	Task.create({
		title : req.body.title
	}, function(err, todo) {
		if (err) {
			res.send(err);
		}
		Task.find(function(err, tasks) {
			if (err) {
				res.send(err);
			}
			res.json(tasks);
		});
	});
}
 
exports.deleteTask = function(req, res, next) {
	Task.remove({
		_id : req.params.task_id
	}, function(err, task) {
		res.json(task);
	});
}