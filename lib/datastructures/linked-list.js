'use strict';

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

module.exports = class LinkedList {

    constructor() {
        this.size = 0;
        this.head = null;
        this.first = null;
    }

    add(value) {
        const node = new Node(value);
        if(this.head) {
            const lastNode = this.head;
            lastNode.next = node;
        } else {
            this.head = node;
            this.first = node;
        }
        this.size++;
    }

    getFirst() {
        return this.first;
    }

};