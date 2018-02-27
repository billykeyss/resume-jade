var express = require('express');
var movieCtrl = require('../controllers/movieController');

var router = express.Router();

router.route('/').get(movieCtrl.getMovies);
router.route('/').post(movieCtrl.postMovie);
router.route('/').delete(movieCtrl.deleteMovie);

module.exports = router;
