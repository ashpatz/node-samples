'use strict';

// https://www.geeksforgeeks.org/insertion-sort/


function insertionSort(arr = []) { // efficient

    for (let i = 1; i < arr.length; i++) {
        let valToCheck = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > valToCheck) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = valToCheck;
    }
    return arr;
}

function insertionSort2(arr = []) { //inefficient
    for (let i = 1; i < arr.length; i++) {
        for (let j = 0; j <= i; j++) {

            if (arr[i] < arr[j]) {
                shift(i, j, arr);

                // OR
                // arr.splice(i, 1); //delete current element
                // arr.splice(j, 0, currentNum); // insert current element at index j
                // break; //needed because currentNum still references old arr[i]
            }
        }
    }
    return arr;
}

function shift(fromIdx, toIdx, arr = []) {
    let temp = arr[fromIdx];
    while (fromIdx > toIdx) {
        arr[fromIdx] = arr[fromIdx - 1];
        fromIdx--;
    }
    arr[toIdx] = temp;
}


console.log(insertionSort([64, 25, 12, 22, 11]));
console.log(insertionSort([5, 3, 1, 9, 8, 2, 4, 7]));

// time complexity - O(n^2)
// space complexity - O(1n)
// Auxiliary(extra) Space - O(1)
// sorting in place