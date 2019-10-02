'use strict';

const assert = require('assert');

const secret = (msg) => () => msg;

// TEST
const msg = 'secret() should return a function that returns the passed secret.';

const theSecret = 'Closures are easy.';
const mySecret = secret(theSecret);

const actual = mySecret();
const expected = theSecret;

assert.equal(actual, expected, msg);