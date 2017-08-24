const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
 
const TaskSchema = new mongoose.Schema({
  _author: { 
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  _course: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    enum: ['reminder', 'assignment', 'project', 'exam'],
    default: 'reminder'
  },
  startDate: {
    type: Number
  },
  endDate: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});
 
module.exports = mongoose.model('Task', TaskSchema);