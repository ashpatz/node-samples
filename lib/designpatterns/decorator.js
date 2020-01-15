'use strict';

function sayHello(name) {
    console.log(`Hello ${name}`);
}

function sayHelloWithSalutation(func) {
    return function(name) {
        func.call(this, `Mr ${name}`);
    }
}

const helloWithSalutation = sayHelloWithSalutation(sayHello);
helloWithSalutation('Lowa');




