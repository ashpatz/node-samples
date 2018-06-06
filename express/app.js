'use strict';

const express = require('express');
const auditServiceClient = require('./service/audit-service-client');
const consoleLog = require('../logger/logger').consoleLog;

const PORT = 3000;

const app = express();
app.post('/log', auditServiceClient.pushAndFetch);
app.post('/es', auditServiceClient.createInES);

app.listen(PORT, () => {
    consoleLog(`App now listening to requests on port ${PORT}`);
});
