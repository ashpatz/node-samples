'use strict';

//https://www.geeksforgeeks.org/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/

// arr = [10, 7, 2, 5, 8, 7]
// [10, 7, 2, 7, 2, 5, 2, 5, 8, 5, 8, 7]
// k = 3

//time O(N)
//space O(K)

const max = (arr, maxArrSize) => {
    const response = [];
    let currArr = [];
    let max = 0;
    arr.forEach((item, index) => {

        currArr.push(item);
        if(currArr.length == maxArrSize) {

        } else if (currArr.length > maxArrSize) {
            currArr = currArr.slice((index + 1) - maxArrSize);
        }

    });
    return response;
};


console.log(max([10, 7, 2, 5, 8, 7], 3));