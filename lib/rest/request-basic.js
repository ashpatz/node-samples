const https = require('https');
const http = require('http');

const options = {
    host: 'localhost',
    path: '/encompass/v1/loans/0130a7c9-fa34-4996-8d5e-4f5f6139ae48',
    method: 'GET',
    port: 3000,
    headers : {
        Authorization : 'Bearer EowOWefqcXs0J1iRABlTnJyxfYSA'
    }
};

const reqStartTime = new Date();
http.request(options, function(res) {
    const reqEndTime = new Date();
    console.log(`Time taken : ${reqEndTime - reqStartTime}`);
    console.log(`${new Date().toISOString()}`);
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
}).end();