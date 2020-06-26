'use strict';

const express = require('express');
const compression = require('compression');
const auditServiceClient = require('./service/audit-service-client');
const fileService = require('./service/file-service');
const redisPopulate = require('./service/random/redis-populate');
const delayedResponseService = require('./service/delayed-response');
const randomDelayedResponse = require('./service/random-delayed-response');

const consoleLog = require('../logger/logger').consoleLog;

const PORT = 3001;

const app = express();
app.use(compression());
app.post('/log', auditServiceClient.pushAndFetch);
app.post('/es', auditServiceClient.createInES);
app.post('/redis/populate', redisPopulate.populateRedis);
app.get('/file', fileService.readFile);
app.get('/delay/:delayInMs', delayedResponseService.execute);
app.get('/random/delay', randomDelayedResponse.execute);
app.use('/akamai', express.static('waf_perf_test'));

app.listen(PORT, () => {
    consoleLog(`App now listening to requests on port ${PORT}`);
});
