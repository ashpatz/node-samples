'use strict';

const assert = require('assert');

var defangIPaddr = function (address) {
    const segments = address.split('.');
    // const responseBuffer = [];
    let responseStr = '';
    segments.forEach((segment, index) => {
        // responseBuffer.push(segment);
        responseStr = responseStr.concat(segment);
        if (index < (segments.length - 1)) {
            // responseBuffer.push('[.]');
            responseStr = responseStr.concat('[.]');
        }
    });
    // return responseBuffer.toString();
    return responseStr;
};

assert.deepEqual(defangIPaddr('255.100.50.0'), '255[.]100[.]50[.]0');