const mongoose = require('mongoose');

const InterestSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Interest', TaskSchema);