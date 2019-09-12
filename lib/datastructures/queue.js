'use strict';

module.exports = class Queue {
    constructor() {
        this.queue = [];
    }

    add(item) {
        this.queue.push(item);
    }

    poll() {
        let item;
        const length = this.queue.length;
        if (length > 0) {
            item = this.queue.splice(0, 1); //remove first element
            return item[0];
        }
        return null;
    }
};