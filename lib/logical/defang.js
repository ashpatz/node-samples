'use strict';

const assert = require('assert');

var defangIPaddr = function (address) {
    const segments = address.split('.');
    const responseBuffer = [];
    segments.forEach((segment, index) => {
        responseBuffer.push(segment);
        if (index < (segments.length - 1)) {
            responseBuffer.push('[.]');
        }
    });
    return responseBuffer.join('');
};

assert.deepEqual(defangIPaddr('255.100.50.0'), '255[.]100[.]50[.]0');