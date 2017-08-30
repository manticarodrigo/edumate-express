const Post = require('../models/post');
const Poll = require('../models/poll');

exports.getPosts = function(req, res, next) {
  Post.find({ _author: req.params.user_id })
  .populate('_author', ['firstName', 'lastName', 'imageUrl', '_id'])
  .populate('_poll')
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
    Post.find({ _author: req.params.user_id })
    .populate('_author', ['firstName', 'lastName', 'imageUrl', '_id'])
    .populate('_poll')
    .exec(function(err, posts) {
      if (err) {
        return res.send(err);
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