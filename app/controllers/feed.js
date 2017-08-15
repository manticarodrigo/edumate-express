const request = require('request');
const cheerio = require('cheerio');

exports.search = function(req, res, next) {
  var searchTerm = req.params.searchTerm;
  var searchUrl = 'https://www.google.com/search?q=' + searchTerm + '&tbm=nws';
  var savedData = [];
  
  request(searchUrl, function(err, response, html) {
    // console.log(err || html); // Print out the HTML
    // First we'll check to make sure no errors occurred when making the request
    if (err) {
      return res.status(500).send(err);
    }
    var $ = cheerio.load(html);
    $('div.g').each(function(i, element) {
      var title = $(this).find('.r').text();
      var link = $(this).find('.r').find('a').attr('href');
      var text = $(this).find('.st').text();
      var img = $(this).find('img.th').attr('src');
      savedData.push({
        imageUrl: 'assets/edumate.png',
        firstName: 'Edumate',
        lastName: 'Bot',
        text: 'Based on your interest in ' + searchTerm + '...',
        sharedPost: {
          title: title,
          link: link,
          text: text,
          img: img
        }
      });
    });
    res.json(savedData);
  });
}