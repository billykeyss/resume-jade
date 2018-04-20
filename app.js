'use strict'

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var movie = require('./routes/movie');
var moviePage = require('./routes/moviePage');
var color = require('./routes/color');
var app = express();
var mcache = require('memory-cache');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: './config.env'});
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'bb8.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public', {
    maxAge: 86400000
}));
app.locals.env = process.env;


app.use('/', function(req, res, next) {
    var key = '__express__' + req.originalUrl || req.url;
    var cachedBody = mcache.get(key);
    if (cachedBody) {
        res.send(cachedBody);
        return;
    } else {
        res.sendResponse = res.send;
        res.send = function(body) {
            mcache.put(key, body, 10000000 * 1000);
            res.sendResponse(body);
        };
        next();
    }
}, index);

app.use('/movies', movie);
app.use('/movie-list', moviePage);
app.use('/color-recommend', color);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
