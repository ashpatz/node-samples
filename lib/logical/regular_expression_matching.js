'use strict';

const assert = require('assert');

//https://leetcode.com/problems/regular-expression-matching/

const CHARS = Object.freeze({
    DOT: '.',
    ASTERISK: '*'
});

const CARDINALITIES = Object.freeze({
    ONE: 'one',
    MANY: 'many',
});

class Rule {

    constructor(char, cardinality) {
        this.char = char;
        this.cardinality = cardinality;
        // this.fallbackChar = undefined;
    }

    /**
     * returns
     * 0 if failed
     * +1 if success, and move forward
     * -1 is failure, but can move backward
     * @param inputChar
     */
    validate(inputChar) {
        if (inputChar === this.char) {
            return true;
        } else if (inputChar && this.char === CHARS.DOT) {
            return true;
        // } else if (this.fallbackChar) { //this char does not match, but can check last char in input string
        //     return (inputChar === this.fallbackChar) || (inputChar && this.fallbackChar === CHARS.DOT)
        } else {
            return false;
        }
    }


}

class RuleRegistry {

    constructor(pattern) {
        this.lastChar = CHARS.DOT;
        this.fallbackChar = undefined;
        this.ruleArr = [];
        this.p = pattern;
        [...this.p].forEach((char) => {
            this.addToRules(char);
        });
    }

    addToRules(char) {
        if (char === CHARS.DOT) {
            this.ruleArr.push(new Rule(CHARS.DOT, CARDINALITIES.ONE));
            this.lastChar = CHARS.DOT;
            // this.fallbackChar = undefined;
        } else if (char === CHARS.ASTERISK) {
            this.ruleArr.splice(-1); //remove rule about last char
            this.ruleArr.push(new Rule(this.lastChar, CARDINALITIES.MANY));
            // this.fallbackChar = this.lastChar;
            // do not set lastChar
        } else {
            this.ruleArr.push(new Rule(char, CARDINALITIES.ONE));
            this.lastChar = char;
            // this.fallbackChar = undefined;
        }
    }

    apply(s, charIdx = 0, ruleIdx = 0) {
        const char = s.charAt(charIdx);
        const rule = this.ruleArr[ruleIdx];

        if (!char && !rule) {
            return true;
        } else if (char && !rule) { //rule === undefined
            return false;
        }

        // const status = rule.validate(char);

        if (rule.validate(char)) {
            if (rule.cardinality === CARDINALITIES.MANY) {
                this.fallbackChar = char;
                return this.apply(s, charIdx + 1, ruleIdx);
            } else {
                return this.apply(s, charIdx + 1, ruleIdx + 1);
            }
        } else if(rule.validate(this.fallbackChar)) {
            if (rule.cardinality === CARDINALITIES.MANY) {
                return this.apply(s, charIdx + 1, ruleIdx);
            } else {
                return this.apply(s, charIdx + 1, ruleIdx + 1);
            }
        } else if (char && rule.cardinality === CARDINALITIES.ONE) { //char !== rule.char
            return false;
        } else if (char && rule.cardinality === CARDINALITIES.MANY) { //char !== rule.char
            return this.apply(s, charIdx, ruleIdx + 1);
        } else if (!char && rule.cardinality !== CARDINALITIES.MANY) { //char === undefined
            return false;
        } else if (!char && rule.cardinality === CARDINALITIES.MANY) { //char === undefined
            return this.apply(s, charIdx, ruleIdx + 1); //check if any other rules ahead
        }
    }

}


var isMatch = function (s, p) {
    const ruleRegistry = new RuleRegistry(p);
    return ruleRegistry.apply(s);
};

assert.strictEqual(isMatch('a', 'ab*a'), false);
assert.strictEqual(isMatch('ab', '.*'), true);
assert.strictEqual(isMatch('mii', 'mi.*i'), true);
assert.strictEqual(isMatch('mida', 'mi.*d*a'), true);
assert.strictEqual(isMatch('mii', 'mi.*'), true);
assert.strictEqual(isMatch('mis', 'mi.*s'), true);
assert.strictEqual(isMatch('aa','a'), false);
assert.strictEqual(isMatch('aa','a.'), true);
assert.strictEqual(isMatch('ab','a.'), true);
assert.strictEqual(isMatch('fdgsrgdfre','.*'), true);
assert.strictEqual(isMatch('abcde','a.cde'), true);
assert.strictEqual(isMatch('aa','a*'), true);
assert.strictEqual(isMatch('mii','mis*i'), true);
assert.strictEqual(isMatch('ab','.*'), true);
assert.strictEqual(isMatch('aab','c*a*b'), true);
assert.strictEqual(isMatch('aab','c*a*bd*e*f*g*'), true);
assert.strictEqual(isMatch('aab','c*a*bd*e*f*g*h'), false);
assert.strictEqual(isMatch('mississippi','mis*is*p*.'), false);



