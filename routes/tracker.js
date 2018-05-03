'use strict'

let express = require('express');
let router = express.Router();
let fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('pages/tracker');
});

module.exports = router;
