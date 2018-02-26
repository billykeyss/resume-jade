'use strict'

let express = require('express');
let router = express.Router();
var movieController = require('../controllers/movieController');

/* GET home page. */
router.get('/', function (req, res, next) {
    new Promise(movieController.getMovies).then(function (result) {
        console.log(result.Items[0]);
        res.render('moviePage/movie', {
            info: result
        });
    }, function (err) {
        console.log(err); // Error: 'It broke'
        res.render('error');
    });
});

module.exports = router;
