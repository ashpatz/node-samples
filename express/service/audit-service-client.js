'use strict';

const kinesisClient = require('../../aws/kinesis-client');
const elasticsearchClient = require('../../elasticsearch/es-client');
const consoleLog = require('../../logger/logger').consoleLog;
const log = require('../../logger/logger').log;
const sleep = require('../../utils/sleep').sleep;
const validator = require('../../utils/validator');
const uuid4 = require('uuid').v4;

module.exports.pushAndFetch = (request, response) => {

    const correlationId = uuid4();
    const postData = {
        clientId : '3011136764',
        instanceId: 'BE11158785',
        correlationId: correlationId
    };
    const startTime = Date.now();
    return kinesisClient.putRecords(JSON.stringify(postData)).then((kinesisResponse) => {
        log(correlationId, `kinesisResponse :: ${JSON.stringify(kinesisResponse)}`);
        log(correlationId, `Sleeping for 5 seconds`);
        return sleep(5000);
    }).then (() => {
        return waitAndFetch(correlationId);
    }).then((queryResponse) => {
        const endTime = Date.now();
        response
            .status(200)
            .set('x-response-time', endTime - startTime)
            .set('content-type', 'application/json')
            .send(queryResponse);
    }).catch((err) => {
        log(correlationId, err);
        response
            .status(500)
            .send();
    });
};

const waitAndFetch = (correlationId) => {
    // log(correlationId, `Waiting 1 sec`);
    return sleep(1000).then(()=> {
        return elasticsearchClient.query(correlationId);
    }).then((queryResponse) => {
        if(validator.isNil(queryResponse)) {
            return waitAndFetch(correlationId);
        } else {
            log(correlationId, queryResponse);
            return queryResponse;
        }
    });
};

