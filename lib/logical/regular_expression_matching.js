'use strict';

const assert = require('assert');
const LinkedList = require('../datastructures/linked-list');

//https://leetcode.com/problems/regular-expression-matching/

const CARDINALITIES = Object.freeze({
    ONE: 'one',
    ANY: 'any',
});

const charSet = {
    ANY: '.'
};

const MATCH_CONDITION = Object.freeze({
    ONE : 'one',
    MANY: 'many'
});

class Rule {
    constructor(cardinality, match){
        this.cardinality = cardinality;
        this.match = match;
        this.inForce = true;
    }

    apply(char) {
        if (!this.inForce) {
            return false;
        }

        if (this.cardinality === CARDINALITIES.ONE) {
            this.inForce = false;
            return true;
        }

        if (this.cardinality === CARDINALITIES.ANY && char === this.match) {
            return true;
        }
        return false;
    }
}


var isMatch = function(s, p) {
    const rulesList = buildRulesList(p);

};

const buildRulesList = (pattern) => {
    const rulesList = new LinkedList();
    let currentPatternString = '';
    for (let index = 0; index < pattern.length; index++) {
        const currentChar = pattern.charAt(index);

        if(currentChar === '*') {
            const rule = new Rule(CARDINALITIES.ANY, currentPatternString);
            rulesList.add(rule);
            currentPatternString = '';
        } else if (currentChar === '.') {
            const rule = new Rule(CARDINALITIES.ONE);
            rulesList.add(rule);
            currentPatternString = '';
        } else {
            //currentChar === a-z
            currentPatternString = `${currentPatternString}${currentChar}`
        }
    }
    return rulesList;
};

assert.strictEqual(isMatch('aa','a'), false);
assert.strictEqual(isMatch('aa','a*'), true);
assert.strictEqual(isMatch('ab','.*'), true);
assert.strictEqual(isMatch('aab','c*a*b'), true);
assert.strictEqual(isMatch('mississippi','mis*is*p*.'), false);





let ruleArr = prepareRuleArr(p);

let charIdx = 0;
let rulexId = 0;


rule
    char: specific or ANY
    cardinality : ONE or MANY


apply (charIdx, rulexId) {
    const char = s.charAt(charIdx);
    char rule = ruleArr[ruleIdx];

    if(_isNil(char) && (!rule || rule.cardinality == MANY)) {
        return true;
    }

    if(char == rule.char) {
        if(rule.cardinality == MANY) {
            return apply(charIdx+1, rulexId);
        } else {
            return apply(charIdx+1, rulexId+1);
        }
    } else {
        if(rule.cardinality == ONE) {
            return false;
        } else {
            //if(rule.cardinality == MANY)
            return apply(charIdx, rulexId + 1);
        }
    }
}

