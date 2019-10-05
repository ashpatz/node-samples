'use strict';

const assert = require('assert');

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
assert.strictEqual(s1, s2);


// Throws error
var s3 = new SingletonClass(); //TypeError: SingletonClass is not a constructor


