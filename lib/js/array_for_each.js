'use strict';

const sum = (arr) => {
    let sum = 0;
    arr.forEach((item) => {
        sum += item;
    });
    return sum;
};

console.log(sum([1,2,3,4]));



// DEDUCTIONS

// forEach is synchronous
// it always returns "undefined"
// cannot skip any element during iteration
