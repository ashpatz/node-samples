'use strict';

const assert = require('assert');

//https://leetcode.com/problems/non-decreasing-array/

var checkPossibility1 = function (nums) {
    let violations = 0;
    let lastNum;
    let skew = 0;
    nums.forEach((number, index) => {
        let diff;
        if (lastNum) {
            diff = number - lastNum;
            skew += diff;
        }
        lastNum = number;

        if (diff < 0) {
            violations++;
        } else if (index > 2 && violations > 0 && skew <= 0) { // not decreasing, but current number still less than some other previous number
            violations++;
        }
    });
    return violations <= 1;
};

var checkPossibility = function (nums) {
    const violations = checkViolations(nums);
    return violations <= 1;
};

const checkViolations = (arr) => {
    let lastNum;
    let violations = 0;
    for (let i = 0; i < arr.length; i++) {
        const num = arr[i];
        if(lastNum && (num - lastNum) < 0) {
            arr[i-1] = num;
            violations = 1 + checkViolations(arr);
            break;
        }
        lastNum = num;
    }
    return violations;
};

assert.strictEqual(checkPossibility([3, 4, 2, 3]), false); //tricky
assert.strictEqual(checkPossibility([3, 4, 2]), true);
assert.strictEqual(checkPossibility([3, 3, 3, 3]), true);
assert.strictEqual(checkPossibility([4, 2, 3]), true);
assert.strictEqual(checkPossibility([4, 2, 2, 3]), true);
assert.strictEqual(checkPossibility([4, 2, 1]), false);