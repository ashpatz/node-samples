const assert = require('assert');

//let variable is not hoisted, and throws error if used before declaration


assert.throws(
    () => console.log(letVar),
    {
        name: 'ReferenceError',
        message: 'letVar is not defined'
    }
);

let letVar = 'abc';


// var variable is hoisted, and can result in erroneous situations

assert.doesNotThrow(() => console.log(myVar), 'should ideally throw ReferenceError');

var myVar = 'abc';