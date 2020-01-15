'use strict';

for (let i = 1; i <= 100; i++) {
    let output = i;

    if (i % 3 == 0) {
        output = 'Fizz';
    }

    if (i % 5 == 0) {
        output = 'Buzz';
    }

    if (i % 15 == 0) {
        output = 'FizzBuzz';
    }

    console.log(output);
}