var mongoose = require('mongoose');
 
var TaskSchema = new mongoose.Schema({
  title: {
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