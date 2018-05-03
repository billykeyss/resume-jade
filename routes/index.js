'use strict'

let express = require('express');
let router = express.Router();
let fs = require('fs');

let obj;
fs.readFile('data.json', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    obj = JSON.parse(data);
});

/* GET home page. */
router.get('/', function (req, res, next) {
    if (!res.getHeader('Cache-Control')) res.setHeader('Cache-Control', 'public, max-age=' + (86400000 / 1000));
    res.render('main/index', {
        data: obj,
    });
});

module.exports = router;
