'use strict';

// https://leetcode.com/problems/number-of-islands/
// https://www.geeksforgeeks.org/find-number-of-islands/


function Node(value, x, y) {
    this.value = value;
    this.x = x;
    this.y = y;
};

const myarr =
    [
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0]
    ];

const visitedArr =
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ];
const nodeArr = [];
for (let x = 0; x < myarr[0].length; x++) {
    const row = [];
    for (let y = 0; y < myarr.length; y++) {
        row.push(new Node(myarr[x][y], x, y));
    }
    nodeArr.push(row);
}

console.log(nodeArr);

const countIslands = function (x = 0, y = 0) {

};