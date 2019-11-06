'use strict';

const util = require('util');
const assert = require('assert');

function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
};

function BinarySearchTree() {
    this.root = null;
};

BinarySearchTree.prototype.insert = function (value) {
    const node = new Node(value);

    if (!this.root) {
        this.root = node;
    } else {
        let current = this.root;
        while (current) {
            if (node.value < current.value) {
                if (current.left) {
                    current = current.left;
                } else {
                    current.left = node;
                    break;
                }

            } else {
                if (current.right) {
                    current = current.right;
                } else {
                    current.right = node;
                    break;
                }
            }
        }
    }
};

const binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(25);
binarySearchTree.insert(40);
binarySearchTree.insert(20);
binarySearchTree.insert(9);
binarySearchTree.insert(32);
binarySearchTree.insert(15);
binarySearchTree.insert(8);
binarySearchTree.insert(27);

BinarySearchTree.prototype.contains = function (value) { // depth first, inorder
    let current = this.root;
    while (current) {
        if (value === current.value) {
            return true;
        } else if (value < current.value) {
            current = current.left;
        } else {
            current = current.right;
        }
    }
    return false;
};

assert.strictEqual(binarySearchTree.contains(8), true);
assert.strictEqual(binarySearchTree.contains(27), true);
assert.strictEqual(binarySearchTree.contains(26), false);

BinarySearchTree.prototype.remove = function (value) {
    this.root = this.removeNode(this.root, value);
};

BinarySearchTree.prototype.removeNode = function (node, value) {
    if(!node) {
        return null;
    } else {
        if(value === node.value) {

            if(!node.left && !node.right) { // leaf node
                return null;
            } else if (!node.left) {
                return node.right;
            } else if (!node.right) {
                return node.left;
            } else {
                let tempValue = this.getMin(node.right);
                node.value = tempValue;
                node.right = this.removeNode(node.right, tempValue);
                return node;
            }
        } else if (value < node.value) {
            node.left = this.removeNode(node.left, value);
            return node;
        } else {
            node.right = this.removeNode(node.right, value);
            return node;
        }
    }
};


BinarySearchTree.prototype.getMin = function (node) {
    let current = node || this.root;
    while(current.left) {
        current = current.left;
    }
    return current.value;
};

let binarySearchTree2 = new BinarySearchTree();
binarySearchTree2.insert(20);
binarySearchTree2.insert(9);
binarySearchTree2.insert(12);
binarySearchTree2.insert(8);
binarySearchTree2.insert(30);
binarySearchTree2.insert(10);
binarySearchTree2.insert(13);

console.log('Before removal');
console.log(util.inspect(binarySearchTree2, {depth: null}));

binarySearchTree2.remove(9);

console.log('After removal');
console.log(util.inspect(binarySearchTree2, {depth: null}));

// ###########################################################

BinarySearchTree.prototype._inOrder = function(node, fn) {
    if (!!node) {
        this._inOrder(node.left, fn);
        if (!!fn) fn(node);
        this._inOrder(node.right, fn);
    }
};

BinarySearchTree.prototype._preOrder = function(node, fn) {
    if (node) {
        if (fn) fn(node);
        this._preOrder(node.left, fn);
        this._preOrder(node.right, fn);
    }
};

BinarySearchTree.prototype._postOrder = function(node, fn) {
    if (!!node) {
        this._postOrder(node.left, fn);
        this._postOrder(node.right, fn);
        if (!!fn) fn(node);
    }
};

BinarySearchTree.prototype.traverseDFS = function(fn, method) {
    let current = this.root;
    if (!!method) this[method](current, fn);
    else this._preOrder(current, fn);
};

BinarySearchTree.prototype.traverseBreadthFirst = function(fn) {
    let queue = [];
    queue.push(this.root);
    while (!!queue.length) {
        let node = queue.shift();
        fn(node);
        node.left && queue.push(node.left);
        node.right && queue.push(node.right);
    }
}
