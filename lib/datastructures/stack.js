'use strict';

module.exports = class Stack {
    constructor() {
        this.stack = [];
    }

    push(index) {
        this.stack.push(index);
    }

    pop() {
        let index;
        const length = this.stack.length;
        if (length > 0) {
            index = this.stack.splice(-1, 1); //remove last element
        }
        return index;
    }
};