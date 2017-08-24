const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const CommentSchema = new mongoose.Schema({
  _author: { 
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  _post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  _parent: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
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

module.exports = mongoose.model('Comment', CommentSchema);