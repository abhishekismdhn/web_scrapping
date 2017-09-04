const request = require('request-promise');
const express = require('express');
const app = express();
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const util = require('util')

const parse_url = (input_url) => {
  const options = {
      uri: input_url,
      headers: {
      'User-Agent': 'Request-Promise'
    },
  };
  request(options)
      .then((htmlString) => {
          // Process html...
  		    //console.log(htmlString);
          const dom = new JSDOM(htmlString, { runScripts: "dangerously"});
          const { window } = dom;
          console.log(JSON.stringify(window.document.getElementsByClassName('sqs-audio-embed')[0], null, 4));
          console.log(window.document.querySelector("div"));
          console.log(window.document.head.querySelector("audio"));
          console.log(window.document.body.querySelector("audio"));
        //  console.log(JSON.stringify(window.document.body, null, 4));
          // console.log(util.inspect(window.document, false, null));


          fs.writeFile('page.html', htmlString, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });
      })
      .catch((err) => {
          // Crawling failed...
          console.log(err);
      });
};

parse_url('https://fireandfragrance.com/podcasts/2017/1/15/andy-byrd-boundless-love');
/*
jsdom.env({
  html: 'https://fireandfragrance.com/podcasts/2017/1/15/andy-byrd-boundless-love',
  scripts: ["https://code.jquery.com/jquery-2.1.1.js"]
}, (err, window) => {
  console.log(window);
});



var phantom = require('x-ray-phantom');
var Xray = require('x-ray');

var x = Xray()
  .driver(phantom());

x('https://fireandfragrance.com/podcasts/2017/1/15/andy-byrd-boundless-love', 'title')(function(err, str) {
  if (err) return done(err);
  assert.equal('Google', str);
  done();
})
*/

// jsdom.env({
//     html: 'http://reddit.com',
//     scripts: ['http://code.jquery.com/jquery.js'],
//     done: (function (errors, window) {
//         var $ = window.$;
//         // we're interested in the title, subreddit, URL,
//         // score, and the number of comments for each link
//         var stories = $.map($('#siteTable .thing'), function (thing) {
//             return {
//                 title: $('a.title', thing).text(),
//                 subreddit: $('a.subreddit', thing).text(),
//                 href: $('a.title', thing).attr('href'),
//                 score: $('.score.unvoted', thing).text(),
//                 numComments: $('a.comments', thing).text().match(/^[0-9]*/)[0] || 0
//             };
//         });
//
//         console.log(stories);
//
//     })
// });

app.listen(3000, () =>  console.log('Example app listening on port 3000.'));
