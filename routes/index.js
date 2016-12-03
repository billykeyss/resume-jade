var express = require('express');
var router = express.Router();
var fs = require('fs');

var obj;
fs.readFile('data.json', 'utf8', function (err, data) {
    if (err) {
      throw err;
    };
    obj = JSON.parse(data);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { data: obj });
});

module.exports = router;