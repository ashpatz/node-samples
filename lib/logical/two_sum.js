'use strict';

const addTwo = (numArr, desiredSum) => {
    const numToIndexMap = {};
    for(let index = 0; index <= numArr.length; index++) {
        const currentNum = numArr[index];
        let complementNumber = desiredSum - currentNum;
        if(!numToIndexMap.hasOwnProperty(complementNumber)) {
            numToIndexMap[currentNum] = index;
        } else {
            return [numToIndexMap[complementNumber], index];
        }
    }
};

const sampleNumArr = [2,7,9,11];
const desired = 9;

let response = addTwo(sampleNumArr, desired);
console.log(response);
