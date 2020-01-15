'use strict';

const assert = require('assert');
const objectEquals = require('../utils/object-equals');

// returns: undefined
// explanation: an empty block with an implicit return
assert.equal(
    ((name) => {
    })(),
    undefined);

// returns: 'Hi Jess'
// explanation: no block means implicit return
assert.equal(
    ((name) => 'Hi ' + name)('Jess'),
    'Hi Jess');

// returns: undefined
// explanation: explicit return required inside block, but is missing.
assert.equal(
    ((name) => {
        'Hi ' + name
    })('Jess'),
    undefined);

// returns: 'Hi Jess'
// explanation: explicit return in block exists
assert.equal(
    ((name) => {
        return 'Hi ' + name
    })('Jess'),
    'Hi Jess');

// returns: undefined
// explanation: a block containing a single label. No explicit return.
// more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label
assert.equal(
    ((name) => {
        id: name
    })('Jess'),
    undefined);

// returns: {id: 'Jess'}
// explanation: implicit return of expression ( ) which evaluates to an object
assert(objectEquals.equals(
    ((name) => ({id: name}))('Jess'),
    {id: 'Jess'}
));

// returns: {id: 'Jess'}
// explanation: explicit return inside block returns object
assert(objectEquals.equals(
    ((name) => {
        return {id: name}
    })('Jess'),
    {id: 'Jess'}
));