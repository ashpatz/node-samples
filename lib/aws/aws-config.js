'use strict';

const AWS = require('aws-sdk');

// const AWS_REGION = 'us-west-2';
const AWS_REGION = 'us-east-1';

AWS.config.update({
    region: AWS_REGION
});

module.exports.AWS = AWS;