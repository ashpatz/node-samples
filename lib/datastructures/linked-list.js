'use strict';

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {

    constructor() {
        this.size = 0;
        this.head = null;
        this.last = null;
    }

    add(value) {
        const node = new Node(value);
        this.addNode(node);
    }

    addNode(node) {
        if(node) {
            if(this.last) {
                this.last.next = node;
            } else if(!this.head) {
                this.head = node;
            }
            this.last = node;
            this.size++;
        }
    }

    getFirst() {
        return this.head;
    }

    print() {
        let head = this.head;
        let hasPrevious = false;
        let value = '';
        do {
            if(hasPrevious) {
                value = `${value} --> `;
            }
            value = `${value} ${head.value}`;
            hasPrevious = true;
        } while (head = head.next);
        console.log(value);
    }

};

module.exports = {
    Node: Node,
    LinkedList: LinkedList
}