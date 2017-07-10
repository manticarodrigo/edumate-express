var mongoose = require('mongoose');
 
var AssignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
 
module.exports = mongoose.model('Assignment', AssignmentSchema);