'use strict';

const winston = require('winston');

module.exports.logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

module.exports.log = (correlationId, data) => {
    try {
        console.log(`${correlationId} :: ${Date.now()} :: ${JSON.stringify(data)}`);
    } catch (err) {
        console.log(`${correlationId} :: ${Date.now()} :: ${data}`);
    };

};

module.exports.consoleLog = (data) => {
    try {
        console.log(`${Date.now()} :: ${JSON.stringify(data)}`);
    } catch (err) {
        console.log(`${Date.now()} :: ${data}`);
    };
};