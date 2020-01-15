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
    }

    validate(inputChar) {
        if (inputChar === this.char) {
            return true;
        } else if (inputChar && this.char === CHARS.DOT) {
            return true;
        } else {
            return false;
        }
    }

}

class RuleRegistry {

    constructor(pattern) {
        this.lastChar = CHARS.DOT;
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
        } else if (char === CHARS.ASTERISK) {
            this.ruleArr.splice(-1); //remove rule about last char
            this.ruleArr.push(new Rule(this.lastChar, CARDINALITIES.MANY));
            // do not set this.lastChar
        } else {
            this.ruleArr.push(new Rule(char, CARDINALITIES.ONE));
            this.lastChar = char;
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

assert.strictEqual(isMatch('nbbba', 'n.*b'), false);
assert.strictEqual(isMatch('nbbba', 'n.*ba'), true);
assert.strictEqual(isMatch('nbbba', 'n.*bba'), true);
assert.strictEqual(isMatch('nbbb', 'n.*b'), true);


assert.strictEqual(isMatch('bbba', '.*'), true);
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
assert.strictEqual(isMatch('minda','mid*da'), false);
assert.strictEqual(isMatch('minnda','mi.*d*da.*'), true);
assert.strictEqual(isMatch('minnta','min*n.*a.*'), true);
assert.strictEqual(isMatch('minnta','min*nn.*a.*'), true);



