'use strict';

const kinesisClient = require('../../aws/kinesis-client');
const elasticsearchClient = require('../../elasticsearch/es-client');
const log = require('../../logger/logger').log;
const sleep = require('../../utils/sleep').sleep;
const validator = require('../../utils/validator');
const uuid4 = require('uuid').v4;

module.exports.pushAndFetch = (request, response) => {

    let correlationId = uuid4();

    const postData = {
        eventId: correlationId,
        time: '2019-11-22T00:08:22.025Z',
        payload: {
            eventId: correlationId,
            eventTime: '2018-07-05T20:05:44.642Z',
            eventType: 'Update',
            resourceId: 'c30a4295-e9df-4ea1-ab3e-728b156adf9d',
            ingressTime: '2018-07-05T20:05:44.642Z',
            subscriptionId: '19d85d6a-92a2-4388-ac6c-78abc377545c',
            status: 'EventReceived / SubscriptionMatched / DeliveryAttempted / NotificationDelivered'
        }
    };
    // const postData = request.body;
    correlationId = postData.correlationId;
    const startTime = Date.now();
    log(correlationId, JSON.stringify(postData));
    return kinesisClient.putRecord(JSON.stringify(postData)).then((kinesisResponse) => {
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

module.exports.createInES = (request, response) => {
    const correlationId = uuid4();
    const postData = {
        correlationId: correlationId
    };
     return elasticsearchClient.addDocument(postData, correlationId).then((esResponse) => {
         log(correlationId, JSON.stringify(esResponse));
         response
             .status(200)
             .set('content-type', 'application/json')
             .send(esResponse);
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

