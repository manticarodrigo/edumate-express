const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const VoteSchema = new mongoose.Schema({
  _voter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const ChoiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  votes: [VoteSchema]
});

const PollSchema = new mongoose.Schema({
  choices: [ChoiceSchema],
  startDate: {
    type: Number,
    default: Date.now()
  },
  endDate: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Poll', PollSchema);