const https = require('https');
const http = require('http');

const options = {
    host: 'localhost',
    path: '/encompass/v1/loans/supportedEntities',
    method: 'GET',
    port: 3000,
    headers : {
        Authorization : 'Bearer oi6hr05GbtdMdFLlCa08Z7JSm9xq'
    }
};

http.request(options, function(res) {
    console.log(`${Date.now()}`);
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
}).end();