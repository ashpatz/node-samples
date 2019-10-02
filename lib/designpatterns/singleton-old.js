'use strict';

var SingletonClass = (function(){
    function SingletonClass() {
        //do stuff
    }
    var instance;
    return {
        getInstance: function(){
            if (instance == null) {
                instance = new SingletonClass();
                // Hide the constructor so the returned objected can't be new'd...
                instance.constructor = null;
            }
            return instance;
        }
    };
})();

var s1 = SingletonClass.getInstance();
var s2 =  SingletonClass.getInstance();
if (s1 === s2) {
    console.log ("Good singleton");
}

// Throws error
var s3 = new SingletonClass();
if (s3 == s2) {
    console.log ("Bad singleton");
}

