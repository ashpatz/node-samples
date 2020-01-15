'use strict';

const assert = require('assert');

//https://leetcode.com/problems/wildcard-matching/

const CHARS = Object.freeze({
    QUESTIONMARK: '?',
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
    }

    validate(inputChar) {
        if (inputChar === this.char) {
            return true;
        } else if (inputChar && this.char === CHARS.QUESTIONMARK) {
            return true;
        } else {
            return false;
        }
    }

}

class RuleRegistry {

    constructor(pattern) {
        this.ruleArr = [];
        this.p = pattern;
        [...this.p].forEach((char) => {
            this.addToRules(char);
        });
    }

    addToRules(char) {
        if (char === CHARS.QUESTIONMARK) {
            this.ruleArr.push(new Rule(CHARS.QUESTIONMARK, CARDINALITIES.ONE));
        } else if (char === CHARS.ASTERISK) {
            this.ruleArr.push(new Rule(CHARS.QUESTIONMARK, CARDINALITIES.MANY));
        } else {
            this.ruleArr.push(new Rule(char, CARDINALITIES.ONE));
        }
    }

    apply(s, charIdx = 0, ruleIdx = 0) {
        const char = s.charAt(charIdx);
        const rule = this.ruleArr[ruleIdx];

        if (!char && !rule) { // no char, no rule
            return true;
        } else if (char && !rule) { // no rule left
            return false;
        }

        const matches = rule.validate(char);
        if (rule.cardinality === CARDINALITIES.MANY) {
            return this.apply(s, charIdx, ruleIdx + 1) || (matches && this.apply(s, charIdx + 1, ruleIdx));
        } else {
            return matches && this.apply(s, charIdx + 1, ruleIdx + 1);
        }
    }
}

var isMatch = function (s, p) {
    const ruleRegistry = new RuleRegistry(p);
    return ruleRegistry.apply(s);
};

/*let memo = [];

var dp = function (i, j, text, pattern) {
    if (memo[i] && memo[i][j]) {
        return memo[i][j] === true;
    }
    let ans;
    if (j === pattern.length){
        ans = i === text.length;
    } else {
        let first_match = (i < text.length &&
            (pattern.charAt(j) === text.charAt(i) ||
                pattern.charAt(j) === '.'));

        if (j + 1 < pattern.length && pattern.charAt(j+1) === '*'){
            ans = (dp(i, j+2, text, pattern) ||
                first_match && dp(i+1, j, text, pattern));
        } else {
            ans = first_match && dp(i+1, j+1, text, pattern);
        }
    }
    memo[i] = memo[i] || [];
    memo[i][j] = ans ? true : false;
    return ans;
};

var isMatch = function (s, p) {
    return dp(0, 0, s, p);
};*/

assert.strictEqual(isMatch('aaabbbaabaaaaababaabaaabbabbbbbbbbaabababbabbbaaaaba', 'a*******b'), false);
// assert.strictEqual(isMatch('aa', 'a'), false);
// assert.strictEqual(isMatch('aa', '*'), true);
// assert.strictEqual(isMatch('cb', '?a'), false);
// assert.strictEqual(isMatch('adceb', '*a*b'), true);
// assert.strictEqual(isMatch('acdcb', 'a*c?b'), false);
// assert.strictEqual(isMatch('aab', 'c*a*b'), false);



