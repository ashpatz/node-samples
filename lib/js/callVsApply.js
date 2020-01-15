'use strict';


//both are used to provide scope to a function
// they're both functions that can only be called on other functions.

var sayHello = function(firstName, lastName) {
    console.log(`${this.salutation}, ${firstName} ${lastName}`);
};

var myObj = {salutation: 'Good morning'};

//sayHello(); //TypeError: Cannot read property 'salutation' of undefined
sayHello.call(myObj, 'Nelson', 'Mandela'); //Good morning, Nelson Mandela
sayHello.apply(myObj,
    [
        'Nelson',
        'Mandela'
    ]); //Good morning, Nelson Mandela


//function.apply(thisArg, [argsArray])

let myarr = ['a', 'b'];
let elements = [0, 1, 2];
//-----------------------------------------
myarr.push.apply(myarr, elements); // similar to myarr.push(...elements);
console.log(myarr); // a b 0 1 2
//-----------------------------------------


console.log(...myarr); //a b 0 1 2

myarr = ['a', 'b'];
elements = [0, 1, 2];
console.log(...myarr);

//-----------------------------------------
myarr.push(...elements);
console.log(...myarr); // a b 0 1 2
//-----------------------------------------