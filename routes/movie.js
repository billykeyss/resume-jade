'use strict'

let express = require('express');
let router = express.Router();
let fs = require('fs');
var AWS = require("aws-sdk");

AWS.config.update({
    region: 'us-west-2',
    endpoint: 'https://dynamodb.us-west-2.amazonaws.com'
});

var docClient = new AWS.DynamoDB.DocumentClient();

let obj;
fs.readFile('data.json', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    obj = JSON.parse(data);
});

/* GET home page. */
router.get('/', function (req, res, next) {
    const scanTable = new Promise(function (resolve, reject) {
        docClient.scan({
            TableName: 'MovieTracker',
            Limit: 50
        }, function (err, data) {
            if (err) {
                console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
            } else {
                // print all the movies
                console.log('Scan succeeded.');
                if (data) {
                    resolve(data);
                } else {
                    reject(Error('It broke'));
                }
            }
        });
    });
    scanTable.then(function (result) {
        console.log(result);
        res.render('movieList/movie', {
            info: result
        });
    }, function (err) {
        console.log(err); // Error: 'It broke'
        res.render('error');
    });
});

module.exports = router;
