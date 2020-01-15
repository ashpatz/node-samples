'use strict';

const assert = require('assert');

var numJewelsInStones = function(J, S) {
    const stoneCountMap = {};
    let count = 0;
    for(let i = 0; i < S.length; i++) {
        const currentStone = S.charAt(i);
        let currentStoneCount = stoneCountMap[currentStone] || 0;
        stoneCountMap[currentStone] = ++currentStoneCount;
    }

    for(let j = 0; j<J.length; j++) {
        const currentJewel = J.charAt(j);
        count += stoneCountMap[currentJewel] || 0;
    }
    return count;
};

var numJewelsInStones2 = function(J, S) {
    const stoneCountMap = new Map();
    let count = 0;
    for(let i = 0; i < S.length; i++) {
        const currentStone = S.charAt(i);
        let currentStoneCount = stoneCountMap.get(currentStone) || 0;
        stoneCountMap.set(currentStone, ++currentStoneCount);
    }

    for(let j = 0; j<J.length; j++) {
        const currentJewel = J.charAt(j);
        count += stoneCountMap.get(currentJewel) || 0;
    }
    return count;
};

var numJewelsInStones3 = function(J, S) {
    let count = 0;
    for(let j = 0; j<J.length; j++) {
        const currentJewel = J.charAt(j);
        const splits = S.split(currentJewel);
        count += (splits.length - 1);
    }
    return count;
};


assert.deepEqual(numJewelsInStones3('aA', 'aAAbbbb'), 3);
assert.deepEqual(numJewelsInStones3('z', 'ZZ'), 0);