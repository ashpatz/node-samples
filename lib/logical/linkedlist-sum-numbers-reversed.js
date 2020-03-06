'use strict';

// https://www.geeksforgeeks.org/sum-of-two-linked-lists/

// units digit at right
// (5 --> 6 --> 1 --> 7) + (2 --> 9 --> 5) = (5 --> 9 --> 1 --> 2)

const LinkedList = require('../datastructures/linked-list').LinkedList;
const Node = require('../datastructures/linked-list').Node;

function sum(list1, list2) {
    const result = new LinkedList();
    const carryOver = {value: 0}
    const node = add(list1.head, list2.head, carryOver);
    if(carryOver.value === 1) {
        const carryOverNode = new Node();
        carryOverNode.next = node;
        carryOverNode.value = 1;
        result.addNode(carryOverNode);
    } else {
        result.addNode(node);
    }
    return result;
}

function add(node1, node2, carry = {value: 0}) {
    const result = new Node();
    let sum = 0;
    if(!node1.next && !node2.next) {
        sum = node1.value + node2.value;
        result.next = null;
        carry.value = sum > 9 ? 1 : 0;
    } else {
        let nextNode;
        if(node1.next && node2.next) {
            nextNode = add(node1.next, node2.next, carry);
            sum += node1.value;
            sum += node2.value;
        } else if(node1.next) {
            nextNode = add(node1.next, null, carry);
            sum += node1.value;
        } else {
            nextNode = add(null, node2.next, carry);
            sum += node2.value;
        }
        sum += carry.value;
        carry.value = sum > 9 ? 1 : 0;
        result.next = nextNode;
    }
    result.value = sum % 10;
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