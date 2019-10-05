'use strict';

const assert = require('assert');

function User(name) {
    // the cached instance
    var instance;

    // rewrite the constructor
    User = function() {
        return instance;
    };

    // carry over the prototype
    User.prototype = this;

    // the instance
    instance = new User(name);

    // reset the constructor pointer
    instance.constructor = User;

    // all the functionality
    this.name = name;
    this.getName = () => {
        return this.name;
    };

    return instance;
};

const user1 = new User('ajay');
const user2 = new User('vijay');
console.log(user2.getName());
assert.strictEqual(user1, user2);

User.instance = 'abc'; //no issues
//User.name = 'abc'; //TypeError: Cannot assign to read only property
const user3 = new User('Sujay');
console.log(user3);
assert.strictEqual(user1, user3);