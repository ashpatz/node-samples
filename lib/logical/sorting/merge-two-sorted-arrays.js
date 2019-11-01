'use strict';

// https://www.geeksforgeeks.org/merge-two-sorted-arrays-o1-extra-space/

// Strategy
// Iterate both arrays nested
// put lower of two items to current index in outer loop/aray
// the higher of the two then needs to be placed appropriately in inner loop/array

// 1, 5, 9, 10, 15, 20
// 2, 3, 8, 13
//
// 1, 2, 9, 10, 15, 20
// 3, 5, 8, 13
//
// 1, 2, 3, 10, 15, 20
// 5, 8, 9, 13
//
// 1, 2, 3, 5, 15, 20
// 8, 9, 10, 13

// Time complexity - O(m*n)
// Space complexity - O(n)
// Auxiliary(extra) Space - O(1)

const arr1 = [1, 5, 9, 10, 15, 20];
const arr2 = [2, 3, 8, 13];

for (let arr1Idx = 0; arr1Idx < arr1.length; arr1Idx++) {
    const arr1Item = arr1[arr1Idx];

    for (let arr2Idx = 0; arr2Idx < arr2.length; arr2Idx++) {
        const arr2Item = arr2[arr2Idx];

        if (arr1Item < arr2Item) {
            break; //move to next item in arr1
        }
        else { //arr1Item > arr2Item

            arr1[arr1Idx] = arr2Item; //put lesser item in array1 at its current index

            while (arr2[arr2Idx + 1] < arr1Item)
            {
                arr2[arr2Idx] = arr2[arr2Idx + 1];
                arr2Idx++;
            }
            arr2[arr2Idx] = arr1Item;
        }

    }
}

console.log(arr1);
console.log(arr2);