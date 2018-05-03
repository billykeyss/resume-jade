'use strict'

let express = require('express');
let router = express.Router();
var movieController = require('../controllers/movieController');

/* GET home page. */
router.get('/', function (req, res, next) {
    new Promise(movieController.getMovies).then(function (result) {
        res.render('pages/movie', {
            info: result
        });
    }, function (err) {
        console.log(err); // Error: 'It broke'
        res.render('main/error');
    });
});

router.route('/').post(movieController.postMovie);
router.route('/').delete(movieController.deleteMovie);

module.exports = router;
