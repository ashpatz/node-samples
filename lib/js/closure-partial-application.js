'use strict';

const assert = require('assert');

const add = (a, b) => a + b;

const addTen = (num) => add(num, 10);

assert.equal(addTen(5), 15);