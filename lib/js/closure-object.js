'use strict';

const assert = require('assert');

const getSecret = (secret) => {
    return {
        get: () => secret
    };
};

// TEST
const msg = '.get() should have access to the closure.';
const expected = 1;
const obj = getSecret(1);

const actual = obj.get();

try {
    assert.ok(secret, 'This throws an error.');
} catch (e) {
    assert.ok(true, `The secret var is only available
  to privileged methods.`);
}

assert.equal(actual, expected, msg);
