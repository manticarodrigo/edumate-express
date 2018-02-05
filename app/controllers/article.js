const webhoseio = require('webhoseio');
const Article = require('../models/article');

const client = webhoseio.config({token: 'ae73549f-a177-4197-9123-2609c744c545'});

var keywords = [
  "Humanities",
  "Social sciences",
  "Natural sciences",
  "Formal sciences",
  "Professions and applied sciences"
]



for (var i=0; i < keywords.length; i++) {
  const keyword = keywords[i];
  const query_params = {
    "q": keyword + " language:english",
    "sort": "performance_score"
  }
  client.query('filterWebContent', query_params)
  .then(output => {
    output['posts'].foreach(post => {
      Article.findOne({uuid: post['uuid']}, function(err, existingArticle) {
        if (err) {
          return next(err);
        }
        if (existingArticle) {
          console.log('That article is already in stored.');
        }
        var article = new Article(post);
        article.save();
      });
    });
  });
}