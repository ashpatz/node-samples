//https://robdodson.me/javascript-design-patterns-singleton/

var user = {
    firstName: 'John',
    lastName: 'Doe',
    sayName: function() {
        return this.firstName + ' ' + this.lastName;
    }
};


// user is a singleton. Any object literal is a singleton


// depending on the scope you might have only created a local variable
// but if that user is sitting outside a function
// then it's globally available to anyone who wants to fiddle with it.


// I guess the most famous Singleton probably looks like this: $.
// To put it another way, ever notice how you can use jQuery
// anywhere in your app after you've included it on the page...? Boom! Singleton!