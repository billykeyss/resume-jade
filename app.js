'use strict'

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let cors = require('cors');

let index = require('./routes/index');
let movie = require('./routes/movie');
let color = require('./routes/color');
let tracker = require('./routes/tracker');

let app = express();
let mcache = require('memory-cache');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: './config.env'});
}


/**
 * disable X-Powered-By header, because it exposes information
 * about the used frameworks to potential attackers.
 */
app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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
app.use(cors());
app.locals.env = process.env;


app.use('/', function(req, res, next) {
    let key = '__express__' + req.originalUrl || req.url;
    let cachedBody = mcache.get(key);
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
app.use('/color', color);
app.use('/tracker', tracker)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
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
    res.render('main/error');
});

module.exports = app;
