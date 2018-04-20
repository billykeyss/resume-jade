'use strict'

let express = require('express');
let router = express.Router();
let fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('color/color', {
        data: "color",
    });
});

module.exports = router;
