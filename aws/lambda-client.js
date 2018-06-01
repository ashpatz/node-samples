'use strict';

const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({region: 'us-west-2'});

const params = {
    FunctionName: 'kinesis-push'
};