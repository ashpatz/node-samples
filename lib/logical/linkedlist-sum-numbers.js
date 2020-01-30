'use strict';

// units digit at left
// (7 --> 1 --> 6) + (5 --> 9 --> 2) = (2 --> 1 --> 9)

const LinkedList = require('../datastructures/linked-list').LinkedList;
const Node = require('../datastructures/linked-list').Node;

function sum(list1, list2) {
    const result = new LinkedList();
    result.addNode(add(list1.head, list2.head));
    return result;
}

function add(node1, node2, carry = 0) {

    if(!node1 && !node2) {
        return null;
    }
    const result = new Node();
    let sum = carry;
    if(node1) {
        sum += node1.value;
    }
    if(node2) {
        sum+= node2.value;
    }
    result.value = sum % 10;
    carry = sum > 9 ? 1 : 0;
    const next1 = node1 ? node1.next : undefined;
    const next2 = node2 ? node2.next : undefined;
    const nextNode = add(next1, next2, carry);
    result.next = nextNode;
    return result;
}

const list1 = new LinkedList();
list1.add(7);
list1.add(1);
list1.add(6);
list1.print();

const list2 = new LinkedList();
list2.add(5);
list2.add(9);
list2.add(2);
list2.print();


const result = sum(list1, list2);
result.print();