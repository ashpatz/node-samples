'use strict';

const AWS = require('./aws-config').AWS;
const kinesis = new AWS.Kinesis();
const STREAM_NAME = 'api-platform-audit-stream-dev-east';
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
