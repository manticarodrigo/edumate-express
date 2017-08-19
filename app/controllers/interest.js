const Interest = require('../models/interest');

exports.getInterests = function(req, res, next) {
  Interest.find({
    user_id: req.params.user_id
  }, function(err, interests) {
    if (err) {
      return res.send(err);
    }
    res.json(interests);
  });
}

exports.createInterest = function(req, res, next) {
  Interest.create(req.body, function(err, interest) {
    if (err) {
      return res.status(500).send(err);
    }
    Interest.find({
    user_id: req.params.user_id
    }, function(err, interests) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(interests);
    });
  });
}

exports.deleteInterest = function(req, res, next) {
  Interest.remove({
    _id : req.params.interest_id
  }, function(err, interest) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(interest);
  });
}