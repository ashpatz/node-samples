'use strict';

const express = require('express');
const compression = require('compression');
const auditServiceClient = require('./service/audit-service-client');
const fileService = require('./service/file-service');
const delayedResponseService = require('./service/delayed-response');
const consoleLog = require('../logger/logger').consoleLog;

const PORT = 3001;

const app = express();
app.use(compression());
app.post('/log', auditServiceClient.pushAndFetch);
app.post('/es', auditServiceClient.createInES);
app.get('/file', fileService.readFile);
app.get('/delay/:delayInMs', delayedResponseService.execute);

app.listen(PORT, () => {
    consoleLog(`App now listening to requests on port ${PORT}`);
});