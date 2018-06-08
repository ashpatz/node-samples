'use strict';

const AWS = require('aws-sdk');
const kinesis = new AWS.Kinesis({region: 'us-west-2'});
const STREAM_NAME = 'api-platform-audit-stream-dev-west';
// const STREAM_NAME = 'kclnodejssample';

module.exports.putRecord = (postData) => {

    const params = {
        Data: new Buffer(postData), /* required */
        PartitionKey: 'STRING_VALUE', /* required */
        StreamName: STREAM_NAME /* required */
    };

    return kinesis.putRecord(params).promise();
};

module.exports.putRecords = (postData) => {

    const params = {
        Records : [
            {
                Data: new Buffer(postData),
                PartitionKey: 'STRING_VALUE',
            }
        ],
        StreamName: STREAM_NAME
    };

    return kinesis.putRecords(params).promise();
};
