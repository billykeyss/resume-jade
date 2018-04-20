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

/* GET home page. */
router.post('/tracker', function (req, res, next) {
  console.log(req.body);
  res.status(400).send("Received");
});

module.exports = router;
