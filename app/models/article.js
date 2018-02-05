const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const ArticleSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model('Article', ArticleSchema);