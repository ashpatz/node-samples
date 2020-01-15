'use strict';

const assert = require('assert');

//https://www.geeksforgeeks.org/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/

// arr = [10, 7, 2, 5, 8, 7]
// [10, 7, 2, 7, 2, 5, 2, 5, 8, 5, 8, 7]
// k = 3

//requirement
//time O(N)
//space O(K)


const max1 = (arr, maxArrSize) => {
    let max = 0;
    let index = 0;
    do {
        let modulus = index % maxArrSize;
        const item = arr[index];
        if (modulus == 0) {
            console.log(max);
            max = 0;
            arr = arr.slice(index);
            index = 0;
        } else {
            max = item > max ? item : max;
            if (arr.length > maxArrSize) {
                const insertIndex = (maxArrSize - 1) + modulus;
                insertAtIndex(item, insertIndex, arr);
            }
            index++;
        }
    } while (index <= (arr.length - maxArrSize));
};

const max = (arr, maxArrSize) => {
    const arrLength = arr.length;
    let max = 0;
    let i;
    for (i = 0; i <= (arrLength - maxArrSize); i++) {
        const item = arr[i];
        max = item;
        for (let j = 1; j < maxArrSize; j++) {
            const nextItem = arr[i + j];
            if (nextItem > max) {
                max = nextItem;
            }
        }
        console.log(max);
    }
};


const max2 = (arr, maxArrSize) => {
    const arrLength = arr.length;
    let max = 0;
    const queue = new DeQueue();
    let index = 0;

    // For first 3 elements in array
    for (; index < maxArrSize; index++) {
        const item = arr[index];
        if (item > max) {
            max = item;
            queue.insertFirst(index);
        }
    }
    console.log(max);

    for (; index < arrLength; index++) {
        const indexOfMaxInLastGroup = queue.getFront();

        // if last max number is not in scope of current 3 numbers, remove its reference
        if (indexOfMaxInLastGroup <= index - maxArrSize) {
            queue.deleteFront();
        }

        const indexOfMaxSoFar = queue.getFront();
        const item = arr[index];

        const maxSoFar = arr[indexOfMaxSoFar];
        if (item > maxSoFar) {
            console.log(item);
            queue.insertFirst(index);
        } else {
            console.log(maxSoFar);
            queue.insertLast(index);
        }
    }

};

class DeQueue {

    constructor() {
        this.queue = [];
    }

    insertFirst(item) {
        this.queue.splice(0, 0, item);
    }

    insertLast(item) {
        this.queue.push(item);
    }

    getFront() {
        if (this.queue.length > 0) {
            // return this.queue[0];
            return this.queue[this.queue.length - 1];
        }
    }

    deleteFront() {
        if (this.queue.length > 0) {
            this.queue.splice(this.queue.length - 1, 1);
        }
    }

}

const insertAtIndex = (item, index, array) => {
    return array.splice(index, 0, item);
};


// max2([10, 7, 2, 5, 8, 7], 3);

max2([1, 2, 3, 1, 4, 5, 2, 3, 6], 3);