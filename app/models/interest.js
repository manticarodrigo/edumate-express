const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const InterestSchema = new mongoose.Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  path: {
    type: String
  }
}, {
  timestamps: true
});

InterestSchema.index({ path: 1 });

module.exports = mongoose.model('Interest', InterestSchema);