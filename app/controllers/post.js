const Post = require('../models/post');

exports.getPosts = function(req, res, next) {
  Post.find({ _author: req.params.user_id })
  .populate('author', ['firstName', 'lastName', '_id'])
  .populate('poll')
  .populate('comments.postedBy', ['firstName', 'lastName', '_id'])
  .exec(function(err, posts) {
    if (err) {
      return res.send(err);
    }
    res.json(posts);
  });
}

exports.createPost = function(req, res, next) {
  Post.create(req.body, function(err, post) {
    if (err) {
      return res.status(500).send(err);
    }
    Post.find({
      _author: req.params.user_id
    }, function(err, posts) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(posts);
    });
  });
}

exports.deletePost = function(req, res, next) {
  Post.remove({
    _id: req.params.post_id
  }, function(err, post) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(post);
  });
}