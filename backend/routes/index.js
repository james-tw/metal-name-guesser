var express = require('express');
var router = express.Router();
var request = require('request-promise');
// var cheerio = require('cheerio');


var metalApi = 'http://www.metal-archives.com/search/ajax-band-search/?field=name&query='

router
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


function parse (data) {
    // var htmlString = data; // Set to wherever the html comes in the data object
    // var $ = cheerio.load(htmlString);
    return data;
}



/* GET home page. */
router.get('/:searchQuery', function(req, res, next) {
    request(metalApi + req.param('searchQuery'))
        .then(function (data) {
            res.send(data);
        })
  
});


module.exports = router;
