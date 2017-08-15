const Task = require('../models/task');
 
exports.getTasks = function(req, res, next) {
	Task.find(function(err, todos) {
		if (err) {
			return res.send(err);
		}
		res.json(todos);
	});
}
 
exports.createTask = function(req, res, next) {
	Task.create(req.body, function(err, todo) {
		if (err) {
			return res.status(500).send(err);
		}
		Task.find(function(err, tasks) {
			if (err) {
				return res.status(500).send(err);
			}
			res.json(tasks);
		});
	});
}
 
exports.deleteTask = function(req, res, next) {
	Task.remove({
		_id : req.params.task_id
	}, function(err, task) {
		if (err) {
			return res.status(500).send(err);
		}
		res.json(task);
	});
}