const mongoose = require('mongoose');

const InterestSchema = new mongoose.Schema({
 name: {
   type: String,
   required: true
 },
 path: {
   type: String
 },
 user_id: {
   type: String,
   required: true
 }
}, {
 timestamps: true
});

InterestSchema.index({ path: 1 });

module.exports = mongoose.model('Interest', InterestSchema);