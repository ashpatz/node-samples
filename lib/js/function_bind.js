'use strict';

function addition(x, y) {
    return x + y;
}
const plus5 = addition.bind(null, 5);
const result = plus5(10);
console.log(result);