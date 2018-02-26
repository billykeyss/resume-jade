var request = require('request');
var AWS = require("aws-sdk");
const MovieDB = require('moviedb')('23f1fc561b630d36d81b1ea7c34e59eb');
const uuidv1 = require('uuid/v1');


AWS.config.update({
    region: 'us-west-2',
    endpoint: 'https://dynamodb.us-west-2.amazonaws.com'
});
var docClient = new AWS.DynamoDB.DocumentClient();


module.exports = {

    getMovies : function (resolve, reject) {
        docClient.scan({
            TableName: 'MovieTracker',
            Limit: 50
        }, function (err, data) {
            if (err) {
                console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
            } else {
                // print all the movies
                if (data) {
                    resolve(data);
                } else {
                    reject(Error('It broke'));
                }
            }
        });
    },

    deleteMovie : function(req, res) { // eslint-disable-line no-unused-vars
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
    },

    postMovie : function(req, res) {
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
                        console.log(urlOmdb);
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
                        infoMovieDB: result.results[0]
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
    }
}
