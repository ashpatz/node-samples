function Crane (a, b) {

}

Crane.fly = function () {} //you can not add a new property to an existing object constructor:
// This will add it on the function constructor

Crane.prototype; //Object {constructor: }

Crane.constructor; //function Function() {[native code]}

Crane.prototype.constructor; //function Crane (a,b) {

//This dynamic between Crane.prototype.constructor and Crane.constructor
// is what enables prototype inheritance at a molecular level.