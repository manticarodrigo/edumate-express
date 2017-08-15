var osmosis = require('osmosis');

exports.search = function(req, res, next) {
  var searchTerm = req.body.searchTerm;
  var searchUrl = 'www.google.com/search?q=' + searchTerm + '&tbm=nws';
  osmosis
  .get(searchUrl)
  .find('.g') // Find all outer div tags
  .set({
    'title': '.r', // Extract the properties out of it which are needed
    'link':  '.r @href',
    'text':  '.st',
    'img': 'img@src'
  })
  .data(function(data) {
    console.log(data); // Data here would be each search result with the properties that we set above
  })
  .error(console.log)
  .debug(console.log);
}