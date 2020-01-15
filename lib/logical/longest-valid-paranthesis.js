'use strict';

const assert = require('assert');
const Stack = require('../datastructures/stack');

//leetcode.com/problems/longest-valid-parentheses

var longestValidParentheses1 = function (s) {
    const stringLength = s.length;
    let lastChar;
    let count = 0;
    let maxCount = 0;
    for (let i = 0; i < stringLength; i++) {
        const currentChar = s.charAt(i);

        if (!lastChar) {
            if (currentChar === '(') {
                count++;
            }
            lastChar = currentChar;
            continue;
        }

        if (currentChar !== lastChar) {
            count++
        } else if (currentChar === '(') {
            count = 1;
        } else if (currentChar === ')') {
            if (count > maxCount) {
                maxCount = count;
            }
            count = 0;
        }


        if (i == (stringLength - 1) && count % 2 == 0) {
            if (count > maxCount) {
                maxCount = count;
            }
        }
        lastChar = currentChar;
    }
    return maxCount;
};

var longestValidParentheses2 = function (s) {
    const stringLength = s.length;
    let maxConsequentPairsCount = 0;
    let transientPairsCount = 0;
    let currentPairsCount = 0;
    let pushCount = 0;
    for (let i = 0; i < stringLength; i++) {
        const currentChar = s.charAt(i);


        if (currentChar === '(') {
            if (pushCount == 0 && currentPairsCount > 0) {
                transientPairsCount += currentPairsCount;
                currentPairsCount = 0;
            }
            pushCount++;
        } else if (currentChar === ')') {
            if (pushCount > 0) {
                pushCount--;
                currentPairsCount++;
            } else {
                if (transientPairsCount > maxConsequentPairsCount) {
                    maxConsequentPairsCount = transientPairsCount;
                    transientPairsCount = 0;
                }
            }

        }
    } //for loop ends
    if (transientPairsCount > maxConsequentPairsCount) {
        maxConsequentPairsCount = transientPairsCount;
    }

    if (currentPairsCount > maxConsequentPairsCount) {
        maxConsequentPairsCount = currentPairsCount;
    }

    return maxConsequentPairsCount * 2;
};

//my solution
var longestValidParentheses3 = function (s) {
    const stringLength = s.length;
    let stack = new Stack();
    let maxLength = 0;
    const validPairIndexes = new Map();
    for (let index = 0; index < stringLength; index++) {
        const currentChar = s.charAt(index);

        if(currentChar === '(') {
            stack.push(index);
        } else {
            //currentChar === ')'
            const startIndex = stack.pop();
            if(startIndex) {
                const currentLength = index - startIndex + 1;
                const adjacentValidPairLength = validPairIndexes.get(startIndex - 1);
                let currentlyLongestValid;
                if(adjacentValidPairLength) {
                    currentlyLongestValid = currentLength + adjacentValidPairLength;
                    validPairIndexes.delete(startIndex - 1);
                } else {
                    currentlyLongestValid = currentLength;
                }
                validPairIndexes.set(index, currentlyLongestValid);

                if(currentlyLongestValid > maxLength) {
                    maxLength = currentlyLongestValid;
                }
            }
        }
    }
    console.log(`Input: ${s}`);
    console.log(`Lengths: ${validPairIndexes}`);
    return maxLength;
};

// not working yet
var longestValidParentheses = function (s) {
    let maxLength = 0;
    let leftCount = 0;
    let rightCount = 0;
    const validPairIndexes = new Map();
    for (let index = 0; index < s.length; index++) {
        const currentChar = s.charAt(index);
        if(currentChar === '(') {
            leftCount++;
        } else {
            rightCount++;

            if(leftCount === rightCount) {
                maxLength = maxLength > leftCount * 2 ? maxLength : leftCount * 2;
            } else if (rightCount > leftCount) {
                leftCount = 0;
                rightCount = 0;
            }
        }
    }
    return maxLength;
};





assert.deepEqual(longestValidParentheses('()(()'), 2);
assert.deepEqual(longestValidParentheses('())()'), 2);
assert.deepEqual(longestValidParentheses('()((((((()()'), 4);
assert.deepEqual(longestValidParentheses('()((((((()))('), 6);
assert.deepEqual(longestValidParentheses('()()()))()()()()'), 8);
assert.deepEqual(longestValidParentheses('(()'), 2);
assert.deepEqual(longestValidParentheses(')()())'), 4);
assert.deepEqual(longestValidParentheses('()(())'), 6);