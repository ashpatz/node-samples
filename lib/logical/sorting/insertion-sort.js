'use strict';

// https://www.geeksforgeeks.org/insertion-sort/

const arr = [3,6,7,5,8,4,2,1,9];

for(let i = 1; i < arr.length; i++) {
    const currentNum = arr[i];

    for(let j = 0; j <= (i-1); j++) {
        const numToCheck = arr[j];

        if(currentNum < numToCheck) {
            arr.splice(i, 1); //delete current element
            arr.splice(j, 0, currentNum); // insert current element at index j
            break;
        }
    }
}

console.log(arr);

// time complexity - O(n^2)
// space complexity - O(1n)
// Auxiliary(extra) Space - O(1)
// sorting in place