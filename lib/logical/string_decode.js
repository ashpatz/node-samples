'use strict';

const assert = require('assert');
const Stack = require('../datastructures/stack');

//https://leetcode.com/problems/decode-string/description/

var decodeString1 = function (s) {
    let finalString = '';
    let currentString = '';
    let depth = 0;
    for (let index = s.length - 1; index >= 0; index--) {
        const currentChar = s.charAt(index);

        if (!isNaN(currentChar)) {

            //handle for numbers with two or more digits
            let numSoFar = currentChar;
            let nextIndexToCheck = index - 1;
            let charToLeft = s.charAt(nextIndexToCheck);
            while (!isNaN(charToLeft) && nextIndexToCheck >= 0) {
                numSoFar = `${charToLeft}${numSoFar}`;
                nextIndexToCheck--;
                charToLeft = s.charAt(nextIndexToCheck);
                index--;
            }

            let count = Number(numSoFar);
            let newString = '';
            do {
                newString = `${currentString}${newString}`;
                count--;
            } while (count > 0);
            currentString = newString;
            if (depth === 0) {
                finalString = `${currentString}${finalString}`;
                currentString = '';
            }
        } else if (currentChar === '[') {
            depth--;
        } else if (currentChar === ']') {
            depth++;
        } else {
            currentString = `${currentChar}${currentString}`;
            if (depth === 0) {
                finalString = `${currentString}${finalString}`;
                currentString = '';
            }
        }
    }
    return finalString;
};

//working
var decodeString = function (s) {
    let finalString = '';
    let currentString = '';
    let depth = 0;
    let stack = new Stack();
    for (let index = s.length - 1; index >= 0; index--) {
        const currentChar = s.charAt(index);

        if (!isNaN(currentChar)) { //is number

            //handle for numbers with two or more digits
            let numSoFar = currentChar;
            let nextIndexToCheck = index - 1;
            let charToLeft = s.charAt(nextIndexToCheck);
            while (!isNaN(charToLeft) && nextIndexToCheck >= 0) {
                numSoFar = `${charToLeft}${numSoFar}`;
                nextIndexToCheck--;
                charToLeft = s.charAt(nextIndexToCheck);
                index--;
            }
            let count = Number(numSoFar);

            let newString  = stack.pop();
            do {
                currentString = `${newString}${currentString}`;
                count--;
            } while (count > 0);

            if (depth > 0) {
                const rightString = stack.pop();
                currentString = `${currentString}${rightString}`;
            }
        } else if (currentChar === '[') {
            depth--;
            stack.push(currentString);
            currentString = '';
        } else if (currentChar === ']') {
            depth++;
            stack.push(currentString);
            currentString = '';
        } else {
            currentString = `${currentChar}${currentString}`;
        }
        if (depth === 0) {
            finalString = `${currentString}${finalString}`;
            currentString = '';
        }
    }
    return finalString;
};

// not working
var decodeString2 = function (s) {
    let sChars = [...s];
    let currentString = '';
    let depth = 0;
    let stack = new Stack();
    for(let i = sChars.length - 1; i >= 0; i--) {
        let currentChar = sChars[i];

        if(currentChar === ']') {
            depth++;
            stack.push(currentString);
            currentString = '';
        } else if(currentChar === '[') {
            depth--;
            stack.push(currentString);
            currentString = '';
        } else if (!isNaN(currentChar)) {
            let currentSequence = stack.pop();
            for(let j = 0; j < Number(currentChar); j++) {
                currentString = currentString + currentSequence;
            }

            if(depth > 0) {
                currentSequence = stack.pop();
                currentString = currentString + currentSequence;
            }
            stack.push(currentString);
            currentString = '';
        } else { // character
            currentString = currentChar + currentString;
        }
    }
    while(stack.peek() != undefined) {
        currentString = currentString + stack.pop();
    }
    return currentString;
};

assert.strictEqual(decodeString('3[a]2[b4[F]c]'), 'aaabFFFFcbFFFFc'); //aaabFFFFbFFFF
// assert.strictEqual(decodeString('a10[leetcode]'), 'aleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcode');
// assert.strictEqual(decodeString('3[a]2[bc]'), 'aaabcbc');
// assert.strictEqual(decodeString('3[a2[c]]'), 'accaccacc');
// assert.strictEqual(decodeString('b3[a2[c]]'), 'baccaccacc');
// assert.strictEqual(decodeString('2[abc]3[cd]ef'), 'abcabccdcdcdef');
// assert.strictEqual(decodeString('2[a]b'), 'aab');

