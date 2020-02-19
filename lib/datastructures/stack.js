'use strict';

module.exports = class Stack {
    constructor() {
        this.queue = [];
    }

    push(item) {
        this.queue.push(item);
    }

    pop() {
        let item;
        const length = this.queue.length;
        if (length > 0) {
            item = this.queue.splice(-1, 1); //remove last element
        }
        return item[0];
    }

    peek() {
        let item;
        const length = this.queue.length;
        if (length > 0) {
            item = this.queue.slice(-1); //don't remove last element
            return item[0];
        } else {
            return;
        }

    }
};