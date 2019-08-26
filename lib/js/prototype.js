// a constructor function
function Human(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = function () {
        return this.firstName + " " + this.lastName;
    }
}

console.log(Human.prototype);

var human1 = new Human("Virat", "Kohli");

console.log(Human.prototype === human1.__proto__); //true

var human2 = new Human("Sachin", "Tendulkar");

console.log(human1.__proto__ === human2.__proto__); //true


function Person() {} //empty constructor
Person.prototype.name = "Ashwin" ;

var person1 = new Person();
console.log(person1.name)// Output" Ashwin
//******************************************
console.log(person1.hasOwnProperty('name')); //false
//******************************************

var person2 = new Person();
person2.name = 'Bhajji';
console.log(person2.name)// Output" Ashwin
//******************************************
console.log(person2.hasOwnProperty('name')); //true
//******************************************