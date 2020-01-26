'use strict';

function mergeSort(arr = []) {
    const helper = new Array(arr.length);
    // arr.forEach(x => helper.push(0));
    process(arr, helper, 0, arr.length - 1);
    return arr;
}

function process(arr, helper, low = 0, high = 0) {
    if (low < high) {
        const mid = Math.floor((low + high) / 2);
        process(arr, helper, low, mid);
        process(arr, helper, mid + 1, high);
        merge(arr, helper, low, mid, high);
    }
}

function merge(arr, helper, low, mid, high) {
    console.log(''); //empty line
    console.log(`low ${low}, mid ${mid}, high ${high}`);
    for(let i = low; i <= high; i++) {
        helper[i] = arr[i];
    }
    let leftIdx = low;
    let rightIdx = mid + 1;
    let current = low;
    printArraysToMerge(helper, leftIdx, rightIdx, high);
    while (leftIdx <= mid && rightIdx <= high) {
        if (helper[leftIdx] <= helper[rightIdx]) {
            arr[current] = helper[leftIdx];
            leftIdx++
        } else {
            arr[current] = helper[rightIdx];
            rightIdx++;
        }
        current++;
    }

    let rem = mid - leftIdx;
    for (let i = 0; i <= rem; i++) {
        arr[current + i] = helper[leftIdx + i];
    }
    console.log(`Array after merge: ${arr}`);
}

function printArraysToMerge(helper = [], idx1 = 0, idx2 = 0, high = 0) {
    const arr1 = [];
    for (idx1; idx1 <= idx2-1; idx1++) {
        arr1.push(helper[idx1]);
    }
    const arr2 = [];
    for (idx2; idx2 <= high; idx2++) {
        arr2.push(helper[idx2]);
    }
    console.log(`Arrays to merge: [${arr1}] and [${arr2}]`);
}

// console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));
console.log(mergeSort([82, 38, 27, 43, 3, 9, 10]));