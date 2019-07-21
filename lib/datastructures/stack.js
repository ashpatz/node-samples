'use strict';

module.exports = class Stack {
    constructor() {
        this.stack = [];
    }

    push(item) {
        this.stack.push(item);
    }

    pop() {
        let item;
        const length = this.stack.length;
        if (length > 0) {
            item = this.stack.splice(-1, 1); //remove last element
        }
        return item[0];
    }
};