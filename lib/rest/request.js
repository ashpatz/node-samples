'use strict';

var https = require('https');

module.exports = (params, postData) => {
    return new Promise(function (resolve, reject) {
        var req = https.request(params, function (res) {

            const statusCode = res.statusCode;
            const headers = res.headers;
            let internalResponse = {statusCode, headers};

            // cumulate data
            var body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            // resolve on end
            res.on('end', function () {
                if (body.length > 0) {
                    const rawBody = Buffer.concat(body);
                    internalResponse.body = rawBody.toString();
                }

                if (statusCode < 300) {
                    resolve(internalResponse);
                } else {
                    const error = new Error('Request failed');
                    error.response = internalResponse;

                    reject(error);
                }
            });
        });
        // reject on request error
        req.on('error', function (err) {
            // This is not a 'Second reject', just a different sort of failure
            reject(err);
        });
        // IMPORTANT
        if(postData)
        {
            req.write(postData);
        }
        req.end();
    });
}