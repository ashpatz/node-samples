'use strict';

function selectionSort(arr = []) {
    for (let i = 0; i < arr.length; i++) {
        let min = arr[i];
        let minIdx = 0;
        for (let j = i + 1; j < arr.length; j++) {
            let current = arr[j];
            if (current < min) {
                min = current;
                minIdx = j;
            }
        }

        if (min !== arr[i]) { //swap
            let temp = arr[i];
            arr[i] = min;
            arr[minIdx] = temp;
        }
    }
    return arr;
};

// time complexity O(n^2)

console.log(selectionSort([64, 25, 12, 22, 11]));
console.log(selectionSort([5, 3, 1, 9, 8, 2, 4, 7]));