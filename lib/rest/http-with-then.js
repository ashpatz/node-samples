// var request = require("request");
const https = require('https');
const querystring = require('querystring');
const urlLib = require('url');

const options = {
    method: 'POST',
    host: 'some.host',
    path: '/some/path',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

const body = {
    grant_type: 'password',
    username: 'ashish.patil',
    password: 'erfw3r232r33rw3',
    client_secret: 'eferfwe4',
    client_id: 'efrefer.tyhtydhty'
};

httpRequest(options, querystring.stringify(body)).then((response) => {
    console.log(response);
    const clientId = '11163434'
    const responseBody = JSON.parse(response.body);
    const accessToken = responseBody.access_token;
    const instanceUrl = responseBody.instance_url;
    const queryString = `q=SELECT+owner.email+from+Account+where+ClientID__c='${clientId}'`;
    const path = '/services/data/v20.0/query';

    const url = instanceUrl + path + '?' + queryString;
    console.log(url);


    let options = urlLib.parse(url);
    options.headers = {
        'Authorization': `Bearer ${accessToken}`
    };
    return httpRequest(options);
}).then((response) => {
    const responseBody = JSON.parse(response.body);
    console.log(JSON.stringify(responseBody, null, 2));
}).catch((err) => {
    console.log(`ERROR :: ${err}`);
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
        req.end(postData);
    });
};

