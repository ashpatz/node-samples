'use strict';

const hugeJson = require('./huge_file.json');

module.exports.readFile = (request, response) => {

    response
        .status(200)
        .set('content-type', 'application/json')
        .send(hugeJson);

};