'use strict';

module.exports.log = (correlationId, data) => {
    console.log(`${correlationId} :: ${Date.now()} :: ${data}`);
};

module.exports.consoleLog = (data) => {
    console.log(`${Date.now()} :: ${data}`);
};