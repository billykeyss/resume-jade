'use strict'

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var index = require('./routes/index');
var movie = require('./routes/movie');
var app = express();
const uuidv1 = require('uuid/v1');
var mcache = require('memory-cache');
var AWS = require("aws-sdk");
const MovieDB = require('moviedb')(process.env.MOVIEDB_API_KEY);

AWS.config.update({
    region: 'us-west-2',
    endpoint: 'https://dynamodb.us-west-2.amazonaws.com'
});

var docClient = new AWS.DynamoDB.DocumentClient();

var cache = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url
        let cachedBody = mcache.get(key)
        if (cachedBody) {
            res.send(cachedBody)
            return
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}

function titleCase(str) {
    const inputStr = str.toLowerCase().split(' ');

    for (var i = 0; i < inputStr.length; i++) { // eslint-disable-line no-var
        inputStr[i] = inputStr[i].split('');
        inputStr[i][0] = inputStr[i][0].toUpperCase();
        inputStr[i] = inputStr[i].join('');
    }
    return inputStr.join(' '); //  converts the array of words back to a sentence.
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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


app.use('/', cache(10000000), index);
app.use('/movies', movie);

app.post('/movie-list', function(req, res) {
    // const movieNameArray = req.body.movie.split(' ').join('+');
    // const urlOmdb = 'http://www.omdbapi.com/?t=' + movieNameArray + '&y=&plot=short&r=json&apikey=4545f38d';
    // const urlRT = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=ny97sdcpqetasj8a4v2na8va&q=' + movieNameArray + '&page_limit=1';
    // const movieNameArray = req.body.movie.split(' ').join('+');
    var params = {
        TableName: "MovieTracker",
        KeyConditionExpression: "title = :title",
        ExpressionAttributeValues: {
            ":title": req.body.movie
        }
    };

    docClient.query(params, function(err, data) {
        if (err) {
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            console.log(data);
            res.status(204).send("Duplicate Entry");
            return;
        }
    });

    const movieNameArray = req.body.movie.split(' ').join('+');
    const urlOmdb = 'http://www.omdbapi.com/?t=' + movieNameArray + '&y=&plot=short&r=json&apikey=' + process.env.OMDB_API_KEY;
    const imdbRequest = function() {
        return new Promise(function(resolve, reject) {
            request(urlOmdb, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(JSON.parse(body));
                } else {
                    reject(Error('IMDB broke'));
                }
            });
        });
    };

    MovieDB.searchMovie({
        query: req.body.movie
    }, (err, result) => {
        imdbRequest().then(function(info) {
            var putParams = { // eslint-disable-line no-var
                TableName: 'MovieTracker',
                Item: {
                    id: uuidv1(),
                    year: parseInt(req.body.year) || parseInt(info.Year),
                    title: info.Title,
                    info: info,
                    infoMovieDB: result.results[0],
                    poster: 'http://img.omdbapi.com/?i=' + info.imdbID + '&apikey=4545f38d'
                }
            };
            docClient.put(putParams, function(err, data) {
                if (err) {
                    console.error("Unable to add movie", putParams.title, ". Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("PutItem succeeded:", putParams.title);
                    res.redirect(req.get('referer'));
                }
            });
        }).catch(function(error) {
            console.log('oh no', error);
        });
    });
});

app.delete('/movie-list', function(req, res) { // eslint-disable-line no-unused-vars
    console.log('Attempting a delete...');
    console.log(req.body.id);

    docClient.delete({
        TableName: 'MovieTracker',
        Key: {
            id: req.body.id
        }
    }, function(err, data) {
        if (err) {
            console.error('Unable to delete item. Error JSON:', JSON.stringify(err, null, 2));
        } else {
            console.log('DeleteItem succeeded:', JSON.stringify(data, null, 2));
            res.sendStatus(200)
        }
    });
});

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
