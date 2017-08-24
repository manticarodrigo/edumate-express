const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const SharedPostSchema = new mongoose.Schema({
  _post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String
  },
  url: {
    type: String
  },
  imageUrl: {
    type: String
  }
});

const PostSchema = new mongoose.Schema({
  _author: { 
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  _poll: {
    type: Schema.Types.ObjectId,
    ref: 'Poll'
  },
  sharedPost: {
    SharedPostSchema
  },
  text: {
    type: String,
    required: true
  },
  attachmentUrl: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);