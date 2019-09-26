'use strict';

const assert = require('assert');

/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stack = [];
    this.min = {};
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack.push(x);
    if(!this.min || x < this.min) {
        this.min = x;
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.stack.splice(-1,1);
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.min;
};

const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
assert.strictEqual(minStack.getMin(), -3);  // --> Returns -3.
minStack.pop();
assert.strictEqual(minStack.top(), 0);     // --> Returns 0.
assert.strictEqual(minStack.getMin(), -2); //  --> Returns -2.