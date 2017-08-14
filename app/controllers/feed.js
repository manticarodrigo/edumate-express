const webhoseio = require('webhoseio');
const client = webhoseio.config({token: 'ae73549f-a177-4197-9123-2609c744c545'});

exports.search = function(req, res, next) {
  const text = req.body.text;

  client.query('filterWebContent', {q: text})
    .then(output => {
      console.log(output['posts'][0]['text']); // Print the text of the first post
      console.log(output['posts'][0]['published']); // Print the text of the first post publication date
      res.json(output);
  });
}

exports.next = function(req, res, next) {
  // Get the next batch of posts
  client.getNext()
  .then(output => {
    console.log(output['posts'][0]['thread']['site']); // Print the site of the first post
    res.json(output);
  });
}