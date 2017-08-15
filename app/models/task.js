const mongoose = require('mongoose');
 
const TaskSchema = new mongoose.Schema({
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
  course_id: {
    type: String
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