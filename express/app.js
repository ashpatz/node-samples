'use strict';

const express = require('express');
const app = express();
const auditServiceClient = require('./service/audit-service-client');

app.post('/log', auditServiceClient.pushAndFetch);

app.listen(3000);
