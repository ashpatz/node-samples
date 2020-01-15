'use strict';

const assert = require('assert');


const find = (arr, x) => {
    return findRecursive(0, arr.length, arr, x);
};

const findRecursive = (start, end, arr, target) => {

    if(start < 0 || end < 0) {
        return false;
    }

    if(end < start) {
        return false;
    }

    // console.log(`start: ${start} :: end: ${end}`);

    const midIndex = Math.floor((start + end)/2);
    const midElement = arr[midIndex];

    if(midElement === target) {
        return true;
    } else if(midElement > target) {
        return findRecursive(start, midIndex - 1, arr, target);
    } else {
        return findRecursive(midIndex + 1, end, arr, target);
    }
};

let arr = [1, 3, 5, 7, 8, 9, 20];
assert.strictEqual(find(arr, 5), true);
assert.strictEqual(find(arr, 6), false);
