const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

var searchUrl = 'https://en.wikipedia.org/wiki/Outline_of_academic_disciplines';
var savedData = [];

request(searchUrl, function(err, response, html) {
  // First we'll check to make sure no errors occurred when making the request
  if (err) {
    return;
  }
  var $ = cheerio.load(html);
  $('h2 span.mw-headline').each(function(i, element) {
    var name = $(this).text();
    if (name == 'See also') {
      return false;
    }
    var node = {
      name: name,
      subs: []
    }
    var section = $(this).parent().nextUntil('h2');
    var sub = section.find('h3 span.mw-headline').each(function() {
      var subName = $(this).text();
      // console.log(subName);
      var subNode = {
        name: subName,
        subs: []
      }
      var subSection = $(this).parent().nextAll('.div-col').first();
      subSection.find("> ul > li").each(function() {
        var subSubSectionName = $(this).find('a').first().text();
        // console.log(subSubSectionName);
        subNode.subs.push({name: subSubSectionName});
      });
      node.subs.push(subNode);
    });
    // console.log("end section");
    savedData.push(node);
  });
  const content = JSON.stringify(savedData, null, 2);
  fs.writeFile("./data/disciplines.json", content, 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  }); 
});