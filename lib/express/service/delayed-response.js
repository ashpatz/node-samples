'use strict';

const sleep = require('../../utils/sleep').sleep;

module.exports.execute = (request, response) => {

    const params = request.params;
    const delayInMs = params['delayInMs'];

    return sleep(delayInMs).then(() => {
        response
            .status(200)
            .send();
    });

};