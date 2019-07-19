'use strict';

const assert = require('assert');

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

var longestValidParentheses = function (s) {
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
                transientPairsCount++;
            } else {
                if (transientPairsCount > maxConsequentPairsCount) {
                    maxConsequentPairsCount = transientPairsCount;
                    transientPairsCount = 0;
                }
            }

        }
    }
    if (transientPairsCount > maxConsequentPairsCount) {
        maxConsequentPairsCount = transientPairsCount;
    }

    if (currentPairsCount > maxConsequentPairsCount) {
        maxConsequentPairsCount = currentPairsCount;
    }

    return maxConsequentPairsCount * 2;
};


assert.deepEqual(longestValidParentheses('()(()'), 4);
assert.deepEqual(longestValidParentheses('()()()))()()()()'), 8);
assert.deepEqual(longestValidParentheses('(()'), 2);
assert.deepEqual(longestValidParentheses(')()())'), 4);
assert.deepEqual(longestValidParentheses('()(())'), 6);