var https = require('https');
const querystring = require('querystring');

const formData = {
    'some_key': 'some_value',
    'some_key_2': 'some_value_2'
};

const body = querystring.stringify(formData);

var options = {
    method: 'POST',
    host: 'some.host',
    path: '/some/path',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'Content-Length': body.length
    }
};

httpRequest(options, body).then((response) => {
    console.log(response);
}).catch((err) => {
    console.log(err);
});


function httpRequest(params, postData) {
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
        req.write(postData);
        req.end();
    });

};
