var mongoose = require('mongoose');
 
var EntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
 
module.exports = mongoose.model('Entry', EntrySchema);