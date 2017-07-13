var Entry = require('../models/entry');
 
exports.getEntries = function(req, res, next) {
Entry.find(function(err, todos) {
	if (err) {
		res.send(err);
	}
	res.json(todos);
});
}
 
exports.createEntry = function(req, res, next) {
	Entry.create({
		title : req.body.title
	}, function(err, todo) {
		if (err) {
			res.send(err);
		}
		Entry.find(function(err, entries) {
			if (err) {
				res.send(err);
			}
			res.json(entries);
		});
	});
}
 
exports.deleteEntry = function(req, res, next) {
	Entry.remove({
		_id : req.params.entry_id
	}, function(err, entry) {
		res.json(entry);
	});
}