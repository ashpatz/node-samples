'use strict';

function bubbleSort(arr = [], pass=0) {

    for(let pass = 0; pass < arr.length; pass++) {
        for (let i = 0; i < arr.length; i++) {
            let j = i + 1;
            if (arr[i] > arr[j]) {
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;

    // OR
    // instead of outer for loop

    // pass++;
    // if(pass === arr.length) {
    //     return arr;
    // } else {
    //     return bubbleSort(arr, pass);
    // }

};


// time complexity O(n^2)

console.log(bubbleSort([64, 25, 12, 22, 11]));
console.log(bubbleSort([5, 3, 1, 9, 8, 2, 4, 7]));