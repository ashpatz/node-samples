'use strict';

const AWS = require('aws-sdk');
const kinesis = new AWS.Kinesis({region: 'us-west-2'});

module.exports.putRecord = (postData) => {

    const params = {
        Data: new Buffer(postData), /* required */
        PartitionKey: 'STRING_VALUE', /* required */
        StreamName: 'api-platform-audit-stream-dev-west' /* required */
    };

    return kinesis.putRecord(params).promise();
};

